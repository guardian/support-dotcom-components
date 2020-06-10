import React, { ReactElement } from 'react';
import guardianLogo from './guardianLogo.png';

export default {
    title: 'img',
};

const image = {
    src: guardianLogo,
    alt: 'The Guardian',
};

export const Logo = (): ReactElement => {
    return <img src={image.src} alt={image.alt} />;
};
