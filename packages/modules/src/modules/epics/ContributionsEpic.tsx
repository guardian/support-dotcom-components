import React, { useEffect, useState } from 'react';
import { css } from '@emotion/react';
import { body, headline } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import {
    containsNonArticleCountPlaceholder,
    createInsertEventFromTracking,
    createViewEventFromTracking,
    replaceNonArticleCountPlaceholders,
} from '@sdc/shared/lib';
import {
    ContributionFrequency,
    EpicProps,
    epicPropsSchema,
    Stage,
    AmountsTestVariant,
    ConfiguredRegionAmounts,
} from '@sdc/shared/types';
import { BylineWithHeadshot } from './BylineWithHeadshot';
import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { replaceArticleCount } from '../../lib/replaceArticleCount';
import { OphanTracking } from '../shared/ArticleCountOptOutPopup';
import { ContributionsEpicArticleCountAboveWithOptOut } from './ContributionsEpicArticleCountAboveWithOptOut';
import { useArticleCountOptOut } from '../../hooks/useArticleCountOptOut';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { isProd } from '../shared/helpers/stage';
import { withParsedProps } from '../shared/ModuleWrapper';
import { ChoiceCardSelection, ContributionsEpicChoiceCards } from './ContributionsEpicChoiceCards';
import { ContributionsEpicSignInCta } from './ContributionsEpicSignInCta';
import { countryCodeToCountryGroupId, CountryGroupId } from '@sdc/shared/lib';
import { defineFetchEmail } from '../shared/helpers/definedFetchEmail';
import { logEpicView } from '@sdc/shared/lib';
import seedrandom from 'seedrandom';

const sendEpicViewEvent = (url: string, countryCode?: string, stage?: Stage): void => {
    const path = 'events/epic-view';
    const host = isProd(stage)
        ? 'https://contributions.guardianapis.com'
        : 'https://contributions.code.dev-guardianapis.com';
    const body = JSON.stringify({
        url,
        countryCode,
    });

    fetch(`${host}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
    }).then(response => {
        if (!response.ok) {
            console.log('Epic view event request failed', response);
        }
    });
};

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

    b {
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

type HighlightedProps = {
    highlightedText: string;
    countryCode?: string;
    numArticles: number;
    tracking?: OphanTracking;
    showAboveArticleCount: boolean;
};

type BodyProps = {
    paragraphs: string[];
    highlightedText?: string;
    countryCode?: string;
    numArticles: number;
    tracking?: OphanTracking;
    showAboveArticleCount: boolean;
};

interface OnReminderOpen {
    buttonCopyAsString: string;
}

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

/*
Issues I'm having:

    - This code properly belongs as a function in server/src/lib/ab.ts but I've struggled too long with types to get it working there

    - This code reflects (as far as possible) what happens in support frontend - as amounts testing can also start on the contributions page there if a user navigates to the page by means other than the Epic CTA button

    - Can I generate the mvtId number locally here? Currently it's generated by the support frontend site and stored in a cookie there. I can't find where SDC generates the equivalent, though it seems to live in the tracking object after it has been generated

    - How to make sure that if a user gets assigned to amounts testing, that testing persists for subsequent views of contributions epics? (I assume that this is a testing requirement)
*/
const MVT_MAX = 1000000;
function randomNumber(mvtId: number, seed: number): number {
    const rng = seedrandom(`${mvtId + seed}`);
    return Math.abs(rng.int32());
}
const selectAmountsVariant = (
    data: ConfiguredRegionAmounts,
    defaultName: string,
): AmountsTestVariant => {
    const test = data.test;
    const defaultReturn = {
        name: defaultName,
        amounts: data.control,
    };

    if (test == null || !test.isLive) {
        return defaultReturn;
    }
    const mvtId = Math.floor(Math.random() * MVT_MAX);
    const variants = ['CONTROL', ...test.variants.map(variant => variant.name)];
    const assignmentIndex = randomNumber(mvtId, test.seed) % variants.length;

    if ('CONTROL' === variants[assignmentIndex]) {
        return {
            name: `${test.name}|CONTROL`,
            amounts: data.control,
        };
    }

    const assigned = test.variants[assignmentIndex - 1];
    if (assigned == null) {
        return defaultReturn;
    }
    return {
        name: `${test.name}|${assigned.name}`,
        amounts: assigned.amounts,
    };
};

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
    const countryGroupId =
        countryCode != null ? countryCodeToCountryGroupId(countryCode) : 'GBPCountries';
    const [isReminderActive, setIsReminderActive] = useState(false);
    const { hasOptedOut, onArticleCountOptIn, onArticleCountOptOut } = useArticleCountOptOut();

    const [fetchedEmail, setFetchedEmail] = useState<string | undefined>(undefined);
    const fetchEmailDefined = defineFetchEmail(email, fetchEmail);

    const [amountsTest, setAmountsTest] = useState<AmountsTestVariant | undefined>();

    const determineAmountsTestVariant = (country: CountryGroupId = 'GBPCountries'): void => {
        if (variant == null || variant.choiceCardAmounts == null) {
            setAmountsTest(undefined);
        } else {
            const countryAmounts = variant.choiceCardAmounts[country];

            const defaultName = `AMOUNTS_${country}|CONTROL`;
            const selectedAmounts = selectAmountsVariant(countryAmounts, defaultName);

            setAmountsTest(selectedAmounts);

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: selectedAmounts.amounts[defaultFrequency]['amounts'][1],
            });
        }
    };

    const { image, showReminderFields, tickerSettings, showChoiceCards } = variant;

    const defaultFrequency: ContributionFrequency = variant.defaultChoiceCardFrequency || 'MONTHLY';

    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    useEffect(() => determineAmountsTestVariant(countryGroupId), [variant]);

    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen) {
            // For the event stream
            sendEpicViewEvent(tracking.referrerUrl, countryCode, stage);

            // For epic view count
            logEpicView(tracking.abTestName);

            // For ophan
            if (submitComponentEvent) {
                submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
            }
        }
    }, [hasBeenSeen, submitComponentEvent]);

    useEffect(() => {
        if (submitComponentEvent) {
            submitComponentEvent(createInsertEventFromTracking(tracking, tracking.campaignCode));
        }
    }, [submitComponentEvent]);

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

    const ophanTracking: OphanTracking | undefined = submitComponentEvent && {
        submitComponentEvent,
        componentType: 'ACQUISITIONS_EPIC',
    };

    const showAboveArticleCount = !!(
        variant.separateArticleCount?.type === 'above' && hasConsentForArticleCount
    );

    const onCloseReminderClick = () => {
        setIsReminderActive(false);
    };

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
                        aboveArticleCountByTag={false}
                        copy={variant.separateArticleCount?.copy}
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

            {showChoiceCards && choiceCardSelection && (
                <ContributionsEpicChoiceCards
                    amounts={amountsTest}
                    setChoiceCardSelection={setChoiceCardSelection}
                    selection={choiceCardSelection}
                    countryCode={countryCode}
                    submitComponentEvent={submitComponentEvent}
                />
            )}

            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                countryCode={countryCode}
                onOpenReminderClick={(): void => {
                    const buttonCopyAsString = showReminderFields?.reminderCta
                        .toLowerCase()
                        .replace(/\s/g, '-');

                    // This callback lets the platform react to the user interaction with the
                    // 'Remind me' button
                    if (onReminderOpen) {
                        onReminderOpen({
                            buttonCopyAsString,
                        } as OnReminderOpen);
                    }

                    fetchEmailDefined().then(resolvedEmail => {
                        if (resolvedEmail) {
                            setFetchedEmail(resolvedEmail);
                        }
                        setIsReminderActive(true);
                    });
                }}
                submitComponentEvent={submitComponentEvent}
                isReminderActive={isReminderActive}
                isSignedIn={Boolean(fetchedEmail)}
                showChoiceCards={showChoiceCards}
                choiceCardSelection={choiceCardSelection}
                choiceCardTestName={amountsTest && amountsTest.name}
                numArticles={articleCounts.for52Weeks}
            />

            {isReminderActive && showReminderFields && (
                <ContributionsEpicReminder
                    initialEmailAddress={fetchedEmail}
                    reminderFields={showReminderFields}
                    onCloseReminderClick={onCloseReminderClick}
                    submitComponentEvent={submitComponentEvent}
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
