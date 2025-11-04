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
    private refreshTimer: NodeJS.Timeout | null = null;

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
                this.bearerToken = parsed.data.access_token;
                this.scheduleRefresh(parsed.data.expires_in - 60);
            } else {
                throw new Error(`Response body from mParticle: ${parsed.error.message}`);
            }
        } catch (error) {
            console.log(`Error fetching bearer token from mParticle: ${String(error)}`);
            // try again in a minute
            this.scheduleRefresh(60);
        }
    }

    private scheduleRefresh(expiresInSeconds: number): void {
        if (this.refreshTimer) {
            clearTimeout(this.refreshTimer);
        }
        const refreshTime = Math.max(expiresInSeconds * 1000, 0);
        this.refreshTimer = setTimeout(() => {
            void this.getBearerToken();
        }, refreshTime);
    }

    async getUserProfile(identityId: string): Promise<MParticleProfile | undefined> {
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
            if (response.status === 200) {
                const data = (await response.json()) as unknown;
                const parsed = MParticleProfileSchema.safeParse(data);
                if (parsed.success) {
                    return parsed.data;
                } else {
                    throw new Error(`Failed to parse mParticle profile: ${parsed.error.message}`);
                }
            } else if (response.status === 429) {
                console.log('mParticle returned a 429: we are being rate-limited');
                // TODO - back off
                return undefined;
            } else if (response.status === 404) {
                console.log('mParticle returned a 404: user does not exist');
                return undefined;
            } else {
                const data = (await response.json()) as unknown;
                throw new Error(`mParticle returned ${response.status}: ${String(data)}`);
            }
        } catch (error) {
            logError(`Error fetching profile from mParticle. ${String(error)}`);
            return undefined;
        }
    }
}
