import React from 'react';
import { css } from '@emotion/react';
import {
    BottomImageSvgDesktop,
    BottomImageSvgMobile,
    BottomImageSvgTablet,
} from './BottomImageSvg';
import { Hide } from '@guardian/source-react-components';

const styles = css`
    svg {
        display: block;
    }
`;

export function BottomImage(): JSX.Element {
    return (
        <div css={styles}>
            <Hide above="tablet">
                <BottomImageSvgMobile />
            </Hide>
            <Hide below="tablet" above="desktop">
                <BottomImageSvgTablet />
            </Hide>
            <Hide below="desktop">
                <BottomImageSvgDesktop />
            </Hide>
        </div>
    );
}
