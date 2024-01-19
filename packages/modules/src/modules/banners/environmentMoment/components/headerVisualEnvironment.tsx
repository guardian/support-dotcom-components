import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { ImageAttrs, ResponsiveImage } from '../../../shared/ResponsiveImage';
import { BannerId } from '../../common/types';

// ---- Component ---- //

export interface Images {
    mainUrl: string;
    mobileSmallUrl?: string;
    mobileMediumUrl?: string;
    tabletUrl?: string;
    desktopUrl?: string;
    leftColUrl?: string;
    wideUrl?: string;
    altText: string;
}

interface EnvironmentVisualProps {
    settings: Images;
    bannerId?: BannerId;
}

export function EnvironmentVisual({ settings, bannerId }: EnvironmentVisualProps): JSX.Element {
    const baseImage: ImageAttrs = {
        url: settings.mainUrl,
        media: '',
        alt: settings.altText,
    };

    const images: ImageAttrs[] = [];
    if (settings.mobileSmallUrl) {
        images.push({ url: settings.mobileSmallUrl, media: '(max-width: 319px)' });
    }
    if (settings.mobileMediumUrl) {
        images.push({ url: settings.mobileMediumUrl, media: '(max-width: 739px)' });
    }
    if (settings.tabletUrl) {
        images.push({ url: settings.tabletUrl, media: '(max-width: 979px)' });
    }
    if (settings.desktopUrl) {
        images.push({ url: settings.desktopUrl, media: '(max-width: 1139px)' });
    }
    if (settings.leftColUrl) {
        images.push({ url: settings.leftColUrl, media: '(max-width: 1299px)' });
    }
    if (settings.wideUrl) {
        images.push({ url: settings.wideUrl, media: '' });
    }

    return (
        <div css={styles.container}>
            <ResponsiveImage baseImage={baseImage} images={images} bannerId={bannerId} />
        </div>
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        display: flex;
        justify-content: center;

        img {
            height: 100%;
            width: 100%;
            object-fit: contain;
            display: block;
        }

        ${from.tablet} {
            height: 100%;
            width: 100%;
            align-items: center;
        }
    `,
};
