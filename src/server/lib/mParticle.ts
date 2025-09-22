import { z } from 'zod';
import { getSsmValue } from '../utils/ssm';
import { isProd } from './env';

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
    }),
});
type MParticleConfig = z.infer<typeof MParticleConfigSchema>;

const MParticleProfileSchema = z.object({
    user_attributes: z.record(z.any()), // TODO - what's in here?
    audience_memberships: z.object({
        audience_id: z.number(),
        audience_name: z.string(),
    }),
});
type MParticleProfile = z.infer<typeof MParticleProfileSchema>;

const MParticleOAuthTokenSchema = z.object({
    access_token: z.string(),
    expires_in: z.number(),
});

// TODO - refactor to build after fetching config and fetching first bearer token
export const getMParticleConfig = async (): Promise<MParticleConfig> => {
    const stage = isProd ? 'PROD' : 'CODE';
    const ssmValue = await getSsmValue(stage, 'mparticle');
    const parsed = MParticleConfigSchema.safeParse(ssmValue);
    if (parsed.success) {
        return parsed.data;
    } else {
        throw new Error(`Failed to get config for mParticle: ${parsed.error.message}`);
    }
}

export class MParticle {
    private config: MParticleConfig;
    private bearerToken: string | null = null;
    private refreshTimer: NodeJS.Timeout | null = null;

    constructor(config: MParticleConfig) {
        this.config = config
        void this.getBearerToken();
    }

    private async getBearerToken(): Promise<void> {
        try {
            // https://docs.mparticle.com/developers/apis/profile-api/
            const response = await fetch('https://sso.auth.mparticle.com/oauth/token', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(this.config.oauthTokenEndpoint)
            });
            const data = await response.json() as unknown;
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
        const refreshTime = Math.max((expiresInSeconds) * 1000, 0);
        this.refreshTimer = setTimeout(() => {
            void this.getBearerToken();
        }, refreshTime);
    }

    async getUserProfile(browserId: string): Promise<MParticleProfile | undefined> {
        const { orgId, accountId, workspaceId } = this.config.userProfileEndpoint;
            const url = `https://api.mparticle.com/userprofile/v1/resolve/${orgId}/${accountId}/${workspaceId}?fields=user_attributes,audience_memberships`;

        try {
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.bearerToken}`,
                },
                body: JSON.stringify({
                    environment_type: isProd ? 'production' : 'development',
                    identity: {
                        type: 'customer_id',
                        value: browserId,
                    }
                })
            });
            if (response.status === 200) {
                const data = await response.json() as unknown;
                const parsed = MParticleProfileSchema.safeParse(data);
                if (parsed.success) {
                    return parsed.data;
                } else {
                    console.log(`Failed to parse mParticle profile: ${parsed.error.message}`)
                    return undefined;
                }
            } else if (response.status === 429) {
                console.log('mParticle returned a 429, meaning we are being rate-limited');
            } else {
                throw new Error(`mParticle returned ${response.status}`);
            }
        } catch (error) {
            console.log(`Error fetching profile from mParticle: ${String(error)}`)
            return undefined;
        }
    }
}
