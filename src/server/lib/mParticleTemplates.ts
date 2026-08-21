import type { EpicVariant } from '../../shared/types';
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

export const substituteMParticleTemplate = (
    template: string,
    userAttributes: MParticleProfile['user_attributes'],
): string => {
    if (!userAttributes) {
        return template;
    }
    return template.replace(
        /%%mparticle_([^%]+)%%/g,
        (templateMatch, capturedAttribute: string) => {
            const attributeValue: unknown = (userAttributes as Record<string, unknown>)[
                capturedAttribute
            ];
            if (typeof attributeValue === 'string' || typeof attributeValue === 'number') {
                return String(attributeValue);
            }
            return templateMatch;
        },
    );
};

export const substituteMParticleTemplateInEpicVariant = (
    epicVariant: EpicVariant,
    userAttributes: MParticleProfile['user_attributes'],
): Partial<EpicVariant> => {
    const updatedEpicHeading = epicVariant.heading
        ? substituteMParticleTemplate(epicVariant.heading, userAttributes)
        : epicVariant.heading;

    const updatedParagraphs = epicVariant.paragraphs.map((paragraph) => {
        return substituteMParticleTemplate(paragraph, userAttributes);
    });
    const updatedHighlightedText = epicVariant.highlightedText
        ? substituteMParticleTemplate(epicVariant.highlightedText, userAttributes)
        : epicVariant.highlightedText;

    return {
        heading: updatedEpicHeading,
        paragraphs: updatedParagraphs,
        highlightedText: updatedHighlightedText,
    };
};
