import type { ChannelSwitches } from '../channelSwitches';
import { MParticle } from './mParticle';
import type { Okta } from './okta';

/**
 * Tests for the exponential backoff logic in getUserProfile.
 * This is needed because mParticle may return 429s, indicating rate limiting.
 * In this file we mock the fetch requests and use fake timers.
 */

global.fetch = jest.fn();

const mockConfig = {
    oauthTokenEndpoint: {
        client_id: 'test-client-id',
        client_secret: 'test-client-secret',
        audience: 'test-audience',
        grant_type: 'client_credentials',
    },
    userProfileEndpoint: {
        orgId: 'test-org',
        accountId: 'test-account',
        workspaceId: 'test-workspace',
        environment_type: 'production',
    },
};

describe('MParticle.getUserProfile backoff logic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mocking
        jest.spyOn(MParticle.prototype as any, 'fetchAndScheduleToken').mockImplementation(
            function (this: MParticle) {
                this.setBearerToken('test-token');
            },
        );
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should return undefined and set backoff when receiving 429', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });

        const { profile } = await mParticle.getUserProfile('test-user-id');
        expect(profile).toBeUndefined();
    });

    it('should skip requests during backoff period', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });

        await mParticle.getUserProfile('test-user-id');
        const callCountAfterFirst = (global.fetch as jest.Mock).mock.calls.length;

        await jest.advanceTimersByTimeAsync(2000);

        const { profile } = await mParticle.getUserProfile('test-user-id');
        expect(profile).toBeUndefined();
        expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountAfterFirst);
    });

    it('should allow requests after backoff period expires', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });

        await mParticle.getUserProfile('test-user-id');

        await jest.advanceTimersByTimeAsync(6000);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 200,
            json: () => ({
                audience_memberships: [{ audience_id: 123, audience_name: 'test-audience' }],
            }),
        });

        const { profile } = await mParticle.getUserProfile('test-user-id');
        expect(profile).toBeDefined();
        expect(profile?.audience_memberships).toHaveLength(1);
    });

    it('should use exponential backoff', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        // Backoff is capped at 60 seconds
        const backoffPeriods = [5, 10, 20, 40, 60, 60];

        for (let i = 0; i < backoffPeriods.length; i++) {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                status: 429,
            });

            await mParticle.getUserProfile('test-user-id');
            const callCountAfter429 = (global.fetch as jest.Mock).mock.calls.length;

            await jest.advanceTimersByTimeAsync((backoffPeriods[i] - 1) * 1000);
            const { profile: resultDuringBackoff } = await mParticle.getUserProfile('test-user-id');
            expect(resultDuringBackoff).toBeUndefined();
            expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountAfter429);

            await jest.advanceTimersByTimeAsync(2000);
        }
    });

    it('should reset backoff to 5 seconds after successful request', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });
        await mParticle.getUserProfile('test-user-id');

        await jest.advanceTimersByTimeAsync(6000);
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });
        await mParticle.getUserProfile('test-user-id');

        await jest.advanceTimersByTimeAsync(11000);
        // Now succeed
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 200,
            json: () => ({
                audience_memberships: [],
            }),
        });
        await mParticle.getUserProfile('test-user-id');

        // Use a different user ID to bypass the cache and test backoff reset
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });
        await mParticle.getUserProfile('test-user-id-2');
        const callCountAfter429 = (global.fetch as jest.Mock).mock.calls.length;

        await jest.advanceTimersByTimeAsync(6000);
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 200,
            json: () => ({
                audience_memberships: [],
            }),
        });
        const result = await mParticle.getUserProfile('test-user-id-2');
        expect((global.fetch as jest.Mock).mock.calls.length).toBeGreaterThan(callCountAfter429);
        expect(result.profile).toBeDefined();
    });
});

describe('MParticle token refresh', () => {
    const expiresInSeconds = 3600;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        (global.fetch as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('oauth/token')) {
                return Promise.resolve({
                    status: 200,
                    json: () =>
                        Promise.resolve({
                            access_token: 'test-token',
                            expires_in: expiresInSeconds,
                        }),
                });
            }
            return Promise.resolve({
                status: 200,
                json: () => Promise.resolve({ audience_memberships: [] }),
            });
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should fetch token on construction', async () => {
        new MParticle(mockConfig);

        // allow the initial fetch on construction
        await jest.advanceTimersByTimeAsync(0);

        const oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        );
        expect(oauthCalls).toHaveLength(1);
    });

    it('should schedule refresh before token expiry', async () => {
        new MParticle(mockConfig);

        // advance to just before the timer ends
        await jest.advanceTimersByTimeAsync((expiresInSeconds - 61) * 1000);

        let oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        );
        // still only 1, from the initial fetch on construction
        expect(oauthCalls).toHaveLength(1);

        await jest.advanceTimersByTimeAsync(2000);

        oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        );
        expect(oauthCalls).toHaveLength(2);
    });

    it('should refresh immediately on 401', async () => {
        const mp = new MParticle(mockConfig);

        // allow the initial fetch on construction
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockImplementationOnce((url: string) => {
            if (url.includes('oauth/token')) {
                return Promise.resolve({
                    status: 200,
                    json: () =>
                        Promise.resolve({
                            access_token: 'refreshed-token',
                            expires_in: 3600,
                        }),
                });
            }
            return Promise.resolve({ status: 401 });
        });

        // Should get a 401, and trigger a token refresh
        await mp.getUserProfile('test-user');

        await jest.advanceTimersByTimeAsync(0);

        const oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        );
        expect(oauthCalls).toHaveLength(2);
    });

    it('should not make concurrent token requests on multiple 401s', async () => {
        const mp = new MParticle(mockConfig);
        // allow the initial fetch on construction
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockImplementation((url: string) => {
            if (url.includes('oauth/token')) {
                return Promise.resolve({
                    status: 200,
                    json: () =>
                        Promise.resolve({
                            access_token: 'refreshed-token',
                            expires_in: 3600,
                        }),
                });
            }
            return Promise.resolve({ status: 401 });
        });

        await Promise.all([
            mp.getUserProfile('user-1'),
            mp.getUserProfile('user-2'),
            mp.getUserProfile('user-3'),
        ]);

        await jest.advanceTimersByTimeAsync(0);

        const oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        );
        expect(oauthCalls).toHaveLength(2);
    });

    it('should cancel old timer and schedule new timer on 401 refresh', async () => {
        const mp = new MParticle(mockConfig);
        // advance to just before the scheduled refresh
        await jest.advanceTimersByTimeAsync((expiresInSeconds - 61) * 1000);

        (global.fetch as jest.Mock).mockImplementationOnce((url: string) => {
            if (url.includes('oauth/token')) {
                return Promise.resolve({
                    status: 200,
                    json: () =>
                        Promise.resolve({
                            access_token: 'refreshed-token',
                            expires_in: 3600,
                        }),
                });
            }
            return Promise.resolve({ status: 401 });
        });

        await mp.getUserProfile('test-user');
        await jest.advanceTimersByTimeAsync(0);

        let oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        ).length;
        expect(oauthCalls).toBe(2);

        // refresh should have changed and now not happen in the next minute
        await jest.advanceTimersByTimeAsync(70);
        oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        ).length;
        expect(oauthCalls).toBe(2);

        // refresh should happen later
        await jest.advanceTimersByTimeAsync(expiresInSeconds * 1000);
        oauthCalls = (global.fetch as jest.Mock).mock.calls.filter((c: unknown[]) =>
            (c[0] as string).includes('oauth/token'),
        ).length;
        expect(oauthCalls).toBe(3);
    });
});

describe('MParticle.getProfileFetcher', () => {
    const channelSwitches: ChannelSwitches = {
        enableAuxia: false,
        enableBanners: false,
        enableEpics: false,
        enableGutterLiveblogs: false,
        enableHardcodedBannerTests: false,
        enableHardcodedEpicTests: false,
        enableHeaders: false,
        enableScheduledBannerDeploys: false,
        enableSuperMode: false,
        enableMParticle: true,
    };
    let mockOkta: jest.Mocked<Okta>;

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        // @ts-expect-error -- no need to implement private members
        mockOkta = {
            getIdentityIdFromOktaToken: jest.fn().mockResolvedValue('identity-123'),
        } as jest.Mocked<Okta>;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mocking
        jest.spyOn(MParticle.prototype as any, 'fetchAndScheduleToken').mockImplementation(
            function (this: MParticle) {
                this.setBearerToken('test-token');
            },
        );

        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: () => ({
                audience_memberships: [{ audience_id: 123, audience_name: 'test' }],
            }),
        });
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should not fetch until fetchProfile is called (laziness)', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        const callCountBefore = (global.fetch as jest.Mock).mock.calls.length;

        const { fetchProfile } = mp.getProfileFetcher(channelSwitches, mockOkta, 'Bearer token');

        expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountBefore);

        await fetchProfile();

        expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountBefore + 1);
    });

    it('should memoize and only fetch once for multiple calls', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        const { fetchProfile } = mp.getProfileFetcher(channelSwitches, mockOkta, 'Bearer token');

        const callCountBefore = (global.fetch as jest.Mock).mock.calls.length;

        const [result1, result2, result3] = await Promise.all([
            fetchProfile(),
            fetchProfile(),
            fetchProfile(),
        ]);

        const callCountAfter = (global.fetch as jest.Mock).mock.calls.length;

        expect(callCountAfter).toBe(callCountBefore + 1);
        expect(result1).toEqual(result2);
        expect(result2).toEqual(result3);
    });

    it('should not fetch when forLogging is called without prior fetchProfile call', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        const { forLogging } = mp.getProfileFetcher(channelSwitches, mockOkta, 'Bearer token');

        const callCountBefore = (global.fetch as jest.Mock).mock.calls.length;

        const result = forLogging();

        expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountBefore);
        expect(result).toBe('not-fetched');
    });

    it('should return "found" when profile is fetched from API', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        const { fetchProfile, forLogging } = mp.getProfileFetcher(
            channelSwitches,
            mockOkta,
            'Bearer token',
        );

        await fetchProfile();
        const callCountAfterFetch = (global.fetch as jest.Mock).mock.calls.length;

        const loggingResult = forLogging();

        expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountAfterFetch);
        expect(loggingResult).toEqual('found');
    });

    it('should return "found-cached" when profile is served from cache', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        // Prime the cache with a first fetcher
        const { fetchProfile: prime } = mp.getProfileFetcher(
            channelSwitches,
            mockOkta,
            'Bearer token',
        );
        await prime();

        // Second fetcher for the same identity will hit the cache
        const { fetchProfile, forLogging } = mp.getProfileFetcher(
            channelSwitches,
            mockOkta,
            'Bearer token',
        );
        await fetchProfile();

        expect(forLogging()).toBe('found-cached');
    });

    it('should return "not-found" when profile fetch returns 404', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 404,
        });

        const { fetchProfile, forLogging } = mp.getProfileFetcher(
            channelSwitches,
            mockOkta,
            'Bearer token',
        );

        const profile = await fetchProfile();
        expect(profile).toBeUndefined();

        const loggingResult = forLogging();
        expect(loggingResult).toBe('not-found');
    });

    it('should return "not-found-cached" when a cached 404 is served', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 404,
        });

        // Prime the cache with the 404
        const { fetchProfile: prime } = mp.getProfileFetcher(
            channelSwitches,
            mockOkta,
            'Bearer token',
        );
        await prime();

        // Second fetcher for the same identity hits the cached 404
        const { fetchProfile, forLogging } = mp.getProfileFetcher(
            channelSwitches,
            mockOkta,
            'Bearer token',
        );
        const profile = await fetchProfile();
        expect(profile).toBeUndefined();
        expect(forLogging()).toBe('not-found-cached');
    });

    it('should return undefined when authHeader is missing', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        const { fetchProfile } = mp.getProfileFetcher(channelSwitches, mockOkta, undefined);

        const result = await fetchProfile();

        expect(result).toBeUndefined();
        expect(mockOkta.getIdentityIdFromOktaToken.mock.calls).toHaveLength(0);
    });

    it('should return undefined when enableMParticle is false', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        const { fetchProfile } = mp.getProfileFetcher(
            { ...channelSwitches, enableMParticle: false },
            mockOkta,
            'Bearer token',
        );

        const result = await fetchProfile();

        expect(result).toBeUndefined();
        expect(mockOkta.getIdentityIdFromOktaToken.mock.calls).toHaveLength(0);
    });

    it('should return undefined when identityId cannot be retrieved', async () => {
        const mp = new MParticle(mockConfig);
        await jest.advanceTimersByTimeAsync(0);

        // @ts-expect-error -- no need to implement private members
        mockOkta = {
            getIdentityIdFromOktaToken: jest.fn().mockResolvedValue(undefined),
        } as jest.Mocked<Okta>;

        const { fetchProfile } = mp.getProfileFetcher(channelSwitches, mockOkta, 'Bearer token');

        const result = await fetchProfile();

        expect(result).toBeUndefined();
        expect((global.fetch as jest.Mock).mock.calls.length).toBe(0);
    });
});

describe('MParticle caching logic', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        // Use real timers since lru-cache doesn't work well with fake timers
        jest.useRealTimers();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mocking
        jest.spyOn(MParticle.prototype as any, 'fetchAndScheduleToken').mockImplementation(
            function (this: MParticle) {
                this.setBearerToken('test-token');
            },
        );
    });

    afterEach(() => {
        jest.useRealTimers();
        jest.restoreAllMocks();
    });

    it('should cache successful responses', async () => {
        const mParticle = new MParticle(mockConfig);

        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: () => ({
                audience_memberships: [{ audience_id: 123, audience_name: 'test-audience' }],
            }),
        });

        const { profile: profile1, fromCache: fromCache1 } = await mParticle.getUserProfile('test-user-id');
        const { profile: profile2, fromCache: fromCache2 } = await mParticle.getUserProfile('test-user-id');

        expect(profile1).toEqual(profile2);
        expect(fromCache1).toBe(false);
        expect(fromCache2).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should cache 404 responses', async () => {
        const mParticle = new MParticle(mockConfig);

        (global.fetch as jest.Mock).mockResolvedValue({
            status: 404,
            json: () => ({}),
        });

        const { profile: profile1, fromCache: fromCache1 } = await mParticle.getUserProfile('test-user-id');
        const { profile: profile2, fromCache: fromCache2 } = await mParticle.getUserProfile('test-user-id');

        expect(profile1).toBeUndefined();
        expect(profile2).toBeUndefined();
        expect(fromCache1).toBe(false);
        expect(fromCache2).toBe(true);
        expect(global.fetch).toHaveBeenCalledTimes(1);
    });

    it('should expire cache after TTL', async () => {
        // Create MParticle with a custom cache that has a short TTL
        const mParticle = new MParticle(mockConfig);

        // Replace the cache with one that has a short TTL for testing
        // eslint-disable-next-line @typescript-eslint/no-require-imports, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-explicit-any -- Testing internal cache behavior with short TTL
        (mParticle as any).cache = new (require('lru-cache').LRUCache)({
            max: 1000,
            ttl: 100, // 100ms TTL
        });

        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: () => ({
                audience_memberships: [],
            }),
        });

        await mParticle.getUserProfile('test-user-id');
        expect(global.fetch).toHaveBeenCalledTimes(1);

        // Wait for the cache to expire (100ms + a bit more)
        await new Promise((resolve) => setTimeout(resolve, 150));

        (global.fetch as jest.Mock).mockResolvedValue({
            status: 200,
            json: () => ({
                audience_memberships: [],
            }),
        });

        const { fromCache } = await mParticle.getUserProfile('test-user-id');
        expect(fromCache).toBe(false);
        expect(global.fetch).toHaveBeenCalledTimes(2);
    });
});
