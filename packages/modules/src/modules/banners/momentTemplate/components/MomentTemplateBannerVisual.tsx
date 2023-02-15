import React from 'react';
import { css } from '@emotion/react';
import { between, from } from '@guardian/src-foundations/mq';
import { ImageAttrs, ResponsiveImage } from '../../../shared/ResponsiveImage';
import { Image } from '@sdc/shared/types';
import { BannerId } from '../../common/types';
import { space } from '@guardian/src-foundations';

// ---- Component ---- //

interface MomentTemplateBannerVisualProps {
    settings: Image;
    bannerId?: BannerId;
}

export function MomentTemplateBannerVisual({
    settings,
    bannerId,
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

    const alignAusEoyBanner = css`
        ${between.tablet.and.desktop} {
            align-items: baseline;
            margin-top: 70px;
            margin-left: ${space[5]}px;
        }
    `;

    const alignNewYearBanner = css`
        ${from.tablet} {
            align-items: center;
            justify-content: initial;
        }
        ${from.desktop} {
            align-items: flex-end;
            justify-content: initial;
        }
    `;

    const alignment = css`
        ${from.tablet} {
            align-items: ${bannerId === 'us-eoy-banner' ? 'flex-start' : 'center'};
        }

        ${bannerId === 'aus-eoy-banner' && alignAusEoyBanner}
        ${bannerId === 'global-new-year-banner' && alignNewYearBanner}
    `;

    return (
        <div css={[container(bannerId), alignment]}>
            <ResponsiveImage baseImage={baseImage} images={images} bannerId={bannerId} />
        </div>
    );
}

// ---- Styles ---- //

const container = (bannerId?: BannerId) => css`
    height: 140px;
    display: flex;
    justify-content: center;

    img {
        height: 100%;
        width: 100%;
        object-fit: ${bannerId === 'us-eoy-giving-tues-banner' ? 'cover' : 'contain'};
        display: block;
    }

    ${from.tablet} {
        height: 100%;
        width: 100%;
    }
`;
