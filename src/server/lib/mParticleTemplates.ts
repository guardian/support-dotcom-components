import type { BannerContent, BannerVariant, EpicVariant } from '../../shared/types';
import type { MParticleProfile } from './mParticle';

export const matchesMParticleTemplates = async (
    getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    testName: string,
    mParticleTemplates?: string[],
): Promise<boolean> => {
    if (!testName.startsWith('MPARTICLE_ATTRIBUTES_')) {
        return true;
    }

    if (!mParticleTemplates?.length) {
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
    const attributes = userAttributes as Record<string, unknown>;
    return template.replace(
        /%%mparticle_([^%]+)%%/gi,
        (templateMatch, capturedAttribute: string) => {
            const attributeKey = Object.keys(attributes).find(
                (key) => key.toLowerCase() === capturedAttribute.toLowerCase(),
            );
            const attributeValue = attributeKey ? attributes[attributeKey] : undefined;

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
): EpicVariant => {
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
        ...epicVariant,
        heading: updatedHeading,
        paragraphs: updatedParagraphs,
        highlightedText: updatedHighlightedText,
    };
};

const substituteBannerContent = (
    content: BannerContent,
    userAttributes: MParticleProfile['user_attributes'],
): BannerContent => {
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
        ...content,
        heading: updatedHeading,
        paragraphs: updatedParagraphs,
        highlightedText: updatedHighlightedText,
    };
};

export const substituteMParticleTemplateInBannerVariant = (
    bannerVariant: BannerVariant,
    userAttributes: MParticleProfile['user_attributes'],
): BannerVariant => {
    const updatedBannerContent = bannerVariant.bannerContent
        ? substituteBannerContent(bannerVariant.bannerContent, userAttributes)
        : bannerVariant.bannerContent;

    const updatedMobileBannerContent = bannerVariant.mobileBannerContent
        ? substituteBannerContent(bannerVariant.mobileBannerContent, userAttributes)
        : bannerVariant.mobileBannerContent;

    return {
        ...bannerVariant,
        bannerContent: updatedBannerContent,
        mobileBannerContent: updatedMobileBannerContent,
    };
};
