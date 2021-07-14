// --- Imports --- //

import React, { useState } from 'react';
import { body, textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { ButtonLink } from '@guardian/src-link';
import { css } from '@emotion/core';
import { useHasBeenSeen, HasBeenSeen } from '../../../hooks/useHasBeenSeen';
import { OphanComponentEvent } from '../../../types/OphanTypes';
import {
    OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_OPEN,
    OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_CLOSE,
    OPHAN_COMPONENT_ARTICLE_COUNT_STAY_IN,
    OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT,
    OPHAN_COMPONENT_ARTICLE_COUNT_STAY_OUT,
    OPHAN_COMPONENT_ARTICLE_COUNT_OPT_IN,
} from './utils/ophan';
import { from, until } from '@guardian/src-foundations/mq';
import {png1, png2, png3, png4, png5} from './utils/images';

// --- Styles --- //

const topContainer = css`
    display: flex;
    flex-direction: column-reverse;

    ${from.tablet} {
        display: block;
        margin-top: 10px;
    }
`;

const articleCountAboveContainerStyles = css`
    font-style: italic;
    ${body.small({ fontWeight: 'bold' })};

    ${from.tablet} {
        ${body.medium({ fontWeight: 'bold' })};
    }
`;

const optOutContainer = css`
    color: ${palette.opinion[400]};
    position: relative;
`;

const staticNumber = css`
    &:after {
        content: 0;
    }
`;

const animateNumber = (numArticles: number) => {
    return css`
        @property --num {
            syntax: '<integer>';
            initial-value: 0;
            inherits: false;
        }
        transition: --num 5s cubic-bezier(0, 0.5, 0, 1) 1s;
        counter-reset: num var(--num);

        --num: ${numArticles};
        &:after {
            content: counter(num);
        }
    `;
};

const articles = css``;
const article = (index: number) => css`
    position: absolute;

    left: 60%;
    top: 50%;
    opacity: 0;
    filter: blur(0px);
    transform: translate(-50%, -50%) scaleX(0.2) scaleY(0.05) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
    border: 20px solid rgba(0,0,0,1);

    animation: raise${index} 6s ease 1;
    animation-fill-mode: forwards;
    animation-delay: ${4 + index * 0}s;
    z-index: ${20 - index};

    @keyframes raise${index} {
        ${(index * 0.5) + 30}% {
            left: 90%;
            top: 50%;
            opacity: 0.6;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(0.2) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0, 1, 0, 1);
            border-color: rgba(0,0,0,0.2);
        }
        ${(index * 6) + 30}% {
            left: ${(index * 100) + 10}%;
            top: 1500%;
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0.53, 0.04, 0.65, 0.1);
            border-color: rgba(0,0,0,0.2);
        }
        ${(index * 10) + 30}% {
            left: ${(index * 70) + 10}%;
            top: 1300%;
            opacity: 1;
            filter: blur(0px);
            transform: translate(-50%, -50%) scale(1) rotateX(0deg) rotateY(0deg) rotateZ(0deg);
            animation-timing-function: cubic-bezier(0.53, 0.04, 0.65, 0.1);
            border-color: rgba(0,0,0,0.2);
        }
        to {
            left: ${index * 200}%;
            top: -50vh;
            opacity: 0;
            filter: blur(2px);
            transform: translate(-50%, -50%) scale(2) rotateX(180deg) rotateY(90deg) rotateZ(90deg);
            border-color: rgba(0,0,0,0.2);
        }
    }
`;

const articleCountOnHeaderContainerStyles = css`
    display: flex;
    justify-content: space-between;
    flex-direction: column-reverse;
    align-items: flex-start;

    ${from.tablet} {
        flex-direction: row;
        align-items: center;
    }
`;

const articleCountWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: ${space[2]}px;
    margin-bottom: ${space[2]}px;
    justify-content: start;

    ${from.tablet} {
        margin-bottom: 0;
        justify-content: flex-end;
    }
`;

const articleCountTextStyles = css`
    ${textSans.xxsmall()};
    margin-right: ${space[1]}px;

    ${from.tablet} {
        ${textSans.small()};
    }
`;

const articleCountCtaStyles = css`
    ${textSans.xxsmall({ fontWeight: 'bold' })};

    ${from.tablet} {
        ${textSans.small({ fontWeight: 'bold' })};
    }
`;

const articleCountDescriptionTopContainerStyles = css`
    border-bottom: 1px solid ${palette.neutral[46]};
    position: relative;
    margin-bottom: ${space[2]}px;

    ${from.tablet} {
        margin-top: ${space[4]}px;
        border-top: 1px solid ${palette.neutral[0]};
        border-bottom: 1px solid ${palette.neutral[0]};
    }
`;

const articleCountDescriptionContainer = css`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: ${space[1]}px ${space[1]}px 0;

    ${from.tablet} {
        flex-direction: row;
        padding: ${space[1]}px 0;
        align-items: start;
        margin-top: ${space[1]}px;
    }
`;

const articleCountBodyTextStyles = css`
    ${textSans.small()};
    width: 100%;

    ${from.tablet} {
        width: 68%;
    }
`;

const articleCountCtasContainerStyles = css`
    display: flex;
    align-self: start;
    margin-top: ${space[4]}px;
    > * + * {
        margin-left: ${space[3]}px;
    }

    ${from.tablet} {
        flex-direction: column;
        margin-left: auto;
        margin-top: ${space[2]}px;
        justify-content: space-between;
        > * + * {
            margin-top: ${space[3]}px;
            margin-left: 0;
        }
    }
`;

const articleCountOptInCtaStyles = css`
    background-color: ${palette.neutral[0]};
`;

const articleCountDefaultCtaStyles = css`
    background-color: ${palette.neutral[0]};
    padding: auto ${space[6]}px;

    ${from.tablet} {
        padding-left: ${space[5]}px;
    }
`;

const articleCountOptOutCtaStyles = css`
    color: ${palette.neutral[0]};
    border: 1px solid ${palette.neutral[0]};
`;

const trackingSettingsContainerStyles = css`
    margin: ${space[4]}px auto ${space[3]}px;
    ${textSans.xxsmall()};

    ${from.tablet} {
        ${textSans.xsmall()};
    }
`;

const privacySettingsLinkStyles = css`
    ${textSans.xxsmall({ fontWeight: 'bold' })};

    ${from.tablet} {
        ${textSans.xsmall({ fontWeight: 'bold' })};
    }
`;

const caretStyles = css`
    &:before {
        content: '';
        display: block;
        position: absolute;
        bottom: -14px;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-top-color: ${palette.neutral[46]};

        ${from.tablet} {
            right: 5px;
            bottom: 100%;
            border: 10px solid transparent;
            border-bottom-color: ${palette.neutral[0]};
        }

        ${until.tablet} {
            left: 75px;
        }
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        bottom: -12px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: ${palette.neutral[97]};

        ${from.tablet} {
            right: 6px;
            bottom: 100%;
            border: 9px solid transparent;
            border-bottom-color: ${palette.neutral[97]};
        }

        ${until.tablet} {
            left: 76px;
        }
    }
`;

interface ArticleCountWithToggleProps {
    numArticles: number;
    isArticleCountOn: boolean;
    onToggleClick: () => void;
}

export interface ContributionsEpicArticleCountAboveWithOptOutProps {
    numArticles: number;
    isArticleCountOn: boolean;
    onArticleCountOptOut: () => void;
    onArticleCountOptIn: () => void;
    openCmp?: () => void;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
}

// -- Components -- //

const ArticleCountWithToggle: React.FC<ArticleCountWithToggleProps> = ({
    isArticleCountOn,
    numArticles,
    onToggleClick,
}: ArticleCountWithToggleProps) => {
    const debounce = true;
    const [hasBeenSeen, setNode] = useHasBeenSeen(
        {
            rootMargin: '-18px',
            threshold: 0,
        },
        debounce,
    ) as HasBeenSeen;

    if (isArticleCountOn && numArticles >= 5) {
        return (
            <div ref={setNode} css={articleCountOnHeaderContainerStyles}>
                <div css={articleCountAboveContainerStyles}>
                    {numArticles >= 5 && (
                        <>
                            You&apos;ve read{' '}
                            <span css={optOutContainer}>
                                <span css={hasBeenSeen ? animateNumber(numArticles) : staticNumber}>
                                    &nbsp;
                                </span>{' '}
                                articles
                                <span css={articles}>
                                    <img css={article(1)} src={png1} />
                                    <img css={article(2)} src={png2} />
                                    <img css={article(3)} src={png3} />
                                    <img css={article(4)} src={png4} />
                                    <img css={article(5)} src={png5} />
                                </span>
                            </span>{' '}
                            year
                        </>
                    )}
                </div>
                <div css={articleCountWrapperStyles}>
                    <div css={articleCountTextStyles}>Article count</div>
                    <ButtonLink
                        priority="secondary"
                        onClick={onToggleClick}
                        cssOverrides={articleCountCtaStyles}
                    >
                        on
                    </ButtonLink>
                </div>
            </div>
        );
    }

    if (!isArticleCountOn) {
        return (
            <div css={articleCountWrapperStyles}>
                <div css={articleCountTextStyles}>Article count</div>
                <ButtonLink
                    priority="secondary"
                    onClick={onToggleClick}
                    cssOverrides={articleCountCtaStyles}
                >
                    off
                </ButtonLink>
            </div>
        );
    }

    return null;
};

export const ContributionsEpicArticleCountAboveWithOptOut: React.FC<ContributionsEpicArticleCountAboveWithOptOutProps> = ({
    numArticles,
    isArticleCountOn,
    onArticleCountOptOut,
    onArticleCountOptIn,
    openCmp,
    submitComponentEvent,
}: ContributionsEpicArticleCountAboveWithOptOutProps) => {
    const [isOpen, setIsOpen] = useState(false);

    const onToggleClick = () => {
        setIsOpen(!isOpen);
        submitComponentEvent &&
            submitComponentEvent(
                isOpen
                    ? OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_CLOSE
                    : OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT_OPEN,
            );
    };

    const onStayInClick = () => {
        setIsOpen(false);
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_STAY_IN);
    };

    const onOptOutClick = () => {
        setIsOpen(false);
        onArticleCountOptOut();
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_OPT_OUT);
    };

    const onOptInClick = () => {
        setIsOpen(false);
        onArticleCountOptIn();
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_OPT_IN);
    };

    const onStayOutClick = () => {
        setIsOpen(false);
        submitComponentEvent && submitComponentEvent(OPHAN_COMPONENT_ARTICLE_COUNT_STAY_OUT);
    };

    return (
        <div css={topContainer}>
            <ArticleCountWithToggle
                isArticleCountOn={isArticleCountOn}
                numArticles={numArticles}
                onToggleClick={onToggleClick}
            />

            {isOpen && (
                <div css={articleCountDescriptionTopContainerStyles}>
                    <div css={caretStyles}></div>
                    <div css={articleCountDescriptionContainer}>
                        {isArticleCountOn ? (
                            <>
                                <div css={articleCountBodyTextStyles}>
                                    Many readers tell us they enjoy seeing how many pieces of
                                    Guardian journalism they’ve read, watched or listened to. So
                                    here’s your count. Can we continue showing you this on support
                                    appeals like this?
                                </div>
                                <div css={articleCountCtasContainerStyles}>
                                    <Button
                                        priority="primary"
                                        size="xsmall"
                                        cssOverrides={articleCountDefaultCtaStyles}
                                        onClick={onStayInClick}
                                    >
                                        Yes, thats OK
                                    </Button>
                                    <Button
                                        priority="tertiary"
                                        size="xsmall"
                                        cssOverrides={articleCountOptOutCtaStyles}
                                        onClick={onOptOutClick}
                                    >
                                        No, opt me out
                                    </Button>
                                </div>
                            </>
                        ) : (
                            <>
                                <div css={articleCountBodyTextStyles}>
                                    Many readers tell us they enjoy seeing how many pieces of
                                    Guardian journalism they’ve read, watched or listened to. Can we
                                    start showing you your article count on support appeals like
                                    this?
                                </div>
                                <div css={articleCountCtasContainerStyles}>
                                    <Button
                                        priority="primary"
                                        size="xsmall"
                                        cssOverrides={articleCountOptInCtaStyles}
                                        onClick={onOptInClick}
                                    >
                                        Yes, opt me in
                                    </Button>
                                    <Button
                                        priority="tertiary"
                                        size="xsmall"
                                        cssOverrides={articleCountOptOutCtaStyles}
                                        onClick={onStayOutClick}
                                    >
                                        No, thank you
                                    </Button>
                                </div>
                            </>
                        )}
                    </div>
                    <div css={trackingSettingsContainerStyles}>
                        To opt out of other tracking activity, manage your{' '}
                        <ButtonLink
                            priority="secondary"
                            cssOverrides={privacySettingsLinkStyles}
                            onClick={openCmp}
                        >
                            Privacy Settings
                        </ButtonLink>
                    </div>
                </div>
            )}
        </div>
    );
};
