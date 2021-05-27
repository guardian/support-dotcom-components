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
import { from } from '@guardian/src-foundations/mq';

// --- Styles --- //

const topContainer = css`
    display: flex;
    flex-direction: column-reverse;

    ${from.tablet} {
        display: block;
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
    border-top: 1px solid ${palette.neutral[0]};
    border-bottom: 1px solid ${palette.neutral[46]};
    position: relative;
    margin-bottom: ${space[2]}px;

    ${from.tablet} {
        margin-top: ${space[4]}px;
    }
`;

const articleCountDescriptionContainer = css`
    align-items: center;
    display: flex;
    flex-direction: column;
    padding: ${space[1]}px ${space[1]}px 0;

    ${from.tablet} {
        flex-direction: row;
        padding: ${space[3]}px 0;
    }
`;

const articleCountBodyTextStyles = css`
    ${textSans.small()};
    width: 100%;

    ${from.tablet} {
        width: 65%;
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
        justify-content: space-between;
        > * + * {
            margin-top: ${space[2]}px;
            margin-left: 0;
        }
    }
`;

const articleCountOptInCtaStyles = css`
    background-color: ${palette.neutral[0]};
`;

const articleCountDefaultCtaStyles = css`
    background-color: ${palette.neutral[0]};
    padding-left: 20px;
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
        left: 75px;
        bottom: -14px;
        width: 0;
        height: 0;
        border: 7px solid transparent;
        border-top-color: ${palette.neutral[46]};

        ${from.mobileMedium} {
            right: 267px;
        }
        ${from.mobileLandscape} {
            right: 350px;
        }

        ${from.phablet} {
            right: 530px;
        }

        ${from.tablet} {
            left: 596px;
            bottom: 100%;
            border: 10px solid transparent;
            border-bottom-color: ${palette.neutral[0]};
        }
    }

    &:after {
        content: '';
        display: block;
        position: absolute;
        left: 76px;
        bottom: -12px;
        width: 0;
        height: 0;
        border: 6px solid transparent;
        border-top-color: ${palette.neutral[97]};

        ${from.mobileMedium} {
            right: 268px;
        }

        ${from.mobileLandscape} {
            right: 351px;
        }

        ${from.phablet} {
            right: 531px;
        }

        ${from.tablet} {
            left: 597px;
            bottom: 100%;
            border: 9px solid transparent;
            border-bottom-color: ${palette.neutral[97]};
        }
    }
`;

interface ContributionsEpicArticleCountAboveProps {
    numArticles: number;
}

export interface ContributionsEpicArticleCountOptOutProps {
    numArticles: number;
    isArticleCountOn: boolean;
    onArticleCountOptOut: () => void;
    onArticleCountOptIn: () => void;
    openCmp?: () => void;
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void;
}

// -- Components -- //

export const ContributionsEpicArticleCountAbove: React.FC<ContributionsEpicArticleCountAboveProps> = ({
    numArticles,
}: ContributionsEpicArticleCountAboveProps) => {
    return (
        <div css={articleCountAboveContainerStyles}>
            You&apos;ve read <span css={optOutContainer}>{numArticles} articles</span> in the last
            year
        </div>
    );
};

export const ContributionsEpicArticleCountOptOut: React.FC<ContributionsEpicArticleCountOptOutProps> = ({
    numArticles,
    isArticleCountOn,
    onArticleCountOptOut,
    onArticleCountOptIn,
    openCmp,
    submitComponentEvent,
}: ContributionsEpicArticleCountOptOutProps) => {
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
            {isArticleCountOn ? (
                <div css={articleCountOnHeaderContainerStyles}>
                    <ContributionsEpicArticleCountAbove numArticles={numArticles} />
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
            ) : (
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
            )}
            {isOpen && (
                <div css={articleCountDescriptionTopContainerStyles}>
                    <div css={caretStyles}></div>
                    <div css={articleCountDescriptionContainer}>
                        {isArticleCountOn ? (
                            <>
                                <div css={articleCountBodyTextStyles}>
                                    We are counting the number of Guardian articles you&apos;ve read
                                    on this browser. Can we continue showing your article count?
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
                                    We are no longer counting the number of Guardian articles
                                    you&apos;ve read on this browser. Can we start showing your
                                    article count?
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
