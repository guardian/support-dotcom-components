import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
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

const container = css`
    padding: 6px 10px 28px 10px;
    border-top: 1px solid ${brandAlt[200]};
    border-bottom: 1px solid ${neutral[86]};
    background: ${neutral[93]};

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

const textContainer = css`
    ${body.medium()};
    font-size: 16px;

    p {
        margin: 0;
    }

    & > * + p {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        & > * + p {
            margin-top: ${space[4]}px;
        }
    }
`;

const cta = css`
    color: ${neutral[7]};
    border: 1px solid ${neutral[0]};
    background-color: ${brandAlt[400]};

    &:hover {
        background-color: ${brandAlt[200]};
    }
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
    paragraphs: string[];
    numArticles: number;
}

const LiveblogEpicBody: React.FC<LiveblogEpicBodyProps> = ({
    numArticles,
    paragraphs,
}: LiveblogEpicBodyProps) => {
    return (
        <div css={textContainer}>
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
}

const LiveblogEpicCta: React.FC<LiveblogEpicCtaProps> = ({
    text,
    baseUrl,
    tracking,
    countryCode,
}: LiveblogEpicCtaProps) => {
    const url = addRegionIdAndTrackingParamsToSupportUrl(
        baseUrl || DEFAULT_CTA_BASE_URL,
        tracking,
        countryCode,
    );
    return (
        <LinkButton css={cta} priority="primary" href={url}>
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

export const ContributionsLiveblogEpic: React.FC<LiveblogEpicProps> = ({
    variant,
    countryCode,
    numArticles,
    tracking,
}: LiveblogEpicProps) => {
    const cleanParagraphs = variant.paragraphs.map(paragraph =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );

    if (cleanParagraphs.some(containsNonArticleCountPlaceholder)) {
        return null;
    }

    return (
        <section css={container}>
            <LiveblogEpicBody paragraphs={cleanParagraphs} numArticles={numArticles} />
            <LiveblogEpicCta
                text={variant.cta?.text}
                baseUrl={variant.cta?.baseUrl}
                tracking={tracking}
            />
        </section>
    );
};
