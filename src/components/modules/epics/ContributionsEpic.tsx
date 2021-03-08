import React, { useState } from 'react';
import { css } from '@emotion/core';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import {
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
} from '../../../lib/placeholders';
import { EpicTracking } from './ContributionsEpicTypes';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { Variant } from '../../../lib/variants';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';
import { EpicSeparateArticleCountTestVariants } from '../../../tests/epicArticleCountTest';
import { ContributionsEpicArticleCountAbove } from './ContributionsEpicArticleCountAbove';
import { ContributionsEpicArticleCountInline } from './ContributionsEpicArticleCountInline';

// Spacing values below are multiples of 4.
// See https://www.theguardian.design/2a1e5182b/p/449bd5
const wrapperStyles = css`
    padding: ${space[1]}px ${space[1]}px ${space[3]}px;
    border-top: 1px solid ${palette.brandAlt[400]};
    background-color: ${palette.neutral[97]};

    * {
        ::selection {
            background: ${palette.brandAlt[400]};
        }
        ::-moz-selection {
            background: ${palette.brandAlt[400]};
        }
    }
`;

const headingStyles = css`
    ${headline.xxsmall({ fontWeight: 'bold' })}
    margin-top: 0;
    margin-bottom: ${space[3]}px;
`;

// Custom styles for <a> tags in the Epic content
const linkStyles = css`
    a {
        color: ${palette.news[400]};
        text-decoration: none;
    }

    a:hover {
        text-decoration: underline;
    }
`;

const bodyStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
    ${linkStyles}
`;

const highlightWrapperStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
    ${linkStyles}
`;

const highlightStyles = css`
    padding: 2px;
    background-color: ${palette.brandAlt[400]};
`;

const imageWrapperStyles = css`
    margin: ${space[3]}px 0 ${space[2]}px;

    ${from.tablet} {
        margin: 10px 0;
    }
`;

const imageStyles = css`
    height: 100%;
    width: 100%;
    object-fit: cover;
`;

export type EpicProps = {
    variant: Variant;
    tracking: EpicTracking;
    countryCode?: string;
    numArticles: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
};

type HighlightedProps = {
    highlightedText: string;
    countryCode?: string;
    numArticles: number;
};

type BodyProps = {
    paragraphs: string[];
    highlightedText?: string;
    countryCode?: string;
    numArticles: number;
    acVariant: EpicSeparateArticleCountTestVariants;
};

interface OnReminderOpen {
    buttonCopyAsString: string;
}

interface EpicHeaderProps {
    text: string;
    numArticles: number;
}

const EpicHeader: React.FC<EpicHeaderProps> = ({ text, numArticles }: EpicHeaderProps) => {
    const elements = replaceArticleCount(text, numArticles, 'epic');
    return <h2 css={headingStyles}>{elements}</h2>;
};

const Highlighted: React.FC<HighlightedProps> = ({
    highlightedText,
    numArticles,
}: HighlightedProps) => {
    const elements = replaceArticleCount(highlightedText, numArticles, 'epic');

    return (
        <strong css={highlightWrapperStyles}>
            {' '}
            <span css={highlightStyles}>{elements}</span>
        </strong>
    );
};

interface EpicBodyParagraphProps {
    paragraph: string;
    numArticles: number;
    highlighted: JSX.Element | null;
}

const EpicBodyParagraph: React.FC<EpicBodyParagraphProps> = ({
    paragraph,
    numArticles,
    highlighted,
}: EpicBodyParagraphProps) => {
    const elements = replaceArticleCount(paragraph, numArticles, 'epic');

    return (
        <p css={bodyStyles}>
            {elements}
            {highlighted ? highlighted : null}
        </p>
    );
};

const EpicBody: React.FC<BodyProps> = ({
    countryCode,
    numArticles,
    paragraphs,
    highlightedText,
    acVariant,
}: BodyProps) => {
    return (
        <>
            {paragraphs.map((paragraph, idx) => {
                const paragraphElement = (
                    <EpicBodyParagraph
                        key={idx}
                        paragraph={paragraph}
                        numArticles={numArticles}
                        highlighted={
                            highlightedText && idx === paragraphs.length - 1 ? (
                                <Highlighted
                                    highlightedText={highlightedText}
                                    countryCode={countryCode}
                                    numArticles={numArticles}
                                />
                            ) : null
                        }
                    />
                );

                if (acVariant === EpicSeparateArticleCountTestVariants.inline && idx === 1) {
                    return (
                        <ContributionsEpicArticleCountInline
                            numArticles={numArticles}
                            paragraphElement={paragraphElement}
                        />
                    );
                }
                return paragraphElement;
            })}
        </>
    );
};

export const ContributionsEpicComponent: (
    acVariant: EpicSeparateArticleCountTestVariants,
) => // eslint-disable-next-line react/display-name
React.FC<EpicProps> = acVariant => ({
    variant,
    tracking,
    countryCode,
    numArticles,
    onReminderOpen,
}: EpicProps) => {
    const [isReminderActive, setIsReminderActive] = useState(false);
    const { backgroundImageUrl, showReminderFields, tickerSettings } = variant;

    const cleanHighlighted = replaceNonArticleCountPlaceholders(
        variant.highlightedText,
        countryCode,
    );
    const cleanHeading = replaceNonArticleCountPlaceholders(variant.heading, countryCode);

    const cleanParagraphs = variant.paragraphs.map(paragraph =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );

    if (
        [cleanHighlighted, cleanHeading, ...cleanParagraphs].some(
            containsNonArticleCountPlaceholder,
        )
    ) {
        return null; // quick exit if something goes wrong. Ideally we'd throw and caller would catch/log but TODO that separately
    }

    return (
        <section css={wrapperStyles}>
            {acVariant === EpicSeparateArticleCountTestVariants.above && (
                <ContributionsEpicArticleCountAbove numArticles={numArticles} />
            )}

            {tickerSettings && tickerSettings.tickerData && (
                <ContributionsEpicTicker
                    settings={tickerSettings}
                    total={tickerSettings.tickerData.total}
                    goal={tickerSettings.tickerData.goal}
                />
            )}

            {backgroundImageUrl && (
                <div css={imageWrapperStyles}>
                    <img
                        src={backgroundImageUrl}
                        css={imageStyles}
                        alt="Guardian contributions message"
                    />
                </div>
            )}

            {cleanHeading && <EpicHeader text={cleanHeading} numArticles={numArticles} />}

            <EpicBody
                paragraphs={cleanParagraphs}
                highlightedText={cleanHighlighted}
                countryCode={countryCode}
                numArticles={numArticles}
                acVariant={acVariant}
            />

            {!isReminderActive && (
                <ContributionsEpicButtons
                    variant={variant}
                    tracking={tracking}
                    countryCode={countryCode}
                    onOpenReminderClick={(): void => {
                        const buttonCopyAsString = showReminderFields?.reminderCta
                            .toLowerCase()
                            .replace(/\s/g, '-');

                        // This callback let's the platform react to the user interaction with the
                        // 'Remind me' button
                        if (onReminderOpen) {
                            onReminderOpen({
                                buttonCopyAsString,
                            } as OnReminderOpen);
                        }

                        setIsReminderActive(true);
                    }}
                />
            )}

            {isReminderActive && showReminderFields && (
                <ContributionsEpicReminder
                    reminderPeriod={showReminderFields.reminderPeriod}
                    reminderLabel={showReminderFields.reminderLabel}
                    onCloseReminderClick={(): void => setIsReminderActive(false)}
                />
            )}
        </section>
    );
};

export const ContributionsEpic: React.FC<EpicProps> = ContributionsEpicComponent(
    EpicSeparateArticleCountTestVariants.control,
);
