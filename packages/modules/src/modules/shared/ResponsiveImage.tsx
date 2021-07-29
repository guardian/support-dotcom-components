import React, { ReactElement } from 'react';

type Image = {
	url: string;
	media: string;
	alt?: string;
};

type ResponsiveImageProps = {
	images: Array<Image>;
	baseImage: Image;
};

function createSource(image: Image): ReactElement {
	return <source media={image.media} srcSet={image.url} key={image.url} />;
}

export const ResponsiveImage: React.FC<ResponsiveImageProps> = ({
	images,
	baseImage,
}: ResponsiveImageProps) => {
	return (
		<picture>
			{images.map(createSource)}
			<img src={baseImage.url} alt={baseImage.alt} />
		</picture>
	);
};
