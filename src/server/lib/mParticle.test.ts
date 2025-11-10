import { MParticle } from './mParticle';

/**
 * Tests for the exponential backoff logic in getUserProfile.
 * This is needed because mParticle may return 429s, indicating rate limiting.
 * In this file we mock the fetch requests and use fake timers.
 */

global.fetch = jest.fn();

describe('MParticle.getUserProfile backoff logic', () => {
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

    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();

        // eslint-disable-next-line @typescript-eslint/no-explicit-any -- mocking
        jest.spyOn(MParticle.prototype as any, 'getBearerToken').mockImplementation(function (
            this: MParticle,
        ) {
            this.setBearerToken('test-token');
        });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    it('should return undefined and set backoff when receiving 429', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.runAllTimersAsync();

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });

        const result = await mParticle.getUserProfile('test-user-id');
        expect(result).toBeUndefined();
    });

    it('should skip requests during backoff period', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.runAllTimersAsync();

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });

        await mParticle.getUserProfile('test-user-id');
        const callCountAfterFirst = (global.fetch as jest.Mock).mock.calls.length;

        await jest.advanceTimersByTimeAsync(2000);

        const result = await mParticle.getUserProfile('test-user-id');
        expect(result).toBeUndefined();
        expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountAfterFirst);
    });

    it('should allow requests after backoff period expires', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.runAllTimersAsync();

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

        const result = await mParticle.getUserProfile('test-user-id');
        expect(result).toBeDefined();
        expect(result?.audience_memberships).toHaveLength(1);
    });

    it('should use exponential backoff', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.runAllTimersAsync();

        // Backoff is capped at 60 seconds
        const backoffPeriods = [5, 10, 20, 40, 60, 60];

        for (let i = 0; i < backoffPeriods.length; i++) {
            (global.fetch as jest.Mock).mockResolvedValueOnce({
                status: 429,
            });

            await mParticle.getUserProfile('test-user-id');
            const callCountAfter429 = (global.fetch as jest.Mock).mock.calls.length;

            await jest.advanceTimersByTimeAsync((backoffPeriods[i] - 1) * 1000);
            const resultDuringBackoff = await mParticle.getUserProfile('test-user-id');
            expect(resultDuringBackoff).toBeUndefined();
            expect((global.fetch as jest.Mock).mock.calls.length).toBe(callCountAfter429);

            await jest.advanceTimersByTimeAsync(2000);
        }
    });

    it('should reset backoff to 5 seconds after successful request', async () => {
        const mParticle = new MParticle(mockConfig);
        await jest.runAllTimersAsync();

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

        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 429,
        });
        await mParticle.getUserProfile('test-user-id');
        const callCountAfter429 = (global.fetch as jest.Mock).mock.calls.length;

        await jest.advanceTimersByTimeAsync(6000);
        (global.fetch as jest.Mock).mockResolvedValueOnce({
            status: 200,
            json: () => ({
                audience_memberships: [],
            }),
        });
        const result = await mParticle.getUserProfile('test-user-id');
        expect((global.fetch as jest.Mock).mock.calls.length).toBeGreaterThan(callCountAfter429);
        expect(result).toBeDefined();
    });
});
