import React from 'react';
import { css, SerializedStyles } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { brandAlt, neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { from, until } from '@guardian/src-foundations/mq';
import { Square } from './Square';

function desktopGridPlacement(row: number, column: number) {
    return css`
        ${from.desktop} {
            grid-row: ${row};
            grid-column: ${column};
        }
    `;
}

// We can fake the gap rule in IE11 by adding extra rows/columns to act as the gap
// These gap rows/columns can also be flexible in ways that a standard gap rule can't
function ieCompatibleGap(rowsOrCols: string[], gap: string) {
    return rowsOrCols.join(` ${gap} `);
}

const boxShadow = '0px 6px 0px rgba(0, 0, 0, 0.25);';

const contentSquareSide = css`
    position: relative;
    background-color: ${neutral[20]};
    border: 2px solid ${neutral[0]};
    border-top: none;
    border-right: none;
    border-radius: 2px 0 0 0;
    transform: translate(-10px, 2px);
    height: 100%;
    box-shadow: ${boxShadow};

    ::before {
        content: ' ';
        display: block;
        width: 6px;
        background-color: ${neutral[20]};
        border-top: 2px solid ${neutral[0]};
        height: 100%;
        transform: translateY(-2px) skewY(-30deg);
    }
`;

const contentSquare = css`
    z-index: 2;
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    color: ${neutral[7]};
    border-bottom: 2px solid ${neutral[0]};
    padding-top: 0;
    box-shadow: ${boxShadow};
    min-width: ${space[24]}px;
    min-height: ${space[24]}px;

    p {
        padding: ${space[1]}px;
        padding-left: 0;
        margin: 0;
        margin-left: -2px;
    }

    ${from.tablet} {
        width: 154px;
        height: 154px;
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
        grid-column: 3;
        grid-row: 1;
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

const qrCodeContainer = css`
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: ${space[3]}px;
`;

const textHighlight = css`
    background-color: ${brandAlt[400]};
`;

const contentSquaresGrid = css`
    position: absolute;
    bottom: 0;
    display: grid;
    left: ${space[1]}px;

    ${until.tablet} {
        grid-template-columns: 1fr minmax(1px, 64px) 1fr;
        row-gap: 20px;
        margin: 0 ${space[4]}px;
    }

    ${from.mobileLandscape} {
        left: ${space[3]}px;
    }

    ${from.tablet} {
        left: unset;
        right: 0;
        grid-template-columns: repeat(3, 150px);
        row-gap: 76px;
    }

    ${from.desktop} {
        grid-template-columns: ${ieCompatibleGap(
            ['180px', 'minmax(0, 76px)', '180px', '180px'],
            `${space[6]}px`,
        )};
        grid-template-rows: ${ieCompatibleGap(['1fr', '1fr'], `${space[24]}px`)};
        row-gap: 0;
    }
`;

type ContentSquareProps = {
    children?: React.ReactNode;
    cssOverrides?: SerializedStyles[];
};

const ContentSquare: React.FC<ContentSquareProps> = ({ children, cssOverrides = [] }) => {
    return (
        <Square colour="white" cssOverrides={[contentSquare, ...cssOverrides]}>
            <div css={contentSquareSide}></div>
            {children}
        </Square>
    );
};

export const ContentSquares: React.FC = () => {
    return (
        <div css={contentSquaresGrid}>
            <ContentSquare cssOverrides={[bottomLeftOnMobile, desktopGridPlacement(1, 1)]}>
                <p>Solve with no distractions</p>
            </ContentSquare>
            <ContentSquare cssOverrides={[downShiftedSquare, desktopGridPlacement(1, 5)]}>
                <p>Share and play with friends</p>
            </ContentSquare>
            <ContentSquare cssOverrides={[bottomRightOnMobile, desktopGridPlacement(1, 7)]}>
                <p>
                    Choose from over 15,000 <span css={textHighlight}>crosswords</span> and&nbsp;
                    <span css={textHighlight}>sudokus,</span> wherever you are.
                </p>
            </ContentSquare>
            <ContentSquare cssOverrides={[qrCodeSquare, desktopGridPlacement(3, 1)]}>
                <div css={qrCodeContainer}>
                    <p>
                        <span css={textHighlight}>Scan to download</span>
                    </p>
                    <img
                        src="https://i.guim.co.uk/img/media/9810f21a107ed91fcab56a02edc0e8c62075e784/0_0_400_400/140.png?width=100&quality=85&s=8ffbe8d3a3908596d0ce0810fee3c1ff"
                        alt="QR code for the Guardian Puzzles App"
                        width="100"
                        height="100"
                    />
                </div>
            </ContentSquare>
        </div>
    );
};
