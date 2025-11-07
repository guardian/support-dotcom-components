import { z } from 'zod';
import { logError } from '../utils/logging';
import { getSsmValue } from '../utils/ssm';
import { isProd } from './env';

// mParticle API docs: https://docs.mparticle.com/developers/apis/profile-api/

const MParticleConfigSchema = z.object({
    // For the request body to /oauth/token, to create a bearer token
    oauthTokenEndpoint: z.object({
        client_id: z.string(),
        client_secret: z.string(),
        audience: z.string(),
        grant_type: z.string(),
    }),
    // For use in the request path to /userprofile, to fetch user data
    userProfileEndpoint: z.object({
        orgId: z.string(),
        accountId: z.string(),
        workspaceId: z.string(),
        environment_type: z.string(),
    }),
});
type MParticleConfig = z.infer<typeof MParticleConfigSchema>;

const MParticleProfileSchema = z.object({
    // user_attributes: z.record(z.any(),z.any()), // not using attributes yet
    audience_memberships: z.array(
        z.object({
            audience_id: z.number(),
            audience_name: z.string(),
        }),
    ),
});
export type MParticleProfile = z.infer<typeof MParticleProfileSchema>;

const MParticleOAuthTokenSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
});

export const getMParticleConfig = async (): Promise<MParticleConfig> => {
    const stage = isProd ? 'PROD' : 'CODE';
    const ssmValue = await getSsmValue(stage, 'mparticle', true);
    if (!ssmValue) {
        throw new Error(`Failed to get config for mParticle from SSM`);
    }
    const parsed = MParticleConfigSchema.safeParse(JSON.parse(ssmValue));
    if (parsed.success) {
        return parsed.data;
    } else {
        throw new Error(`Failed to get config for mParticle: ${parsed.error.message}`);
    }
};

export class MParticle {
    private config: MParticleConfig;

    // The bearerToken must be refreshed periodically - https://docs.mparticle.com/developers/apis/profile-api/#using-your-bearer-token
    private bearerToken: string | null = null;
    private bearerTokenRefreshTimer: NodeJS.Timeout | null = null;

    // mParticle's API has rate limiting, so we use exponential back off if a 429 is returned - https://docs.mparticle.com/developers/apis/profile-api/#error-handling
    private rateLimitedUntil: number = 0; // timestamp when rate limit expires
    private backoffSeconds: number = 5; // initial backoff duration
    private maxBackoffSeconds: number = 60; // max backoff duration

    constructor(config: MParticleConfig) {
        this.config = config;
        void this.getBearerToken();
    }

    private async getBearerToken(): Promise<void> {
        try {
            const response = await fetch('https://sso.auth.mparticle.com/oauth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.config.oauthTokenEndpoint),
            });
            const data = (await response.json()) as unknown;
            const parsed = MParticleOAuthTokenSchema.safeParse(data);
            if (parsed.success) {
                this.setBearerToken(parsed.data.access_token);
                this.scheduleRefresh(parsed.data.expires_in - 60);
            } else {
                throw new Error(`Response body from mParticle: ${parsed.error.message}`);
            }
        } catch (error) {
            logError(`Error fetching bearer token from mParticle: ${String(error)}`);
            // try again in a minute
            this.scheduleRefresh(60);
        }
    }

    setBearerToken(token: string): void {
        this.bearerToken = token;
    }

    private scheduleRefresh(expiresInSeconds: number): void {
        if (this.bearerTokenRefreshTimer) {
            clearTimeout(this.bearerTokenRefreshTimer);
        }
        const refreshTime = Math.max(expiresInSeconds * 1000, 0);
        this.bearerTokenRefreshTimer = setTimeout(() => {
            void this.getBearerToken();
        }, refreshTime);
    }

    async getUserProfile(identityId: string): Promise<MParticleProfile | undefined> {
        // Check if we're currently rate-limited
        if (Date.now() < this.rateLimitedUntil) {
            return undefined;
        }

        if (!this.bearerToken) {
            return undefined;
        }
        const { orgId, accountId, workspaceId, environment_type } = this.config.userProfileEndpoint;
        const url = `https://api.mparticle.com/userprofile/v1/resolve/${orgId}/${accountId}/${workspaceId}?fields=user_attributes,audience_memberships`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${this.bearerToken}`,
                },
                body: JSON.stringify({
                    environment_type,
                    identity: {
                        type: 'customer_id',
                        value: identityId,
                    },
                }),
            });

            if (response.status === 429) {
                // Set rate limit backoff period
                this.rateLimitedUntil = Date.now() + this.backoffSeconds * 1000;
                this.backoffSeconds = Math.min(this.backoffSeconds * 2, this.maxBackoffSeconds);

                logError(
                    `mParticle returned a 429: backing off for ${this.backoffSeconds} seconds`,
                );
                return undefined;
            }

            if (response.status === 404) {
                // User doesn't exist in mParticle
                return undefined;
            }

            if (response.status !== 200) {
                const data = (await response.json()) as unknown;
                logError(`mParticle returned ${response.status}: ${String(data)}`);
                return undefined;
            }

            // Reset backoff on successful request
            this.backoffSeconds = 5;

            const data = (await response.json()) as unknown;
            const parsed = MParticleProfileSchema.safeParse(data);
            if (!parsed.success) {
                logError(`Failed to parse mParticle profile: ${parsed.error.message}`);
                return undefined;
            }

            return parsed.data;
        } catch (error) {
            logError(`Error fetching profile from mParticle. ${String(error)}`);
            return undefined;
        }
    }
}
