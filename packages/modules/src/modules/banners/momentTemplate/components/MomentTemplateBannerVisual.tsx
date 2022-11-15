import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { ImageAttrs, ResponsiveImage } from '../../../shared/ResponsiveImage';
import { Image } from '@sdc/shared/types';

// ---- Component ---- //

interface MomentTemplateBannerVisualProps {
    settings: Image;
}

export function MomentTemplateBannerVisual({
    settings,
}: MomentTemplateBannerVisualProps): JSX.Element {
    const baseImage: ImageAttrs = {
        url: settings.mainUrl,
        media: '',
        alt: settings.altText,
    };

    const images: ImageAttrs[] = [];
    if (settings.mobileUrl) {
        images.push({ url: settings.mobileUrl, media: '(max-width: 739px)' });
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
        <div css={container}>
            <ResponsiveImage baseImage={baseImage} images={images} />
        </div>
    );
}

// ---- Styles ---- //

const container = css`
    height: 140px;
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
`;
