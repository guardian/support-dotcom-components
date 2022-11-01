import React, { ReactElement } from 'react';
import { css } from '@emotion/react';

const styles = css`
    border: 1px solid blue;
`;
export type ImageAttrs = {
    url: string;
    media: string;
    alt?: string;
};

type ResponsiveImageProps = {
    images: Array<ImageAttrs>;
    baseImage: ImageAttrs;
};

function createSource(image: ImageAttrs): ReactElement {
    return <source media={image.media} srcSet={image.url} key={image.url} />;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    images,
    baseImage,
}: ResponsiveImageProps) => {
    return (
        <picture css={styles}>
            {images.map(createSource)}
            <img src={baseImage.url} alt={baseImage.alt} />
        </picture>
    );
};
