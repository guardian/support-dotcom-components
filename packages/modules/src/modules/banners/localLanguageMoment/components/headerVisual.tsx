import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import {
    HeaderVisualSvgDesktop,
    HeaderVisualSvgLeftCol,
    HeaderVisualSvgMobileMedium,
    HeaderVisualSvgMobileSmall,
    HeaderVisualSvgTablet,
    HeaderVisualSvgWide,
} from './headerVisualSvg';

const styles = css`
    padding-right: 50px; // prevent overlap with close button

    ${from.tablet} {
        padding-right: 0;
    }

    svg {
        max-width: 100%;
    }
`;

export function HeaderVisual(): JSX.Element {
    return (
        <div css={styles}>
            <Hide above="mobileMedium">
                <HeaderVisualSvgMobileSmall />
            </Hide>
            <Hide below="mobileMedium" above="tablet">
                <HeaderVisualSvgMobileMedium />
            </Hide>
            <Hide below="tablet" above="desktop">
                <HeaderVisualSvgTablet />
            </Hide>
            <Hide below="desktop" above="leftCol">
                <HeaderVisualSvgDesktop />
            </Hide>
            <Hide below="leftCol" above="wide">
                <HeaderVisualSvgLeftCol />
            </Hide>
            <Hide below="wide">
                <HeaderVisualSvgWide />
            </Hide>
        </div>
    );
}
