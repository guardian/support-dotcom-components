import { createHmac, timingSafeEqual } from 'node:crypto';
import { z } from 'zod';

export type AuxiaInteractionTokenAudience = 'sign-in-gate' | 'banner';

const AUXIA_INTERACTION_TOKEN_TTL_SECONDS = 24 * 60 * 60;

const AuxiaInteractionTokenClaimsSchema = z
    .object({
        v: z.literal(1),
        aud: z.enum(['sign-in-gate', 'banner']),
        browserId: z.string().min(1),
        treatmentTrackingId: z.string().min(1),
        treatmentId: z.string().min(1),
        surface: z.string().min(1),
        iat: z.number().int().positive(),
        exp: z.number().int().positive(),
    })
    .strict();

export type AuxiaInteractionTokenClaims = z.infer<typeof AuxiaInteractionTokenClaimsSchema>;

type AuxiaInteractionTokenInput = Omit<AuxiaInteractionTokenClaims, 'v' | 'iat' | 'exp'>;

export const isValidAuxiaInteractionTokenSecret = (secret: string): boolean =>
    /^[a-fA-F0-9]{64}$/.test(secret);

const getKey = (secret: string): Buffer => {
    if (!isValidAuxiaInteractionTokenSecret(secret)) {
        throw new Error(
            'auxia-interaction-token-secret must be 32 bytes encoded as 64 hex characters',
        );
    }

    return Buffer.from(secret, 'hex');
};

export const createAuxiaInteractionToken = (
    secret: string,
    input: AuxiaInteractionTokenInput,
): string => {
    const issuedAt = Math.floor(Date.now() / 1000);
    const claims: AuxiaInteractionTokenClaims = {
        ...input,
        v: 1,
        iat: issuedAt,
        exp: issuedAt + AUXIA_INTERACTION_TOKEN_TTL_SECONDS,
    };
    const encodedClaims = Buffer.from(JSON.stringify(claims)).toString('base64url');
    const signature = createHmac('sha256', getKey(secret))
        .update(encodedClaims)
        .digest('base64url');

    return `${encodedClaims}.${signature}`;
};

export const verifyAuxiaInteractionToken = (
    secret: string,
    token: string,
    expectedAudience: AuxiaInteractionTokenAudience,
): AuxiaInteractionTokenClaims | undefined => {
    const [encodedClaims, encodedSignature, ...extraParts] = token.split('.');
    if (
        !encodedClaims ||
        !encodedSignature ||
        extraParts.length > 0 ||
        !/^[A-Za-z0-9_-]+$/.test(encodedClaims) ||
        !/^[A-Za-z0-9_-]+$/.test(encodedSignature)
    ) {
        return undefined;
    }

    const suppliedSignature = Buffer.from(encodedSignature, 'base64url');
    const expectedSignature = createHmac('sha256', getKey(secret)).update(encodedClaims).digest();
    if (
        suppliedSignature.length !== expectedSignature.length ||
        !timingSafeEqual(suppliedSignature, expectedSignature)
    ) {
        return undefined;
    }

    let rawClaims: unknown;
    try {
        rawClaims = JSON.parse(Buffer.from(encodedClaims, 'base64url').toString('utf8'));
    } catch {
        return undefined;
    }

    const parsedClaims = AuxiaInteractionTokenClaimsSchema.safeParse(rawClaims);
    if (!parsedClaims.success) {
        return undefined;
    }

    const claims = parsedClaims.data;
    const now = Math.floor(Date.now() / 1000);
    if (
        claims.aud !== expectedAudience ||
        claims.exp <= now ||
        claims.iat > now + 60 ||
        claims.exp <= claims.iat ||
        claims.exp - claims.iat > AUXIA_INTERACTION_TOKEN_TTL_SECONDS
    ) {
        return undefined;
    }

    return claims;
};
