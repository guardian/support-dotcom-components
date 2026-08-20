import type { MParticleProfile } from './mParticle';

export const matchesMParticleTemplates = async (
    getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    mParticleTemplates?: string[],
): Promise<boolean> => {
    if (!mParticleTemplates) {
        return true;
    }

    const mParticleProfile = await getMParticleProfile();
    if (!mParticleProfile) {
        return false;
    }

    for (const template of mParticleTemplates) {
        if (!mParticleProfile.user_attributes || !(template in mParticleProfile.user_attributes)) {
            return false;
        }
    }
    return true;
};
