// --- Imports --- //

import React from 'react';
import { body, textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
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
    margin-right: ${space[4]}px;
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
    margin-right: ${space[2]}px;
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

// --- Types --- //

interface Props {
    numArticles: number;
}

export interface ContributionsEpicArticleCountOptOutProps {
    numArticles: number;
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
}: ContributionsEpicArticleCountOptOutProps) => {
    return (
        <>
            <div css={headerContainerStyles}>
                <div>
                    <ContributionsEpicArticleCountAbove numArticles={numArticles} />
                </div>
                <div css={articleCountWrapperStyles}>
                    <div css={articleCountTextStyles}>Article count</div>

                    <Link priority="secondary" href="/" cssOverrides={articleCountCtaStyles}>
                        on
                    </Link>
                </div>
            </div>
            <div css={articleCountDescriptionTopContainer}>
                <div css={articleCountDescriptionContainer}>
                    <div css={articleCountBodyTextStyles}>
                        We are counting the number of Guardian articles you&apos;ve read on this
                        device. Can we continue showing you your article count?
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
                <div css={trackingSettingsContainerStyles}>
                    To opt out of other tracking activity, manage your{' '}
                    <Link priority="secondary" cssOverrides={privacySettingsLinkStyles}>
                        Privacy Settings
                    </Link>
                </div>
            </div>
        </>
    );
};
