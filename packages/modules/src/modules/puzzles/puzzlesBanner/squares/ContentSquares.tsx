import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { headline, brandAlt, neutral, space, from, until } from '@guardian/source-foundations';
import { Square } from './Square';
import { SquareSide } from './SquareSide';
import { squareBorder, squareBoxShadow } from '../puzzlesStyleUtils';
import type { ReactComponent } from '../../../../types';
// import { qrCode } from '../images';

function desktopGridPlacement(row: number, column: number) {
    return css`
        ${from.desktop} {
            grid-row: ${row};
            grid-column: ${column};
        }
    `;
}

// We can fake the 'gap' rule in IE11 by adding extra rows/columns to act as the gap
// These gap rows/columns can also be flexible in ways that a standard gap rule can't
function withIECompatibleGap(rowsOrCols: string[], gap: string) {
    return rowsOrCols.join(` ${gap} `);
}

const minimiseButtonContainer = css`
    align-self: flex-end;
    padding: 0 ${space[2]}px ${space[1]}px 0;
    ${until.tablet} {
        display: none;
    }
`;

const squareSizes = {
    mobile: {
        xsmall: 84,
        small: space[24],
        medium: 120,
        large: 152,
    },
    tablet: 154,
    desktop: 180,
};

const contentSquare = css`
    z-index: 2;
    ${headline.xxxsmall({ fontWeight: 'bold' })};
    color: ${neutral[7]};
    border-bottom: ${squareBorder};
    padding-top: 0;
    box-shadow: ${squareBoxShadow};
    min-width: ${squareSizes.mobile.xsmall}px;
    min-height: ${squareSizes.mobile.xsmall}px;

    ${until.mobileMedium} {
        font-size: 15px;
    }

    p {
        width: 100%;
        padding: ${space[1]}px;
        padding-left: 0;
        margin: 0;
        margin-left: -4px;

        ${from.mobileMedium} {
            margin-left: -2px;
        }
    }

    ${from.mobileMedium} {
        min-width: ${squareSizes.mobile.small}px;
        min-height: ${squareSizes.mobile.small}px;
    }

    ${from.tablet} {
        width: ${squareSizes.tablet}px;
        height: ${squareSizes.tablet}px;
    }

    ${from.desktop} {
        ${headline.xxsmall({ fontWeight: 'bold' })};
        width: ${squareSizes.desktop}px;
        height: ${squareSizes.desktop}px;
    }
`;

const bottomLeftOnMobile = css`
    ${until.tablet} {
        grid-row: 2;
        grid-column: 1;
        width: ${squareSizes.mobile.medium}px;
        height: ${squareSizes.mobile.medium}px;
    }

    ${until.mobileMedium} {
        width: ${squareSizes.mobile.small}px;
        height: ${squareSizes.mobile.small}px;
    }
`;

const bottomRightOnMobile = css`
    ${until.tablet} {
        grid-row: 2;
        grid-column: 3;
        width: ${squareSizes.mobile.large}px;
        height: ${squareSizes.mobile.large}px;
    }

    ${until.mobileMedium} {
        width: ${squareSizes.mobile.medium}px;
        height: ${squareSizes.mobile.medium}px;
    }
`;

const topRightOnMobile = css`
    ${until.tablet} {
        justify-self: center;
        width: ${squareSizes.mobile.small}px;
        height: ${squareSizes.mobile.small}px;
    }
`;

const downShiftedSquare = css`
    grid-column: 3;
    grid-row: 1;

    ${from.tablet} {
        grid-column: 2;
        transform: translateY(86px);
    }

    ${from.desktop} {
        transform: translateY(80px);
    }
`;

// const qrCodeSquare = css`
//     border-bottom: none;
//     box-shadow: none;

//     & * {
//         box-shadow: none;
//     }

//     ${until.tablet} {
//         display: none;
//     }
// `;

// const qrCodeContainer = css`
//     display: flex;
//     flex-direction: column;
//     justify-content: space-between;
//     padding-bottom: ${space[3]}px;

//     ${until.desktop} {
//         img {
//             width: 84px;
//             height: 84px;
//         }
//     }
// `;

const textHighlight = css`
    background-color: ${brandAlt[400]};
`;

const contentSquaresGrid = css`
    position: absolute;
    bottom: 0;
    display: grid;
    left: ${space[1]}px;

    ${until.tablet} {
        bottom: 13px;
        grid-template-columns: 1fr minmax(1px, 64px) 1fr;
        grid-row-gap: 20px;
        margin: 0 ${space[4]}px;
    }

    ${from.mobileLandscape} {
        left: ${space[3]}px;
    }

    ${from.tablet} {
        left: unset;
        right: 0;
        grid-template-columns: repeat(3, 150px);
        grid-row-gap: 76px;
        grid-column-gap: 2px;
    }

    ${from.desktop} {
        grid-template-columns: ${withIECompatibleGap(
            ['180px', 'minmax(0, 76px)', '180px', '180px'],
            `${space[6]}px`,
        )};
        grid-template-rows: ${withIECompatibleGap(['1fr', '1fr'], `${space[24]}px`)};
        grid-row-gap: 0;
        grid-column-gap: 0;
    }
`;

type ContentSquareProps = {
    children?: React.ReactNode;
    cssOverrides?: SerializedStyles[];
};

type ContentSquaresProps = {
    minimiseButton: React.ReactNode;
};

const ContentSquare: ReactComponent<ContentSquareProps> = ({ children, cssOverrides = [] }) => {
    return (
        <Square colour="white" cssOverrides={[contentSquare, ...cssOverrides]}>
            <SquareSide />
            {children}
        </Square>
    );
};

export const ContentSquares: ReactComponent<ContentSquaresProps> = ({ minimiseButton }) => {
    return (
        <div css={contentSquaresGrid}>
            <ContentSquare cssOverrides={[bottomRightOnMobile, desktopGridPlacement(1, 1)]}>
                <p>
                    Choose from over 15,000 <span css={textHighlight}>crosswords</span> and&nbsp;
                    <span css={textHighlight}>sudokus,</span> wherever you&nbsp;are.
                </p>
            </ContentSquare>
            <ContentSquare
                cssOverrides={[topRightOnMobile, downShiftedSquare, desktopGridPlacement(1, 5)]}
            >
                <p>Share and play with friends</p>
            </ContentSquare>
            <ContentSquare cssOverrides={[bottomLeftOnMobile, desktopGridPlacement(1, 7)]}>
                <p>Solve with&nbsp;no distractions</p>
                <div css={minimiseButtonContainer}>{minimiseButton}</div>
            </ContentSquare>
            {/* <ContentSquare cssOverrides={[qrCodeSquare, desktopGridPlacement(3, 1)]}>
                <div css={qrCodeContainer}>
                    <p>
                        <span css={textHighlight}>Scan to download</span>
                    </p>
                    <img
                        src={qrCode}
                        alt="QR code for the Guardian Puzzles App"
                        width="100"
                        height="100"
                    />
                </div>
            </ContentSquare> */}
        </div>
    );
};
