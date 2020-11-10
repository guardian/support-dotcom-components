import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';

const banner = css`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #dddbd1;

    * {
        box-sizing: border-box;
    }
`;

const container = css`
    max-width: 1300px;
    padding: ${space[1]}px ${space[3]}px ${space[5]}px ${space[3]}px;
    display: flex;
    justify-content: space-between;

    ${from.tablet} {
        padding: 0 0 0 0;
    }
`;

const leftColumn = css`
    ${from.tablet} {
        width: calc(50% - 20px);
        padding-top: ${space[2]}px;
        padding-bottom: ${space[4]}px;
        padding-left: ${space[5]}px;
    }
`;

const rightColumn = css`
    display: none;

    ${from.tablet} {
        width: calc(50% - 20px);
        padding-bottom: ${space[4]}px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-left: 1px solid ${neutral[7]};
    }
`;

const headerAndCloseButtonContainer = css`
    display: flex;
    justify-content: space-between;
`;

const closeButtonContainer = css`
    width: 100%;
    display: flex;
    justify-content: end;
    border-bottom: 1px solid ${neutral[7]};
    padding: ${space[4]}px ${space[5]}px ${space[4]}px 0;
`;

const bodyContainer = css`
    padding-top: ${space[1]}px;

    ${from.tablet} {
        padding-top: ${space[2]}px;
    }
`;

const tickerAndCtaContainer = css`
    padding-left: ${space[5]}px;
    padding-right: ${space[5]}px;
`;

const tickerContainer = css`
    padding-top: ${space[1]}px;
`;

const ctaContainer = css`
    padding-top: ${space[4]}px;

    ${from.tablet} {
        padding-top: ${space[9]}px;
    }
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
                <div css={leftColumn}>
                    <div css={headerAndCloseButtonContainer}>
                        {header}
                        <Hide above="tablet">{closeButton}</Hide>
                    </div>
                    <div css={bodyContainer}>{body}</div>
                    <Hide above="tablet">
                        <div css={tickerContainer}>{ticker}</div>
                        <div css={ctaContainer}>{cta}</div>
                    </Hide>
                </div>
                <div css={rightColumn}>
                    <div css={closeButtonContainer}>{closeButton}</div>
                    <div css={tickerAndCtaContainer}>
                        <div css={tickerContainer}>{ticker}</div>
                        <div css={ctaContainer}>{cta}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContributionsTemplate;
