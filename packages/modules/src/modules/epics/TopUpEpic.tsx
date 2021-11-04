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
import { EpicProps, epicPropsSchema, Stage } from '@sdc/shared/types';
import { replaceArticleCount } from '../../lib/replaceArticleCount';
import { OphanTracking } from '../shared/ArticleCountOptOutPopup';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { isProd } from '../shared/helpers/stage';
import { withParsedProps } from '../shared/ModuleWrapper';
import { logEpicView } from './utils/epicViewLog';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { ContributionsEpicChoiceCards } from './ContributionsEpicChoiceCards';
import {ChoiceCard, ChoiceCardGroup} from "@guardian/src-choice-card";
import {Button} from "./Button";
import { Checkbox, CheckboxGroup } from '@guardian/src-checkbox';
import {ContributionsBannerCloseButton} from "../banners/contributions/ContributionsBannerCloseButton";

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

const checkboxContainer = css`
    margin-top: ${space[4]}px;

	${from.desktop} {
		margin-top: ${space[5]}px;
	}
`;

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

interface EpicHeaderProps {
    text: string;
    numArticles: number;
    tracking?: OphanTracking;
}

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
    submitComponentEvent,
    stage,
}: EpicProps) => {
    console.log('HERE');
    const { backgroundImageUrl } = variant;

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

    const [hasConsented, setHasConsented] = useState(false);

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
        <section ref={setNode} css={wrapperStyles}>
            <h2 css={headingStyles}>Thank you for your recurring support</h2>

            <p css={bodyStyles}>Would you like to add a one off top up to your next payment?</p>

            <ChoiceCardGroup name="contribution-amount">
                <ChoiceCard
                    value="first"
                    label={'20p'}
                    id="first"
                    checked={true}
                    onChange={() =>
                        undefined
                    }
                />
                <ChoiceCard
                    value="second"
                    label={'50p'}
                    id="second"
                    checked={false}
                    onChange={() =>
                        undefined
                    }
                />
                <ChoiceCard
                    value="third"
                    label="£1"
                    id="third"
                    checked={false}
                    onChange={() => undefined}
                />
            </ChoiceCardGroup>

            <Button
                css={css`
                    margin: ${space[3]}px;
                `}
                showArrow={false}
                onClickAction={''}
                priority={'primary'}
            >
                Add 20p to my next payment
            </Button>

            <Button
                css={css`
                    margin: ${space[3]}px;
                `}
                showArrow
                onClickAction={''}
                priority={'secondary'}
            >
                Manage my Top ups
            </Button>

        </section>
    );
};
