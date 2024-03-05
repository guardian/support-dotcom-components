import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { ImageAttrs, ResponsiveImage } from '../../../shared/ResponsiveImage';
import { Image } from '@sdc/shared/types';
import { BannerId } from '../../common/types';

// ---- Component ---- //

interface DesignableBannerVisualProps {
    settings: Image;
    bannerId?: BannerId;
    isHeaderImage?: boolean;
}

export function DesignableBannerVisual({
    settings,
    bannerId,
    isHeaderImage,
}: DesignableBannerVisualProps): JSX.Element {
    const baseImage: ImageAttrs = {
        url: settings.mainUrl,
        media: '',
        alt: settings.altText,
    };

    const images: ImageAttrs[] = [];
    const styles = getStyles(isHeaderImage);
    if (settings.mobileUrl) {
        images.push({ url: settings.mobileUrl, media: '(max-width: 739px)' });
    }
    if (settings.tabletUrl) {
        images.push({ url: settings.tabletUrl, media: '(max-width: 979px)' });
    }
    if (settings.leftColUrl) {
        images.push({ url: settings.leftColUrl, media: '(max-width: 1139px)' });
    }
    if (settings.wideUrl) {
        images.push({ url: settings.wideUrl, media: '' });
    }

    return (
        <ResponsiveImage
            baseImage={baseImage}
            images={images}
            bannerId={bannerId}
            cssOverrides={styles.container}
        />
    );
}

// ---- Styles ---- //

const getStyles = (isHeaderImage = false) => {
    if (isHeaderImage) {
        return {
            container: css`
                height: 100%;
                width: 100%;

                img {
                    height: 100%;
                    width: 100%;
                    object-fit: contain;
                    display: block;
                }
            `,
        };
    }
    return {
        container: css`
            display: block;
            width: calc(100% + 20px);
            margin-left: -10px;
            margin-right: -10px;

            img {
                width: 100%;
                object-fit: contain;
                display: block;

                ${from.tablet} {
                    max-height: none;
                }
            }

            ${from.tablet} {
                height: 100%;
                width: 100%;
                align-items: center;
                margin-left: 0;
                margin-right: 0;
            }
        `,
    };
};
