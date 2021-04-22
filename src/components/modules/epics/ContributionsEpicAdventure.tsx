import React, { useState } from 'react';
import { EpicProps } from './ContributionsEpic';
import { css } from '@emotion/core';
import { palette, space } from '@guardian/src-foundations';
import { replaceNonArticleCountPlaceholders } from '../../../lib/placeholders';
import { ContributionsEpicButtons } from './ContributionsEpicButtons';
import { Button } from '@guardian/src-button';
import { body } from '@guardian/src-foundations/typography';
import { replaceArticleCount } from '../../../lib/replaceArticleCount';
import { AdventureState } from '../../../lib/adventure';

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

export const ContributionsEpic: React.FC<EpicProps> = ({
    variant,
    tracking,
    countryCode,
    numArticles,
    email,
    submitComponentEvent,
}: EpicProps) => {
    const { adventure } = variant;
    const [currentState, setCurrentState] = useState<AdventureState | undefined>(
        adventure ? adventure['start'] : undefined,
    );
    const stateInfo = {
        numArticles,
        countryCode,
    };

    if (adventure) {
        const cleanHighlighted = replaceNonArticleCountPlaceholders(
            variant.highlightedText,
            countryCode,
        );

        return (
            <section css={wrapperStyles}>
                {currentState && (
                    <div>
                        {currentState.paragraphs(stateInfo).map((para, idx) => (
                            <div css={bodyStyles} key={`${currentState.name}-para-${idx}`}>
                                {para}
                            </div>
                        ))}
                        <div css={optionsContainer}>
                            {currentState.options.map((option, idx) => (
                                <Button
                                    key={`${currentState.name}-option-${idx}`}
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
    }

    return null;
};
