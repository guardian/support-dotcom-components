import React from 'react';
import { css } from '@emotion/react';
import { ImageSettings } from '../settings';
import { from } from '@guardian/src-foundations/mq';
import { Image, ResponsiveImage } from '../../../shared/ResponsiveImage';

// ---- Component ---- //

interface MomentTemplateBannerVisualProps {
    settings: ImageSettings;
}

export function MomentTemplateBannerVisual({
    settings,
}: MomentTemplateBannerVisualProps): JSX.Element {
    const baseImage: Image = {
        url: settings.mobileUrl,
        media: '(max-width: 739px)',
        alt: settings.alt,
    };

    const images: Image[] = [baseImage];
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
    }

    ${from.tablet} {
        height: 100%;
        width: 100%;
        align-items: center;
    }
`;
