import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { from } from '@guardian/source-foundations';
import { neutral } from '@guardian/source-foundations';
import { Hide } from '@guardian/src-layout';
import type { ReactComponent } from '../../../types';

const banner = (backgroundColour: string): SerializedStyles => css`
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: ${backgroundColour};

    * {
        box-sizing: border-box;
    }
`;

const container = css`
    position: relative;
    max-width: 1300px;
    display: flex;
    justify-content: space-between;

    ${from.tablet} {
        padding: 0 0 0 0;
    }
`;

const leftColumn = css`
    ${from.tablet} {
        width: calc(50% - 10px);
        padding-top: ${space[2]}px;
        padding-bottom: ${space[4]}px;
        padding-left: ${space[5]}px;
    }

    ${from.wide} {
        width: calc(43% - 10px);
    }
`;

const rightColumn = css`
    display: none;

    ${from.tablet} {
        width: calc(50% - 10px);
        padding-bottom: ${space[4]}px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        border-left: 1px solid ${neutral[7]};
    }

    ${from.wide} {
        width: calc(57% - 10px);
    }
`;

const headerContainer = css`
    width: calc(100% - 40px);

    ${from.tablet} {
        width: 100%;
    }
`;

const closeButtonContainerMobile = css`
    position: absolute;
    top: ${space[3]}px;
    right: ${space[3]}px;
`;

const rightTopContainer = css`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1px solid ${neutral[7]};
    padding: ${space[4]}px ${space[5]}px;
`;

const bodyContainer = css`
    padding-top: ${space[1]}px;

    ${from.mobileLandscape} {
        width: calc(100% - 40px);
    }

    ${from.tablet} {
        padding-top: ${space[2]}px;
        width: 100%;
    }
`;

const leftTopContainer = css`
    padding: ${space[1]}px ${space[3]}px ${space[3]}px ${space[3]}px;

    ${from.tablet} {
        padding: 0;
    }
`;

const leftBottomContainer = css`
    border-top: 1px solid ${neutral[46]};
    padding: ${space[1]}px ${space[3]}px ${space[5]}px ${space[3]}px;
`;

const supportingTextContainer = css`
    padding-top: ${space[1]}px;
`;

const rightBottomContainer = css`
    padding-left: ${space[5]}px;
    padding-right: ${space[5]}px;
`;

const tickerContainer = css`
    padding-top: ${space[1]}px;
    max-width: 560px;

    ${from.tablet} {
        padding-top: 0;
    }
`;

const ctaContainer = css`
    padding-top: ${space[4]}px;

    ${from.tablet} {
        padding-top: ${space[9]}px;
    }
`;

const line = css`
    position: absolute;
    display: none;
    top: 68px;
    left: calc(50% + 650px);
    right: 0;
    border-bottom: 1px solid ${neutral[7]};

    ${from.wide} {
        display: block;
    }
`;

export interface ContributionsTemplateProps {
    closeButton: React.ReactElement;
    header: React.ReactElement;
    body: React.ReactElement;
    supportingText: React.ReactElement;
    ticker?: React.ReactElement;
    cta: React.ReactElement;
    backgroundColour: string;
}

const ContributionsTemplate: ReactComponent<ContributionsTemplateProps> = ({
    closeButton,
    header,
    body,
    supportingText,
    ticker,
    cta,
    backgroundColour,
}: ContributionsTemplateProps) => {
    return (
        <div css={banner(backgroundColour)}>
            <div css={container}>
                <div css={closeButtonContainerMobile}>
                    <Hide above="tablet">{closeButton}</Hide>
                </div>
                <div css={leftColumn}>
                    <div css={leftTopContainer}>
                        <div css={headerContainer}>{header}</div>
                        <div css={bodyContainer}>{body}</div>
                    </div>
                    <Hide above="tablet">
                        <div css={leftBottomContainer}>
                            <div css={supportingTextContainer}>{supportingText}</div>
                            <div css={tickerContainer}>{ticker}</div>
                            <div css={ctaContainer}>{cta}</div>
                        </div>
                    </Hide>
                </div>
                <div css={rightColumn}>
                    <div css={rightTopContainer}>
                        {supportingText}
                        {closeButton}
                    </div>
                    <div css={rightBottomContainer}>
                        <div css={tickerContainer}>{ticker}</div>
                        <div css={ctaContainer}>{cta}</div>
                    </div>
                </div>
            </div>
            <div css={line}></div>
        </div>
    );
};

export default ContributionsTemplate;
