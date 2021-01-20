import React from 'react';
import { css } from '@emotion/core';
import {body, titlepiece} from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import { neutral, brandAlt } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import {
    replaceNonArticleCountPlaceholders,
    containsNonArticleCountPlaceholder,
} from '../../../lib/placeholders';
import { EpicTracking } from './ContributionsEpicTypes';
import { Variant } from '../../../lib/variants';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../lib/tracking';
import {LiveblogEpicDesignTestVariants} from "../../../tests/liveblogEpicDesignTest";

const container = (designTestVariant: LiveblogEpicDesignTestVariants) => css`
    padding: 6px 10px 28px 10px;
    border-top: 1px solid ${brandAlt[400]};
    border-bottom: 1px solid ${neutral[86]};
    ${designTestVariant === LiveblogEpicDesignTestVariants.control ? `background: ${neutral[93]};` : `background: ${neutral[100]};`}
    
    ${designTestVariant === LiveblogEpicDesignTestVariants.yellowHeader ? `border: 1px solid ${neutral[0]};` : ''}

    * {
        ::selection {
            background: ${palette.brandAlt[400]};
        }
    }

    & > * + * {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        padding-left: 80px;
        padding-right: 20px;

        & > * + * {
            margin-top: ${space[4]}px;
        }
    }
`;

// TODO - remove param?
const textContainer = (designTestVariant: LiveblogEpicDesignTestVariants) => css`
    ${body.medium()};
    font-size: 16px;

    p {
        margin: 0;
    }

    & > p + p {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        & > p + p {
            margin-top: ${space[4]}px;
        }
    }
`;

const cta = (designTestVariant: LiveblogEpicDesignTestVariants) => css`
    color: ${neutral[7]};
    ${designTestVariant === LiveblogEpicDesignTestVariants.control ? `border: 1px solid ${neutral[0]};` : ''}
    background-color: ${brandAlt[400]};

    &:hover {
        background-color: ${brandAlt[200]};
    }
`;

const designTestYellowHeading = css`
    ${titlepiece.small()};
    font-size: 28px;
    background-color: ${brandAlt[400]};
    border-top: 1px solid ${neutral[0]};
    border-left: 1px solid ${neutral[0]};
    border-right: 1px solid ${neutral[0]};
    
    padding: 4px 10px 13px 10px; 
    ${from.tablet} {
        padding-left: 80px;
        padding-right: 20px;
    }
`;

const designTestSmallHeading = css`
    font-weight: 700;
`;

interface LiveblogEpicBodyParagraphProps {
    paragraph: string;
    numArticles: number;
}

const LiveblogEpicBodyParagraph: React.FC<LiveblogEpicBodyParagraphProps> = ({
    paragraph,
    numArticles,
}: LiveblogEpicBodyParagraphProps) => {
    const elements = replaceArticleCount(paragraph, numArticles, 'epic');

    return <p>{elements}</p>;
};

interface LiveblogEpicBodyProps {
    heading: string | undefined;
    paragraphs: string[];
    numArticles: number;
    designTestVariant: LiveblogEpicDesignTestVariants;
}

const LiveblogEpicBody: React.FC<LiveblogEpicBodyProps> = ({
    heading,
    numArticles,
    paragraphs,
    designTestVariant,
}: LiveblogEpicBodyProps) => {
    return (
        <div css={textContainer(designTestVariant)}>
            { designTestVariant === LiveblogEpicDesignTestVariants.smallHeader && heading &&
                <div css={designTestSmallHeading}>{heading}</div>
            }
            {paragraphs.map(paragraph => (
                <LiveblogEpicBodyParagraph
                    key={paragraph}
                    paragraph={paragraph}
                    numArticles={numArticles}
                />
            ))}
        </div>
    );
};

const DEFAULT_CTA_TEXT = 'Make a contribution';
const DEFAULT_CTA_BASE_URL = 'https://support.theguardian.com/uk/contribute';

interface LiveblogEpicCtaProps {
    text?: string;
    baseUrl?: string;
    countryCode?: string;
    tracking: EpicTracking;
    designTestVariant: LiveblogEpicDesignTestVariants;
}

const LiveblogEpicCta: React.FC<LiveblogEpicCtaProps> = ({
    text,
    baseUrl,
    tracking,
    countryCode,
    designTestVariant,
}: LiveblogEpicCtaProps) => {
    const url = addRegionIdAndTrackingParamsToSupportUrl(
        baseUrl || DEFAULT_CTA_BASE_URL,
        tracking,
        countryCode,
    );
    return (
        <LinkButton css={cta(designTestVariant)} priority="primary" href={url}>
            {text || DEFAULT_CTA_TEXT}
        </LinkButton>
    );
};

interface LiveblogEpicProps {
    variant: Variant;
    tracking: EpicTracking;
    countryCode?: string;
    numArticles: number;
}

export const ContributionsLiveblogEpicComponent: (
    designTestVariant: LiveblogEpicDesignTestVariants
) => React.FC<LiveblogEpicProps> = designTestVariant => ({
    variant,
    countryCode,
    numArticles,
    tracking,
}: LiveblogEpicProps) => {
    const cleanParagraphs = variant.paragraphs.map(paragraph =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );
    const cleanHeading = replaceNonArticleCountPlaceholders(variant.heading);

    if (
        cleanParagraphs.some(containsNonArticleCountPlaceholder) ||
        containsNonArticleCountPlaceholder(cleanHeading)
    ) {
        return null;
    }

    return (
        <>
            { designTestVariant === LiveblogEpicDesignTestVariants.yellowHeader && cleanHeading &&
                <div css={designTestYellowHeading}>{cleanHeading}</div>
            }
            <section css={container(designTestVariant)}>
                <LiveblogEpicBody
                    heading={cleanHeading}
                    paragraphs={cleanParagraphs}
                    numArticles={numArticles}
                    designTestVariant={designTestVariant}/>
                <LiveblogEpicCta
                    text={variant.cta?.text}
                    baseUrl={variant.cta?.baseUrl}
                    tracking={tracking}
                    designTestVariant={designTestVariant}
                />
            </section>
        </>
    );
};

export const ContributionsLiveblogEpic: React.FC<LiveblogEpicProps> =
    ContributionsLiveblogEpicComponent(LiveblogEpicDesignTestVariants.control);
