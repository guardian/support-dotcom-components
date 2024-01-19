import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { space } from '@guardian/source-foundations';
import { from } from '@guardian/src-foundations/mq';
import type { ReactComponent } from '../../../types';

const banner = (cssOverrides?: SerializedStyles): SerializedStyles => css`
    ${cssOverrides};
    overflow: hidden;
    width: 100%;
    display: flex;
    justify-content: center;
`;

const container = css`
    width: 100%;
    max-width: 1300px;
    display: flex;
    flex-direction: column;

    ${from.tablet} {
        flex-direction: row-reverse;
    }
`;

const visualContainer = css`
    position: relative;
    ${from.tablet} {
        width: 50%;
    }

    ${from.wide} {
        width: 57%;
    }
`;

// this is used to ensure the content column dictates the size, not the visual
const visualSizer = css`
    ${from.tablet} {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
`;

const contentContainer = css`
    padding: 0 ${space[3]}px;

    ${from.tablet} {
        width: 50%;
        padding: 0 ${space[5]}px;
    }

    ${from.wide} {
        width: 43%;
    }
`;

const headerContainer = css`
    padding-top: ${space[1]}px;

    ${from.tablet} {
        padding-top: ${space[3]}px;
    }

    ${from.desktop} {
        padding-top: ${space[2]}px;
    }
`;

const bodyContainerWithTicker = css`
    display: none;
    ${from.tablet} {
        display: block;
    }
`;

const bodyContainer = (hasTicker: boolean): SerializedStyles => css`
    padding-top: ${space[1]}px;
    ${hasTicker && bodyContainerWithTicker}

    ${from.tablet} {
        padding-top: ${space[2]}px;
    }
`;

const tickerContainer = css`
    padding-top: ${space[1]}px;
    padding-bottom: ${space[1]}px;

    ${from.tablet} {
        padding-top: ${space[6]}px;
    }
`;

const ctaContainer = css`
    padding-top: ${space[3]}px;
    padding-bottom: ${space[5]}px;

    ${from.tablet} {
        padding-top: ${space[5]}px;
        padding-bottom: ${space[4]}px;
    }
`;

const closeButtonContainer = css`
    position: absolute;
    top: ${space[3]}px;
    right: ${space[3]}px;
`;

export interface ContributionsTemplateWithVisualProps {
    visual: React.ReactElement;
    closeButton: React.ReactElement;
    header: React.ReactElement;
    body: React.ReactElement;
    ticker?: React.ReactElement;
    cta: React.ReactElement;
    cssOverrides?: SerializedStyles;
}

const ContributionsTemplateWithVisual: ReactComponent<ContributionsTemplateWithVisualProps> = ({
    visual,
    closeButton,
    header,
    body,
    ticker,
    cta,
    cssOverrides,
}: ContributionsTemplateWithVisualProps) => {
    return (
        <div css={banner(cssOverrides)}>
            <div css={container}>
                <div css={visualContainer}>
                    <div css={visualSizer}>
                        {visual}
                        <div css={closeButtonContainer}>{closeButton}</div>
                    </div>
                </div>
                <div css={contentContainer}>
                    <div css={headerContainer}>{header}</div>
                    {<div css={bodyContainer(!!ticker)}>{body}</div>}
                    {ticker && <div css={tickerContainer}>{ticker}</div>}
                    <div css={ctaContainer}>{cta}</div>
                </div>
            </div>
        </div>
    );
};

export default ContributionsTemplateWithVisual;
