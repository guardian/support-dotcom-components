import React, { ReactElement } from 'react';

type Image = {
    imgId: string;
    signature: string;
    size: number;
    media: string;
};

type ResponsiveImageProps = {
    images: Array<Image>;
    baseImage: Image;
};

function imageUrl({ imgId, signature, size }: Image): string {
    return `https://i.guim.co.uk/img/media/${imgId}/500.png?width=${size}&quality=85&s=${signature}`;
}

function createSource(image: Image): ReactElement {
    return <source media={image.media} srcSet={imageUrl(image)} />;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    images,
    baseImage,
}: ResponsiveImageProps) => {
    return (
        <picture>
            {images.map(createSource)}
            <img src={imageUrl(baseImage)} />
        </picture>
    );
};
