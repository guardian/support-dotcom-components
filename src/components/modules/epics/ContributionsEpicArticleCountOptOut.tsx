// --- Imports --- //

import React, { useState } from 'react';
import { body, textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { Link, ButtonLink } from '@guardian/src-link';
import { css } from '@emotion/core';

// --- Styles --- //

const containerStyles = css`
    ${body.medium({ fontWeight: 'bold' })};
    font-style: italic;
`;

const optOutContainer = css`
    color: ${palette.opinion[400]};
`;

const headerContainerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const articleCountTextStyles = css`
    ${textSans.small()};
    margin-right: ${space[1]}px;
`;

const articleCountWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-right: ${space[2]}px;
`;

const articleCountCtaStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
`;

const articleCountDescriptionTopContainer = css`
    border-top: 1px solid #000000;
    border-bottom: 1px solid #000000;
    margin-top: ${space[2]}px;
`;

const articleCountDescriptionContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: ${space[2]}px 0;
`;

const articleCountBodyTextStyles = css`
    ${textSans.medium()};
    width: 60%;
`;

const articleCountOptCtasContainer = css`
    display: flex;
    flex-direction: column;
    margin-left: auto;
    justify-content: space-between;
    height: 60px;
`;

const articleCountOptInCtaStyles = css`
    background-color: #000000;
    padding-left: ${space[5]}px;
`;

const articleCountOptOutCtaStyles = css`
    color: #000000;
    border: 1px solid #000000;
`;

const trackingSettingsContainerStyles = css`
    ${textSans.small()};
    margin: ${space[1]}px;
`;

const privacySettingsLinkStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
`;

const styles1 = css`
    width: 10px;
    position: absolute;
    right: 15px;
    top: -12px;
`;
const styles2 = css`
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 11px solid black;
`;
const styles3 = css`
    margin-top: -10px;
    border-left: 12px solid transparent;
    border-right: 12px solid transparent;
    border-bottom: 11px solid white;
    right: 0;
`;

const articleCountOffWarningStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    color: ${palette.news[400]};
    margin-left: ${space[1]}px;
`;

// --- Types --- //

interface Props {
    numArticles: number;
}

export interface ContributionsEpicArticleCountOptOutProps {
    numArticles: number;
    isArticleCountOn: boolean;
}

// -- Components -- //

export const ContributionsEpicArticleCountAbove: React.FC<Props> = ({ numArticles }: Props) => {
    return (
        <div css={containerStyles}>
            You&apos;ve read <span css={optOutContainer}>{numArticles} articles</span> in the last
            year
        </div>
    );
};

export const ContributionsEpicArticleCountOptOut: React.FC<ContributionsEpicArticleCountOptOutProps> = ({
    numArticles,
    isArticleCountOn,
}: ContributionsEpicArticleCountOptOutProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggleButton = () => setIsOpen(!isOpen);

    return (
        <>
            {isArticleCountOn ? (
                <div css={headerContainerStyles}>
                    <ContributionsEpicArticleCountAbove numArticles={numArticles} />
                    <div css={articleCountWrapperStyles}>
                        <div css={articleCountTextStyles}>Article count</div>
                        <ButtonLink
                            priority="secondary"
                            onClick={toggleButton}
                            cssOverrides={articleCountCtaStyles}
                        >
                            on
                        </ButtonLink>
                    </div>
                </div>
            ) : (
                <div css={articleCountWrapperStyles}>
                    <div css={articleCountTextStyles}>Article count</div>
                    <Link priority="secondary" href="/" cssOverrides={articleCountCtaStyles}>
                        off
                    </Link>
                    <div css={articleCountOffWarningStyles}>!</div>
                </div>
            )}
            {isOpen && (
                <div css={articleCountDescriptionTopContainer}>
                    <div css={styles1}>
                        <div css={styles2}></div>
                        <div css={styles3}></div>
                    </div>
                    {isArticleCountOn ? (
                        <div css={articleCountDescriptionContainer}>
                            <div css={articleCountBodyTextStyles}>
                                We are counting the number of Guardian articles you&apos;ve read on
                                this device. Can we continue showing you your article count?
                            </div>
                            <div css={articleCountOptCtasContainer}>
                                <Button
                                    priority="primary"
                                    size="xsmall"
                                    cssOverrides={articleCountOptInCtaStyles}
                                >
                                    Yes, thats OK
                                </Button>
                                <Button
                                    priority="tertiary"
                                    size="xsmall"
                                    cssOverrides={articleCountOptOutCtaStyles}
                                >
                                    No, opt me out
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div css={articleCountDescriptionContainer}>
                                <div css={articleCountBodyTextStyles}>
                                    We are no longer counting the number of Guardian articles
                                    you&apos;ve read on this device. Can we start showing your
                                    article count?
                                </div>
                                <div css={articleCountOptCtasContainer}>
                                    <Button
                                        priority="primary"
                                        size="xsmall"
                                        cssOverrides={articleCountOptInCtaStyles}
                                    >
                                        Yes, opt me in
                                    </Button>
                                    <Button
                                        priority="tertiary"
                                        size="xsmall"
                                        cssOverrides={articleCountOptOutCtaStyles}
                                    >
                                        No, thank you
                                    </Button>
                                </div>
                            </div>
                        </>
                    )}
                    <div css={trackingSettingsContainerStyles}>
                        To opt out of other tracking activity, manage your{' '}
                        <Link priority="secondary" cssOverrides={privacySettingsLinkStyles}>
                            Privacy Settings
                        </Link>
                    </div>
                </div>
            )}
        </>
    );
};
