// --- Imports --- //

import React, { useState } from 'react';
import { body, textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { ButtonLink } from '@guardian/src-link';
import { css } from '@emotion/core';
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
    if (isArticleCountOn && numArticles >= 5) {
        return (
            <div css={articleCountOnHeaderContainerStyles}>
                <div css={articleCountAboveContainerStyles}>
                    {numArticles >= 5 && (
                        <>
                            You&apos;ve read{' '}
                            <span css={optOutContainer}>{numArticles} articles</span> in the last
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
