import { css } from '@emotion/react';
import React, { ReactElement } from 'react';
import { BannerId } from '../banners/common/types';

export type ImageAttrs = {
    url: string;
    media: string;
    alt?: string;
};

type ResponsiveImageProps = {
    images: Array<ImageAttrs>;
    baseImage: ImageAttrs;
    bannerId?: BannerId;
};

function createSource(image: ImageAttrs): ReactElement {
    return <source media={image.media} srcSet={image.url} key={image.url} />;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    images,
    baseImage,
    bannerId,
}: ResponsiveImageProps) => {
    return (
        <picture css={container(bannerId)}>
            {images.map(createSource)}
            <img src={baseImage.url} alt={baseImage.alt} />
        </picture>
    );
};

// ---- Styles ---- //

const container = (bannerId?: BannerId) => css`
    width: ${bannerId === 'us-eoy-giving-tues-banner' ? '100%' : ''};
`;
