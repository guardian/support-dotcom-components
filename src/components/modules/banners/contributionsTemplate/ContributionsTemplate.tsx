import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';

const banner = css`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #dddbd1;
`;

const container = css`
    max-width: 1300px;
    padding: ${space[1]}px ${space[3]}px ${space[5]}px ${space[3]}px;
`;

const headerAndCloseButtonContainer = css`
    display: flex;
    justify-content: space-between;
`;

const closeButtonContainer = css``;

const bodyContainer = css`
    padding-top: ${space[1]}px;
`;

const tickerContainer = css`
    padding-top: ${space[1]}px;
`;

const ctaContainer = css`
    padding-top: ${space[4]}px;
`;

export interface ContributionsTemplateProps {
    closeButton: React.ReactElement;
    header: React.ReactElement;
    body: React.ReactElement;
    ticker?: React.ReactElement;
    cta: React.ReactElement;
}

const ContributionsTemplate: React.FC<ContributionsTemplateProps> = ({
    closeButton,
    header,
    body,
    ticker,
    cta,
}: ContributionsTemplateProps) => {
    return (
        <div css={banner}>
            <div css={container}>
                <div css={headerAndCloseButtonContainer}>
                    {header}
                    <div css={closeButtonContainer}>{closeButton}</div>
                </div>
                <div css={bodyContainer}>{body}</div>
                <div css={tickerContainer}>{ticker}</div>
                <div css={ctaContainer}>{cta}</div>
            </div>
        </div>
    );
};

export default ContributionsTemplate;
