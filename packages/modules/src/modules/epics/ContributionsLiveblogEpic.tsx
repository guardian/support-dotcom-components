import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { body, headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import { palette } from '@guardian/src-foundations';
import { neutral, brandAlt } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import {
    replaceNonArticleCountPlaceholders,
    containsNonArticleCountPlaceholder,
    createViewEventFromTracking,
    createInsertEventFromTracking,
} from '@sdc/shared/lib';
import { EpicProps } from '@sdc/shared/types';
import { replaceArticleCount } from '../../lib/replaceArticleCount';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { logEpicView } from '@sdc/shared/lib';
import { ContributionsEpicCtas } from './ContributionsEpicCtas';
import type { ReactComponent } from '../../types';

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

const LiveblogEpicBodyParagraph: ReactComponent<LiveblogEpicBodyParagraphProps> = ({
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

const LiveblogEpicBody: ReactComponent<LiveblogEpicBodyProps> = ({
    numArticles,
    paragraphs,
}: LiveblogEpicBodyProps) => {
    return (
        <div css={textContainer}>
            {paragraphs.map((paragraph) => (
                <LiveblogEpicBodyParagraph
                    key={paragraph}
                    paragraph={paragraph}
                    numArticles={numArticles}
                />
            ))}
        </div>
    );
};

export const ContributionsLiveblogEpic: ReactComponent<EpicProps> = ({
    variant,
    countryCode,
    articleCounts,
    tracking,
    submitComponentEvent,
    onReminderOpen,
    fetchEmail,
}: EpicProps): JSX.Element => {
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

    const cleanParagraphs = variant.paragraphs.map((paragraph) =>
        replaceNonArticleCountPlaceholders(paragraph, countryCode),
    );
    const cleanHeading =
        replaceNonArticleCountPlaceholders(variant.heading) || 'Support the Guardian';

    if (
        cleanParagraphs.some(containsNonArticleCountPlaceholder) ||
        containsNonArticleCountPlaceholder(cleanHeading)
    ) {
        return <></>;
    }

    return (
        <div data-testid="contributions-liveblog-epic" ref={setNode}>
            {cleanHeading && <div css={yellowHeading(tracking.clientName)}>{cleanHeading}</div>}
            <section css={container(tracking.clientName)}>
                <LiveblogEpicBody
                    paragraphs={cleanParagraphs}
                    numArticles={articleCounts.forTargetedWeeks}
                />

                <ContributionsEpicCtas
                    variant={variant}
                    tracking={tracking}
                    countryCode={countryCode}
                    articleCounts={articleCounts}
                    onReminderOpen={onReminderOpen}
                    fetchEmail={fetchEmail}
                    submitComponentEvent={submitComponentEvent}
                />
            </section>
        </div>
    );
};
