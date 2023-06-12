import React from 'react';
import { css } from '@emotion/react';

const SlideIn = ({
    children,
    startAnimation,
    bannerRefClientHeight,
}: {
    children: JSX.Element;
    startAnimation: boolean;
    bannerRefClientHeight: number | null;
}): JSX.Element => {
    const slideInAnimation = css`
        margin-bottom: ${startAnimation ? `-${bannerRefClientHeight}` : '0'}px;
        opacity: ${startAnimation ? '1' : '0'};
        transition-property: margin-bottom, opacity;
        transition-duration: 2s;
    `;

    return <div css={slideInAnimation}>{children}</div>;
};

export default SlideIn;
