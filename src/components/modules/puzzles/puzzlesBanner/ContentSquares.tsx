import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { Square } from './Square';

const boxShadow = '0px 6px 0px rgba(0, 0, 0, 0.25);';

const contentSquareSide = css`
    position: relative;
    width: ${space[2]}px;
    background-color: ${neutral[20]};
    border: 2px solid ${neutral[0]};
    border-top: none;
    border-right: none;
    transform: translate(-100%, 2px);
    height: 100%;
    box-shadow: ${boxShadow};

    ::before {
        content: ' ';
        display: block;
        width: 6px;
        background-color: ${neutral[20]};
        border-top: 2px solid ${neutral[0]};
        height: 50%;
        transform: translate(-1px, -1.5px) skewY(-30deg);
    }
`;

const contentSquare = css`
    z-index: 2;
    pointer-events: all;
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    color: ${neutral[7]};
    border-bottom: 2px solid ${neutral[0]};
    padding-top: 0;
    box-shadow: ${boxShadow};
    min-width: 97px;
    min-height: 97px;

    p {
        padding: ${space[1]}px;
        padding-left: 0;
        margin: 0;
        margin-left: -2px;
    }

    ${from.tablet} {
        width: 150px;
        height: 150px;
    }

    ${from.desktop} {
        ${headline.xxsmall({ fontWeight: 'bold' })};
        width: 180px;
        height: 180px;
    }
`;

const bottomLeftOnMobile = css`
    ${until.tablet} {
        grid-row-start: 2;
        grid-column-start: 1;
        width: 120px;
        height: 120px;
    }
`;

const bottomRightOnMobile = css`
    ${until.tablet} {
        grid-row-start: 2;
        grid-column-start: 3;
        width: 152px;
        height: 152px;
    }
`;

const downShiftedSquare = css`
    ${until.tablet} {
        grid-column-start: 3;
        justify-self: center;
        width: 96px;
        height: 96px;
    }

    ${from.tablet} {
        transform: translateY(80px);
    }

    ${from.desktop} {
        grid-column-start: 3;
    }
`;

const qrCodeSquare = css`
    border-bottom: none;
    box-shadow: none;

    & * {
        box-shadow: none;
    }

    ${until.tablet} {
        display: none;
    }
`;

const textHighlight = css`
    background-color: ${brandAlt[400]};
`;

const contentSquaresGrid = css`
    /* Allow clicks to drop through to the button */
    pointer-events: none;
    position: absolute;
    bottom: 0;
    right: 0;
    display: grid;
    ${until.tablet} {
        grid-template-columns: 1fr minmax(1px, 64px) 1fr;
        row-gap: 20px;
        margin: 0 ${space[4]}px;
    }

    ${from.tablet} {
        grid-template-columns: repeat(3, 150px);
        row-gap: 76px;
    }

    ${from.desktop} {
        grid-template-columns: 180px minmax(0, ${space[24]}px) 180px 180px;
        gap: ${space[24]}px ${space[6]}px;
    }
`;

type ContentSquareProps = {
    children?: React.ReactNode;
    cssOverrides?: SerializedStyles;
};

export const ContentSquare: React.FC<ContentSquareProps> = ({ children, cssOverrides }) => {
    return (
        <>
            <Square colour="white" cssOverrides={[contentSquare, cssOverrides]}>
                <div css={contentSquareSide}></div>
                {children}
            </Square>
        </>
    );
};

export const ContentSquares: React.FC = () => {
    return (
        <div css={contentSquaresGrid}>
            <ContentSquare cssOverrides={bottomLeftOnMobile}>
                <p>Solve with no distractions</p>
            </ContentSquare>
            <ContentSquare cssOverrides={downShiftedSquare}>
                <p>Share and play with friends</p>
            </ContentSquare>
            <ContentSquare cssOverrides={bottomRightOnMobile}>
                <p>
                    Choose from over 15,000 <span css={textHighlight}>crosswords</span> and&nbsp;
                    <span css={textHighlight}>sudokus,</span> wherever you are.
                </p>
            </ContentSquare>
            <ContentSquare cssOverrides={qrCodeSquare}>
                <p>
                    <span css={textHighlight}>Scan to download</span>
                </p>
            </ContentSquare>
        </div>
    );
};
