import React from 'react';

type Image = {
    imgId: string;
    signature: string;
    size: number;
};

type ResponsiveImageProps = {
    images: Array<Image>;
    baseImage: Image;
    sizes: string;
};

function imageUrl({ imgId, signature, size }: Image): string {
    return `https://i.guim.co.uk/img/media/${imgId}/500.png?width=${size}&quality=85&s=${signature}`;
}

function createSrcset(images: Array<Image>): string {
    return images.map(image => `${imageUrl(image)} ${image.size}w`).join(', ');
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
    images,
    baseImage,
    sizes,
}: ResponsiveImageProps) => {
    return <img srcSet={createSrcset(images)} sizes={sizes} src={imageUrl(baseImage)} alt="" />;
};
