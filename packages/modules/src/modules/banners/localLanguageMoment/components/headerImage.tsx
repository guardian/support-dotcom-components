import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import {
    HeaderImageSvgDesktop,
    HeaderImageSvgLeftCol,
    HeaderImageSvgMobileMedium,
    HeaderImageSvgMobileSmall,
    HeaderImageSvgTablet,
    HeaderImageSvgWide,
} from './headerImageSvg';

const styles = css`
    padding-right: 50px; // prevent overlap with close button
    ${from.tablet} {
        padding-right: 0;
    }
    svg {
        max-width: 100%;
    }
`;

export function HeaderImage(): JSX.Element {
    return (
        <div css={styles}>
            <Hide above="mobileMedium">
                <HeaderImageSvgMobileSmall />
            </Hide>
            <Hide below="mobileMedium" above="tablet">
                <HeaderImageSvgMobileMedium />
            </Hide>
            <Hide below="tablet" above="desktop">
                <HeaderImageSvgTablet />
            </Hide>
            <Hide below="desktop" above="leftCol">
                <HeaderImageSvgDesktop />
            </Hide>
            <Hide below="leftCol" above="wide">
                <HeaderImageSvgLeftCol />
            </Hide>
            <Hide below="wide">
                <HeaderImageSvgWide />
            </Hide>
        </div>
    );
}
