// --- Imports --- //

import React from 'react';
import { textSans } from '@guardian/src-foundations/typography';
import { palette, space } from '@guardian/src-foundations';
import { Button } from '@guardian/src-button';
import { Link } from '@guardian/src-link';
import { css } from '@emotion/core';

// --- Styles --- //

const headerContainerStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
`;

const articleCountTextStyles = css`
    ${textSans.small()};
`;

const articleCountOffWarningStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    color: ${palette.news[400]};
    margin-left: ${space[1]}px;
`;

const articleCountWrapperStyles = css`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const articleCountCtaStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
    margin-left: ${space[1]}px;
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
    padding: 0 ${space[4]}px;
`;

const articleCountOptOutCtaStyles = css`
    color: #000000;
    border: 1px solid #000000;
    padding: 0 12px 0 16px;
`;

const trackingSettingsContainerStyles = css`
    ${textSans.small()};
    margin: ${space[1]}px;
`;

const privacySettingsLinkStyles = css`
    ${textSans.small({ fontWeight: 'bold' })};
`;

// --- Types --- //

export interface ContributionsEpicArticleCountOptInProps {
    numArticles: number;
}

// -- Components -- //

export const ContributionsEpicArticleCountOptIn: React.FC<ContributionsEpicArticleCountOptInProps> = () => {
    return (
        <>
            <div css={headerContainerStyles}>
                <div css={articleCountWrapperStyles}>
                    <div css={articleCountTextStyles}>Article count</div>

                    <Link priority="secondary" href="/" cssOverrides={articleCountCtaStyles}>
                        off
                    </Link>
                    <div css={articleCountOffWarningStyles}>!</div>
                </div>
            </div>
            <div css={articleCountDescriptionTopContainer}>
                <div css={articleCountDescriptionContainer}>
                    <div css={articleCountBodyTextStyles}>
                        We are no longer counting the number of Guardian articles you&apos;ve read
                        on this device. Can we start showing your article count?
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
