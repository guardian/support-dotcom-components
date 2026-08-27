import type { BannerContent, BannerVariant, EpicVariant } from '../../shared/types';
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
    const updatedHeading = epicVariant.heading
        ? substituteMParticleTemplate(epicVariant.heading, userAttributes)
        : epicVariant.heading;

    const updatedParagraphs = epicVariant.paragraphs.map((paragraph) => {
        return substituteMParticleTemplate(paragraph, userAttributes);
    });
    const updatedHighlightedText = epicVariant.highlightedText
        ? substituteMParticleTemplate(epicVariant.highlightedText, userAttributes)
        : epicVariant.highlightedText;

    return {
        heading: updatedHeading,
        paragraphs: updatedParagraphs,
        highlightedText: updatedHighlightedText,
    };
};

const substituteBannerContent = (
    content: BannerContent,
    userAttributes: MParticleProfile['user_attributes'],
): Partial<BannerContent> => {
    const updatedHeading = content.heading
        ? substituteMParticleTemplate(content.heading, userAttributes)
        : content.heading;

    const updatedParagraphs = content.paragraphs?.map((paragraph) =>
        substituteMParticleTemplate(paragraph, userAttributes),
    );

    const updatedHighlightedText = content.highlightedText
        ? substituteMParticleTemplate(content.highlightedText, userAttributes)
        : content.highlightedText;

    return {
        heading: updatedHeading,
        paragraphs: updatedParagraphs,
        highlightedText: updatedHighlightedText,
    };
};

export const substituteMParticleTemplateInBannerVariant = (
    bannerVariant: BannerVariant,
    userAttributes: MParticleProfile['user_attributes'],
): Partial<BannerVariant> => {
    const updatedBannerContent = bannerVariant.bannerContent
        ? substituteBannerContent(bannerVariant.bannerContent, userAttributes)
        : bannerVariant.bannerContent;

    const updatedMobileBannerContent = bannerVariant.mobileBannerContent
        ? substituteBannerContent(bannerVariant.mobileBannerContent, userAttributes)
        : bannerVariant.mobileBannerContent;

    return {
        bannerContent: updatedBannerContent,
        mobileBannerContent: updatedMobileBannerContent,
    };
};
