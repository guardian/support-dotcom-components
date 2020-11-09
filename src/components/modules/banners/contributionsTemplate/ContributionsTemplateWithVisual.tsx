import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    background-color: #dddbd1;
    display: grid;
    grid-template-columns: ${space[3]}px 1fr ${space[3]}px;
    grid-template-areas:
        'visual visual visual'
        '. header .'
        '. body .'
        '. ticker .'
        '. cta .';

    ${from.tablet} {
        grid-template-columns: ${space[5]}px 1fr ${space[5]}px 1fr ${space[5]}px;
        grid-template-areas:
            '. header . visual visual'
            '. body . visual visual'
            '. ticker . visual visual'
            '. cta . visual visual';
    }
`;

const visualContainer = css`
    position: relative;
    grid-area: visual;
`;

const headerContainer = css`
    grid-area: header;

    ${from.tablet} {
        padding-top: ${space[3]}px;
    }
`;

const bodyContainerWithTicker = css`
    display: none;
    ${from.tablet} {
        display: block;
    }
`;

const bodyContainer = (hasTicker: boolean): SerializedStyles => css`
    grid-area: body;
    padding-top: ${space[1]}px;
    ${hasTicker && bodyContainerWithTicker}

    ${from.tablet} {
        padding-top: ${space[2]}px;
    }
`;

const tickerContainer = css`
    grid-area: ticker;
    padding-top: ${space[1]}px;
    padding-bottom: ${space[1]}px;

    ${from.tablet} {
        padding-top: ${space[6]}px;
    }
`;

const ctaContainer = css`
    grid-area: cta;
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
}

const ContributionsTemplateWithVisual: React.FC<ContributionsTemplateWithVisualProps> = ({
    visual,
    closeButton,
    header,
    body,
    ticker,
    cta,
}: ContributionsTemplateWithVisualProps) => {
    return (
        <div css={container}>
            <div css={visualContainer}>
                {visual}
                <div css={closeButtonContainer}>{closeButton}</div>
            </div>
            <div css={headerContainer}>{header}</div>
            {<div css={bodyContainer(!!ticker)}>{body}</div>}
            {ticker && <div css={tickerContainer}>{ticker}</div>}
            <div css={ctaContainer}>{cta}</div>
        </div>
    );
};

export default ContributionsTemplateWithVisual;
