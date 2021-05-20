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
import { OphanComponentEvent } from '../../../types/OphanTypes';
import { OphanTracking } from '../shared/ArticleCountOptOut';
import { ContributionsEpicArticleCountOptOut } from './ContributionsEpicArticleCountOptOut';
import {
    addArticleCountOptOutCookie,
    removeArticleCountFromLocalStorage,
    removeArticleCountOptOutCookie,
    hasArticleCountOptOutCookie,
} from '../shared/helpers/articleCountOptOut';

const wrapperStyles = css`
    padding: ${space[1]}px ${space[2]}px ${space[3]}px;
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

const articleCountAboveContainerStyles = css`
    margin-bottom: ${space[4]}px;
`;

export type EpicProps = {
    variant: Variant;
    tracking: EpicTracking;
    countryCode?: string;
    numArticles: number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    email?: string;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
    openCmp?: () => void;
    hasConsentForArticleCount?: boolean;
};

type HighlightedProps = {
    highlightedText: string;
    countryCode?: string;
    numArticles: number;
    tracking?: OphanTracking;
};

type BodyProps = {
    paragraphs: string[];
    highlightedText?: string;
    countryCode?: string;
    numArticles: number;
    tracking?: OphanTracking;
};

interface OnReminderOpen {
    buttonCopyAsString: string;
}

interface EpicHeaderProps {
    text: string;
    numArticles: number;
    tracking?: OphanTracking;
}

const EpicHeader: React.FC<EpicHeaderProps> = ({
    text,
    numArticles,
    tracking,
}: EpicHeaderProps) => {
    const elements = replaceArticleCount(text, numArticles, 'epic', tracking);
    return <h2 css={headingStyles}>{elements}</h2>;
};

const Highlighted: React.FC<HighlightedProps> = ({
    highlightedText,
    numArticles,
    tracking,
}: HighlightedProps) => {
    const elements = replaceArticleCount(highlightedText, numArticles, 'epic', tracking);

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
    tracking?: OphanTracking;
}

const EpicBodyParagraph: React.FC<EpicBodyParagraphProps> = ({
    paragraph,
    numArticles,
    highlighted,
    tracking,
}: EpicBodyParagraphProps) => {
    const elements = replaceArticleCount(paragraph, numArticles, 'epic', tracking);

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
    tracking,
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
                        tracking={tracking}
                    />
                );

                return paragraphElement;
            })}
        </>
    );
};

export const ContributionsEpic: React.FC<EpicProps> = ({
    variant,
    tracking,
    countryCode,
    numArticles,
    onReminderOpen,
    email,
    submitComponentEvent,
    openCmp,
    hasConsentForArticleCount,
}: EpicProps) => {
    const [isReminderActive, setIsReminderActive] = useState(false);
    const [hasOptedOut, setHasOptedOut] = useState(hasArticleCountOptOutCookie());

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

    const onArticleCountOptOut = () => {
        setHasOptedOut(true);
        addArticleCountOptOutCookie();
        removeArticleCountFromLocalStorage();
    };

    const onArticleCountOptIn = () => {
        setHasOptedOut(false);
        removeArticleCountOptOutCookie();
    };

    const ophanTracking: OphanTracking | undefined = submitComponentEvent && {
        submitComponentEvent,
        componentType: 'ACQUISITIONS_EPIC',
    };

    return (
        <section css={wrapperStyles}>
            {variant.separateArticleCount?.type === 'above' && hasConsentForArticleCount && (
                <div css={articleCountAboveContainerStyles}>
                    <ContributionsEpicArticleCountOptOut
                        numArticles={numArticles}
                        isArticleCountOn={!hasOptedOut}
                        onArticleCountOptOut={onArticleCountOptOut}
                        onArticleCountOptIn={onArticleCountOptIn}
                        openCmp={openCmp}
                    />
                </div>
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

            {cleanHeading && (
                <EpicHeader
                    text={cleanHeading}
                    numArticles={numArticles}
                    tracking={ophanTracking}
                />
            )}

            <EpicBody
                paragraphs={cleanParagraphs}
                highlightedText={cleanHighlighted}
                countryCode={countryCode}
                numArticles={numArticles}
                tracking={ophanTracking}
            />

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
                submitComponentEvent={submitComponentEvent}
                isReminderActive={isReminderActive}
                isSignedIn={Boolean(email)}
            />

            {isReminderActive && showReminderFields && (
                <ContributionsEpicReminder
                    initialEmailAddress={email}
                    reminderPeriod={showReminderFields.reminderPeriod}
                    reminderLabel={showReminderFields.reminderLabel}
                    onCloseReminderClick={(): void => setIsReminderActive(false)}
                    submitComponentEvent={submitComponentEvent}
                />
            )}
        </section>
    );
};
