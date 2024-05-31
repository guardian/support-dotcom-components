import React from 'react';
import { css } from '@emotion/react';
import { Hide } from '@guardian/source/react-components';
import { HeaderImageSvg } from './headerImageSvg';

const styles = css`
    svg {
        max-width: 100%;
    }
`;

export type ImageSize = {
    width: string;
    height: string;
};

const mobileSmall: ImageSize = { width: '270', height: '40' };
const mobileMedium: ImageSize = { width: '300', height: '40' };
const tablet: ImageSize = { width: '300', height: '40' };
const desktop: ImageSize = { width: '450', height: '40' };
const leftCol: ImageSize = { width: '562', height: '40' };
const wide: ImageSize = { width: '640', height: '40' };

export function HeaderImage(): JSX.Element {
    return (
        <div css={styles}>
            <Hide above="mobileMedium">
                <HeaderImageSvg imageSize={mobileSmall} />
            </Hide>
            <Hide below="mobileMedium" above="tablet">
                <HeaderImageSvg imageSize={mobileMedium} />
            </Hide>
            <Hide below="tablet" above="desktop">
                <HeaderImageSvg imageSize={tablet} />
            </Hide>
            <Hide below="desktop" above="leftCol">
                <HeaderImageSvg imageSize={desktop} />
            </Hide>
            <Hide below="leftCol" above="wide">
                <HeaderImageSvg imageSize={leftCol} />
            </Hide>
            <Hide below="wide">
                <HeaderImageSvg imageSize={wide} />
            </Hide>
        </div>
    );
}
