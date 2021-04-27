import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { space } from '@guardian/src-foundations';
import { Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';
import {
    MobileFirstLine,
    MobileSecondLine,
    DesktopFirstLine,
    DesktopSecondLine,
    DesktopThirdLine,
} from './G200BannerHeaderLines';

const containerStyles = css`
    position: relative;
    ${headline.medium()}
    color: ${neutral[100]};
    padding: ${space[1]}px ${space[3]}px 0;

    ${from.tablet} {
        ${headline.large()}
        padding: ${space[3]}px 0 0;
    }

    ${from.wide} {
        padding: ${space[3]}px ${space[3]}px 0;
    }
`;

const mobileFirstLineContainerStyles = css`
    width: 260px;
    margin-top: 3px;

    ${from.mobileMedium} {
        width: 310px;
    }
`;

const mobileSecondLineContainerStyles = css`
    width: 277px;
    margin-top: -8px;

    ${from.mobileMedium} {
        width: 328px;
        margin-top: -9px;
    }
`;

const desktopFirstLineContainerStyles = css`
    width: 325px;
    margin-top: 5px;

    ${from.desktop} {
        width: 387px;
        margin-top: 7px;
    }
`;

const desktopSecondLineContainerStyles = css`
    width: 218px;
    margin-top: 3px;

    ${from.desktop} {
        width: 251px;
        margin-top: 10px;
    }
`;

const desktopThirdLineContainerStyles = css`
    width: 137px;
    margin-top: -1px;

    ${from.desktop} {
        width: 158px;
        margin-top: 5px;
    }
`;

const linesContainerStyles = css`
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;

    border-top: 1px solid white;

    ${from.tablet} {
        display: none;
        border-top: none;
    }

    ${from.wide} {
        display: block;
    }
`;

const firstLineStyles = css`
    margin-top: 36px;
    border-bottom: 1px solid white;

    ${from.mobileMedium} {
        margin-top: 42px;
    }

    ${from.wide} {
        margin-top: 64px;
    }
`;

const secondLineStyles = css`
    margin-top: 36px;
    border-bottom: 1px solid white;

    ${from.mobileMedium} {
        margin-top: 42px;
    }

    ${from.wide} {
        margin-top: 64px;
    }
`;

const thirdLineStyles = css`
    margin-top: 64px;
    border-bottom: 1px solid white;
`;

const G200BannerHeader: React.FC = () => {
    return (
        <div css={containerStyles}>
            <Hide above="tablet">
                <div css={mobileFirstLineContainerStyles}>
                    <MobileFirstLine />
                </div>

                <div css={mobileSecondLineContainerStyles}>
                    <MobileSecondLine />
                </div>
            </Hide>

            <Hide below="tablet">
                <div css={desktopFirstLineContainerStyles}>
                    <DesktopFirstLine />
                </div>

                <div css={desktopSecondLineContainerStyles}>
                    <DesktopSecondLine />
                </div>

                <div css={desktopThirdLineContainerStyles}>
                    <DesktopThirdLine />
                </div>
            </Hide>

            <div css={linesContainerStyles}>
                <div css={firstLineStyles}></div>

                <div css={secondLineStyles}></div>

                <Hide below="wide">
                    <div css={thirdLineStyles}></div>
                </Hide>
            </div>
        </div>
    );
};

export default G200BannerHeader;
