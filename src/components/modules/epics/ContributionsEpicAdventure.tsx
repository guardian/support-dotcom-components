import React, { useState } from 'react';
import { EpicProps } from './ContributionsEpic';
import { css } from '@emotion/core';
import { palette, space } from '@guardian/src-foundations';
import { replaceNonArticleCountPlaceholders } from '../../../lib/placeholders';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { Button } from '@guardian/src-button';
import { body } from '@guardian/src-foundations/typography';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';

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

const bodyStyles = css`
    margin: 0 auto ${space[2]}px;
    ${body.medium()};
`;

const optionsContainer = css`
    * + * {
        margin-left: 10px;
    }
`;

const highlightContainer = css`
    margin-top: 10px;
    padding-top: 20px;
    border-top: 1px solid ${palette.neutral[86]};
`;
const highlightWrapperStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
`;

const highlightStyles = css`
    padding: 2px;
    background-color: ${palette.brandAlt[400]};
`;

interface AdventureOption {
    targetName: string;
    text: string;
}
interface AdventureStateInfo {
    numArticles: number;
    countryCode?: string;
}
interface AdventureState {
    name: string;
    paragraphs: (info: AdventureStateInfo) => (string | Array<JSX.Element>)[];
    options: AdventureOption[];
}
type Adventure = { [name: string]: AdventureState };

const build = (states: AdventureState[]): Adventure =>
    states.reduce<Adventure>((acc, state) => {
        acc[state.name] = state;
        return acc;
    }, {});

const adventure: Adventure = build([
    {
        name: 'start',
        paragraphs: () => [
            `Would you be surprised to hear that you're one of our top readers globally?`,
        ],
        options: [
            {
                targetName: 'article-count',
                text: 'Yes!',
            },
            {
                targetName: 'article-count',
                text: 'No',
            },
        ],
    },
    {
        name: 'article-count',
        paragraphs: info => [
            replaceArticleCount(
                `Well - you've read %%ARTICLE_COUNT%% articles in the last year! And you’re not alone; through these turbulent and challenging times, millions rely on the Guardian for independent journalism that stands for truth and integrity.`,
                info.numArticles,
                'epic',
            ),
            'Would you like to know how readers are supporting the Guardian?',
        ],
        options: [
            {
                targetName: 'supporters',
                text: 'Yes',
            },
            {
                targetName: 'no',
                text: 'No',
            },
        ],
    },
    {
        name: 'supporters',
        paragraphs: info => [
            `Our readers chose to support us financially more than 1.5 million times in 2020, joining existing supporters in 180 countries${replaceNonArticleCountPlaceholders(
                ' - including %%COUNTRY_NAME%%',
                info.countryCode,
            )}.`,
        ],
        options: [
            {
                targetName: 'why',
                text: 'Why should I support the Guardian?',
            },
        ],
    },
    {
        name: 'why',
        paragraphs: () => [
            'With your help, we will continue to provide high-impact reporting that can counter misinformation and offer an authoritative, trustworthy source of news for everyone. With no shareholders or billionaire owner, we set our own agenda and provide truth-seeking journalism that’s free from commercial and political influence. When it’s never mattered more, we can investigate and challenge without fear or favour.',
        ],
        options: [
            {
                targetName: 'yes',
                text: 'Count me in!',
            },
            {
                targetName: 'no',
                text: `I'll pass`,
            },
        ],
    },
    {
        name: 'no',
        paragraphs: () => [
            `That's ok. Unlike many others, we have maintained our choice: to keep Guardian journalism open for all readers, regardless of where they live or what they can afford to pay. We do this because we believe in information equality, where everyone deserves to read accurate news and thoughtful analysis. Greater numbers of people are staying well-informed on world events, and being inspired to take meaningful action.`,
        ],
        options: [],
    },
    {
        name: 'yes',
        paragraphs: () => [
            'Great! If there were ever a time to join us, it is now. You can power Guardian journalism and help sustain our future.',
        ],
        options: [],
    },
]);

export const ContributionsEpic: React.FC<EpicProps> = ({
    variant,
    tracking,
    countryCode,
    numArticles,
    email,
    submitComponentEvent,
}: EpicProps) => {
    const [currentState, setCurrentState] = useState<AdventureState | undefined>(
        adventure['start'],
    );
    const stateInfo = {
        numArticles,
        countryCode,
    };

    const cleanHighlighted = replaceNonArticleCountPlaceholders(
        variant.highlightedText,
        countryCode,
    );

    return (
        <section css={wrapperStyles}>
            {currentState && (
                <div>
                    {currentState.paragraphs(stateInfo).map((para, idx) => (
                        <p css={bodyStyles} key={`para-${idx}`}>
                            {para}
                        </p>
                    ))}
                    <div css={optionsContainer}>
                        {currentState.options.map(option => (
                            <Button
                                key={`option-${option.targetName}`}
                                priority="secondary"
                                onClick={() => setCurrentState(adventure[option.targetName])}
                            >
                                {option.text}
                            </Button>
                        ))}
                    </div>
                </div>
            )}
            {cleanHighlighted && (
                <div css={highlightContainer}>
                    <strong css={highlightWrapperStyles}>
                        <span css={highlightStyles}>
                            {replaceArticleCount(cleanHighlighted, numArticles, 'epic')}
                        </span>
                    </strong>
                </div>
            )}
            <ContributionsEpicButtons
                variant={variant}
                tracking={tracking}
                countryCode={countryCode}
                onOpenReminderClick={(): void => {
                    console.log('TODO');
                }}
                submitComponentEvent={submitComponentEvent}
                isReminderActive={false}
                isSignedIn={Boolean(email)}
            />
        </section>
    );
};
