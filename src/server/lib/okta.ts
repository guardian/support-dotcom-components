import type { JwtClaims } from '@okta/jwt-verifier';
import OktaJwtVerifier from '@okta/jwt-verifier';
import { z } from 'zod';
import { putMetric } from '../utils/cloudwatch';
import { logInfo } from '../utils/logging';
import { getSsmValue } from '../utils/ssm';
import { isProd } from './env';

const oktaConfigSchema = z.object({
    issuer: z.string(),
    audience: z.string(),
});

type OktaConfig = z.infer<typeof oktaConfigSchema>;

// The claims object returned by Okta should include the identity_id
interface JwtClaimsWithUserID extends JwtClaims {
    legacy_identity_id?: string;
}

export const getOktaConfig = async (): Promise<OktaConfig> => {
    const stage = isProd ? 'PROD' : 'CODE';
    const ssmValue = await getSsmValue(stage, 'okta', true);
    if (!ssmValue) {
        throw new Error(`Failed to get config for Okta from SSM`);
    }
    const parsed = oktaConfigSchema.safeParse(JSON.parse(ssmValue));
    if (parsed.success) {
        return parsed.data;
    } else {
        throw new Error(`Failed to get config for Okta: ${parsed.error.message}`);
    }
};

export class Okta {
    private oktaJwtVerifier: OktaJwtVerifier;
    private audience: string;

    constructor(config: OktaConfig) {
        this.audience = config.audience;

        this.oktaJwtVerifier = new OktaJwtVerifier({
            issuer: config.issuer,
            cacheMaxAge: 24 * 60 * 60 * 1000, // 24 hours
        } as OktaJwtVerifier.VerifierOptions);
    }

    // The returned Promise will fail if verification fails for any reason
    private verifyAccessToken(authHeader: string): Promise<OktaJwtVerifier.Jwt> {
        const accessToken = authHeader.match(/Bearer (.+)/)?.[1];
        if (accessToken) {
            return this.oktaJwtVerifier.verifyAccessToken(accessToken, this.audience);
        } else {
            return Promise.reject(Error('Invalid Authorization header'));
        }
    }

    /**
     * Verifies an Authorisation header containing an Okta access token.
     * If verification is successful then the identityId is extracted and returned.
     * If verification fails then return undefined.
     * Note - we use local verification here, which means no request is made to Okta.
     */
    getIdentityIdFromOktaToken(authorisationHeader: string): Promise<string | undefined> {
        return this.verifyAccessToken(authorisationHeader)
            .then((jwt) => {
                const claims = jwt.claims as JwtClaimsWithUserID;
                if (!claims.legacy_identity_id) {
                    logInfo('No legacy_identity_id in claims');
                    return undefined;
                }

                return claims.legacy_identity_id;
            })
            .catch((err) => {
                logInfo(`Failed to verify access token: ${String(err)}`);
                putMetric('access-token-verification-failure');
                // Do not use identityId if we cannot verify the session
                return undefined;
            });
    }
}
