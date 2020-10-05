import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { palette } from '@guardian/src-foundations';
import { news, neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { LinkButton } from '@guardian/src-button';
import {
    replaceNonArticleCountPlaceholders,
    containsNonArticleCountPlaceholder,
} from '../../../lib/placeholders';
import { EpicTracking } from './ContributionsEpicTypes';
import { Variant } from '../../../lib/variants';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';
import { addTrackingParams } from '../../../lib/tracking';

const container = css`
    * {
        ::selection {
            background: ${palette.brandAlt[400]};
        }
    }

    & > * + * {
        margin-top: ${space[4]}px;
    }
`;

const textContainer = css`
    ${body.medium()};
    font-size: 16px;

    p {
        margin: 0;
    }

    & > * + p {
        margin-top: ${space[4]}px;
    }
`;

const cta = css`
    color: ${news[400]};
    border-color: ${neutral[86]};

    &:hover {
        background-color: ${neutral[97]};
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

    return (
        <p>
            <em>{elements}</em>
        </p>
    );
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
    tracking: EpicTracking;
}

const LiveblogEpicCta: React.FC<LiveblogEpicCtaProps> = ({
    text,
    baseUrl,
    tracking,
}: LiveblogEpicCtaProps) => {
    // TODO: use addRegionIdAndTrackingToSupportUrl
    const url = addTrackingParams(baseUrl || DEFAULT_CTA_BASE_URL, tracking);
    return (
        <LinkButton css={cta} priority="tertiary" href={url}>
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
        return null; // quick exit if something goes wrong. Ideally we'd throw and caller would catch/log but TODO that separately
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
