import React, { ReactElement } from 'react';
import close from './close.png';

export default {
    title: 'img',
};

const image = {
    src: close,
    alt: 'Close banner',
};

export const Close = (): ReactElement => {
    return <img src={image.src} alt={image.alt} />;
};
