import React, { useEffect, useState } from 'react';
// import { css, SerializedStyles } from '@emotion/react';
import { css } from '@emotion/react';
import { body, headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import { neutral, brandAlt } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
// import { LinkButton } from '@guardian/src-button';
import {
    replaceNonArticleCountPlaceholders,
    containsNonArticleCountPlaceholder,
    createViewEventFromTracking,
    createInsertEventFromTracking,
    // isSupportUrl,
} from '@sdc/shared/lib';
import { EpicVariant, Tracking } from '@sdc/shared/types';
import { replaceArticleCount } from '../../lib/replaceArticleCount';
// import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/lib';
import { ArticleCounts } from '@sdc/shared/types';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { OphanComponentEvent } from '@sdc/shared/dist/types';
import { logEpicView } from '@sdc/shared/lib';

import { ContributionsEpicReminder } from './ContributionsEpicReminder';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { defineFetchEmail } from '../shared/helpers/definedFetchEmail';

const container = (clientName: string) => css`
    padding: 6px 10px 28px 10px;
    border-top: 1px solid ${brandAlt[400]};
    border-bottom: 1px solid ${neutral[86]};
    background: ${neutral[100]};

    border: 1px solid ${neutral[0]};

    * {
        ::selection {
            background: ${palette.brandAlt[400]};
        }
    }

    & > * + * {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        padding-left: ${clientName === 'dcr' ? '60px' : '80px'};
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

    & > p + p {
        margin-top: ${space[3]}px;
    }

    ${from.tablet} {
        & > p + p {
            margin-top: ${space[4]}px;
        }
    }
`;

// const paymentMethods = css`
//     height: 28px;
// `;

// const cta: SerializedStyles = css`
//     color: ${neutral[7]};
//     background-color: ${brandAlt[400]};

//     &:hover {
//         background-color: ${brandAlt[300]};
//     }
// `;

// const ctaContainer: SerializedStyles = css`
//     display: flex;
//     flex-wrap: wrap;
//     align-items: center;
//     *:first-child {
//         margin-right: 25px;
//     }

//     > * {
//         margin-top: 6px;
//         margin-bottom: 6px;
//     }
// `;

const yellowHeading = (clientName: string) => css`
    ${headline.medium({ fontWeight: 'bold' })};
    font-size: 28px;
    background-color: ${brandAlt[400]};
    border-top: 1px solid ${neutral[0]};
    border-left: 1px solid ${neutral[0]};
    border-right: 1px solid ${neutral[0]};

    padding: 8px 10px 12px 10px;
    ${from.tablet} {
        padding-left: ${clientName === 'dcr' ? '60px' : '80px'};
        padding-right: 20px;
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

// const DEFAULT_CTA_TEXT = 'Make a contribution';
// const DEFAULT_CTA_BASE_URL = 'https://support.theguardian.com/uk/contribute';

// interface LiveblogEpicCtaProps {
//     text?: string;
//     baseUrl?: string;
//     countryCode?: string;
//     numArticles?: number;
//     tracking: Tracking;
// }

// const LiveblogEpicCta: React.FC<LiveblogEpicCtaProps> = ({
//     text,
//     baseUrl,
//     tracking,
//     numArticles,
//     countryCode,
// }: LiveblogEpicCtaProps) => {
//     const url = addRegionIdAndTrackingParamsToSupportUrl(
//         baseUrl || DEFAULT_CTA_BASE_URL,
//         tracking,
//         numArticles,
//         countryCode,
//     );
//     const hasSupportCta = !!baseUrl && isSupportUrl(baseUrl);

//     return (
//         <div css={ctaContainer}>
//             <LinkButton css={cta} priority="primary" href={url} data-ignore="global-link-styling">
//                 {text || DEFAULT_CTA_TEXT}
//             </LinkButton>
//             {hasSupportCta && (
//                 <img
//                     src="https://uploads.guim.co.uk/2021/02/04/liveblog-epic-cards.png"
//                     alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
//                     css={paymentMethods}
//                 />
//             )}
//         </div>
//     );
// };

interface OnReminderOpen {
    buttonCopyAsString: string;
}

interface LiveblogEpicProps {
    variant: EpicVariant;
    tracking: Tracking;
    countryCode?: string;
    articleCounts: ArticleCounts;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;

    // eslint-disable-next-line @typescript-eslint/ban-types
    onReminderOpen?: Function;
    email?: string;
    fetchEmail?: () => Promise<string | null>;
}

export const ContributionsLiveblogEpic: React.FC<LiveblogEpicProps> = ({
    variant,
    countryCode,
    articleCounts,
    tracking,
    submitComponentEvent,
    
    onReminderOpen,
    email,
    fetchEmail,
}: LiveblogEpicProps): JSX.Element | null => {
    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen) {
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

    const cleanParagraphs = variant.paragraphs.map(paragraph =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );
    const cleanHeading =
        replaceNonArticleCountPlaceholders(variant.heading) || 'Support the Guardian';

    if (
        cleanParagraphs.some(containsNonArticleCountPlaceholder) ||
        containsNonArticleCountPlaceholder(cleanHeading)
    ) {
        return null;
    }

    const [fetchedEmail, setFetchedEmail] = useState<string | undefined>(undefined);
    const fetchEmailDefined = defineFetchEmail(email, fetchEmail);
    const [isReminderActive, setIsReminderActive] = useState(false);
    const showReminderFields = variant.showReminderFields;
    const onCloseReminderClick = () => {
        setIsReminderActive(false);
    };

    // return (
    //     <div data-cy="contributions-liveblog-epic" ref={setNode}>
    //         {cleanHeading && <div css={yellowHeading(tracking.clientName)}>{cleanHeading}</div>}
    //         <section css={container(tracking.clientName)}>
    //             <LiveblogEpicBody
    //                 paragraphs={cleanParagraphs}
    //                 numArticles={articleCounts.forTargetedWeeks}
    //             />
    //             <LiveblogEpicCta
    //                 text={variant.cta?.text}
    //                 baseUrl={variant.cta?.baseUrl}
    //                 tracking={tracking}
    //             />
    //         </section>
    //     </div>
    // );

    return (
        <div data-cy="contributions-liveblog-epic" ref={setNode}>
            {cleanHeading && <div css={yellowHeading(tracking.clientName)}>{cleanHeading}</div>}
            <section css={container(tracking.clientName)}>
                <LiveblogEpicBody
                    paragraphs={cleanParagraphs}
                    numArticles={articleCounts.forTargetedWeeks}
                />
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
                    showChoiceCards={false}
                    choiceCardSelection={undefined}
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
        </div>
    );
};
