import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { TopImageSvgDesktop, TopImageSvgMobile, TopImageSvgTablet } from './TopImageSvg';
import { Hide } from '@guardian/src-layout';

const styles = css`
    padding-right: 50px; // prevent overlap with close button

    ${from.tablet} {
        padding-right: 0;
    }

    svg {
        max-width: 100%;
    }
`;

export function TopImage(): JSX.Element {
    return (
        <div css={styles}>
            <Hide above="tablet">
                <TopImageSvgMobile />
            </Hide>
            <Hide below="tablet" above="desktop">
                <TopImageSvgTablet />
            </Hide>
            <Hide below="desktop">
                <TopImageSvgDesktop />
            </Hide>
        </div>
    );
}
