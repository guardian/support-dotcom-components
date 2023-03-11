import React from 'react';
import { css } from '@emotion/react';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import {
    addTrackingParamsToBodyLinks,
    containsNonArticleCountPlaceholder,
    replaceNonArticleCountPlaceholders,
    getLocalCurrencySymbol,
} from '@sdc/shared/lib';
import { EpicProps, epicPropsSchema } from '@sdc/shared/types';
import { BylineWithHeadshot } from './BylineWithHeadshot';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { replaceArticleCount } from '../../lib/replaceArticleCount';
import { OphanTracking } from '../shared/ArticleCountOptOutPopup';
import { ContributionsEpicArticleCountAboveWithOptOut } from './ContributionsEpicArticleCountAboveWithOptOut';
import { useArticleCountOptOut } from '../../hooks/useArticleCountOptOut';
import { withParsedProps } from '../shared/ModuleWrapper';
import { ContributionsEpicSignInCta } from './ContributionsEpicSignInCta';
import NewsletterSignup from './NewsletterSignup';
import { ContributionsEpicCtas } from './ContributionsEpicCtas';
import {
    useEpicChoiceCardSelection,
    useEpicChoiceCardsTrackingInsertEvent,
    useEpicChoiceCardsTrackingViewEvent,
} from '../../hooks/choiceCards';
import { ChoiceCards } from '../banners/choiceCardsBanner/components/ChoiceCards';

// CSS Styling
// -------------------------------------------
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

    b,
    strong {
        font-weight: bold;
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
        border-bottom: 1px solid ${palette.news[400]};
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

// EpicHeader - local component
// -------------------------------------------
interface EpicHeaderProps {
    text: string;
    numArticles: number;
    tracking?: OphanTracking;
    showAboveArticleCount: boolean;
}

const EpicHeader: React.FC<EpicHeaderProps> = ({
    text,
    numArticles,
    tracking,
    showAboveArticleCount,
}: EpicHeaderProps) => {
    const elements = replaceArticleCount(
        text,
        numArticles,
        'epic',
        tracking,
        !showAboveArticleCount,
    );
    return <h2 css={headingStyles}>{elements}</h2>;
};

// Highlighted - local component
// -------------------------------------------
type HighlightedProps = {
    highlightedText: string;
    countryCode?: string;
    numArticles: number;
    tracking?: OphanTracking;
    showAboveArticleCount: boolean;
};

const Highlighted: React.FC<HighlightedProps> = ({
    highlightedText,
    numArticles,
    tracking,
    showAboveArticleCount,
}: HighlightedProps) => {
    const elements = replaceArticleCount(
        highlightedText,
        numArticles,
        'epic',
        tracking,
        !showAboveArticleCount,
    );

    return (
        <strong css={highlightWrapperStyles}>
            {' '}
            <span css={highlightStyles}>{elements}</span>
        </strong>
    );
};

// EpicBodyParagraph - local component
// -------------------------------------------
interface EpicBodyParagraphProps {
    paragraph: string;
    numArticles: number;
    highlighted: JSX.Element | null;
    tracking?: OphanTracking;
    showAboveArticleCount: boolean;
}

const EpicBodyParagraph: React.FC<EpicBodyParagraphProps> = ({
    paragraph,
    numArticles,
    highlighted,
    tracking,
    showAboveArticleCount,
}: EpicBodyParagraphProps) => {
    const elements = replaceArticleCount(
        paragraph,
        numArticles,
        'epic',
        tracking,
        !showAboveArticleCount,
    );

    return (
        <p css={bodyStyles}>
            {elements}
            {highlighted ? highlighted : null}
        </p>
    );
};

// EpicBody - local component
// -------------------------------------------
type BodyProps = {
    paragraphs: string[];
    highlightedText?: string;
    countryCode?: string;
    numArticles: number;
    tracking?: OphanTracking;
    showAboveArticleCount: boolean;
};

const EpicBody: React.FC<BodyProps> = ({
    countryCode,
    numArticles,
    paragraphs,
    highlightedText,
    tracking,
    showAboveArticleCount,
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
                                    showAboveArticleCount={showAboveArticleCount}
                                />
                            ) : null
                        }
                        tracking={tracking}
                        showAboveArticleCount={showAboveArticleCount}
                    />
                );
                return paragraphElement;
            })}
        </>
    );
};

// ContributionsEpic - exported component
// -------------------------------------------
const ContributionsEpic: React.FC<EpicProps> = ({
    variant,
    tracking,
    countryCode,
    articleCounts,
    onReminderOpen,
    email,
    fetchEmail,
    submitComponentEvent,
    openCmp,
    hasConsentForArticleCount,
    stage,
}: EpicProps) => {
    const { image, tickerSettings, showChoiceCards, choiceCardAmounts } = variant;

    const { choiceCardSelection, setChoiceCardSelection } = useEpicChoiceCardSelection(
        choiceCardAmounts,
        showChoiceCards,
        variant.defaultChoiceCardFrequency,
    );

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    const { hasOptedOut, onArticleCountOptIn, onArticleCountOptOut } = useArticleCountOptOut();

    const setNode = useEpicChoiceCardsTrackingViewEvent(
        tracking,
        submitComponentEvent,
        countryCode,
        stage,
    );

    useEpicChoiceCardsTrackingInsertEvent(tracking, submitComponentEvent);

    const cleanHighlighted = replaceNonArticleCountPlaceholders(
        variant.highlightedText,
        countryCode,
    );

    const cleanHeading = replaceNonArticleCountPlaceholders(variant.heading, countryCode);

    const cleanParagraphs = variant.paragraphs
        .map(paragraph => replaceNonArticleCountPlaceholders(paragraph, countryCode))
        .map(paragraph =>
            addTrackingParamsToBodyLinks(
                paragraph,
                tracking,
                articleCounts.for52Weeks,
                countryCode,
            ),
        );

    if (
        [cleanHighlighted, cleanHeading, ...cleanParagraphs].some(
            containsNonArticleCountPlaceholder,
        )
    ) {
        return null; // quick exit if something goes wrong. Ideally we'd throw and caller would catch/log but TODO that separately
    }

    const ophanTracking: OphanTracking | undefined = submitComponentEvent && {
        submitComponentEvent,
        componentType: 'ACQUISITIONS_EPIC',
    };

    const showAboveArticleCount = !!(
        variant.separateArticleCount?.type === 'above' && hasConsentForArticleCount
    );

    return (
        <section ref={setNode} css={wrapperStyles}>
            {showAboveArticleCount && (
                <div css={articleCountAboveContainerStyles}>
                    <ContributionsEpicArticleCountAboveWithOptOut
                        articleCounts={articleCounts}
                        isArticleCountOn={!hasOptedOut}
                        onArticleCountOptOut={onArticleCountOptOut}
                        onArticleCountOptIn={onArticleCountOptIn}
                        openCmp={openCmp}
                        submitComponentEvent={submitComponentEvent}
                        copy={variant.separateArticleCount?.copy}
                        countType={variant.separateArticleCount?.countType}
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

            {image && (
                <div css={imageWrapperStyles}>
                    <img src={image.mainUrl} css={imageStyles} alt={image.altText} />
                </div>
            )}

            {cleanHeading && (
                <EpicHeader
                    text={cleanHeading}
                    numArticles={articleCounts.forTargetedWeeks}
                    tracking={ophanTracking}
                    showAboveArticleCount={showAboveArticleCount}
                />
            )}

            <EpicBody
                paragraphs={cleanParagraphs}
                highlightedText={cleanHighlighted}
                countryCode={countryCode}
                numArticles={articleCounts.forTargetedWeeks}
                tracking={ophanTracking}
                showAboveArticleCount={showAboveArticleCount}
            />

            {variant.bylineWithImage && (
                <BylineWithHeadshot bylineWithImage={variant.bylineWithImage} />
            )}

            {variant.showSignInLink && <ContributionsEpicSignInCta />}

            {choiceCardAmounts && (
                <ChoiceCards
                    setSelectionsCallback={setChoiceCardSelection}
                    selection={choiceCardSelection}
                    submitComponentEvent={submitComponentEvent}
                    currencySymbol={currencySymbol}
                    amounts={choiceCardAmounts.amounts}
                    amountsTestName={choiceCardAmounts?.testName}
                    amountsVariantName={choiceCardAmounts?.variantName}
                    ophanEventIdPrefix="contributions-epic"
                    countryCode={countryCode ?? 'GB'}
                    tracking={tracking}
                />
            )}

            {variant.newsletterSignup ? (
                <NewsletterSignup url={variant.newsletterSignup.url} />
            ) : (
                <ContributionsEpicCtas
                    variant={variant}
                    tracking={tracking}
                    countryCode={countryCode}
                    articleCounts={articleCounts}
                    onReminderOpen={onReminderOpen}
                    email={email}
                    fetchEmail={fetchEmail}
                    submitComponentEvent={submitComponentEvent}
                    showChoiceCards={showChoiceCards}
                    amountsTestName={choiceCardAmounts?.testName}
                    amountsVariantName={choiceCardAmounts?.variantName}
                    choiceCardSelection={choiceCardSelection}
                />
            )}
        </section>
    );
};

export const validate = (props: unknown): props is EpicProps => {
    const result = epicPropsSchema.safeParse(props);
    return result.success;
};

const validatedEpic = withParsedProps(ContributionsEpic, validate);
const unValidatedEpic = ContributionsEpic;
export { validatedEpic as ContributionsEpic, unValidatedEpic as ContributionsEpicUnvalidated };
