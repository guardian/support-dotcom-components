import React, { useState } from 'react';
import { css } from '@emotion/react';

const SlideIn = ({
    children,
    canShow,
}: // bannerRefClientHeight,
{
    children: JSX.Element;
    canShow: boolean;
    // bannerRefClientHeight: number | null;
}): JSX.Element => {
    const [startAnimation, setStartAnimation] = useState(false);

    canShow && setTimeout(() => setStartAnimation(true), 2000);

    const slideInAnimation = css`
        opacity: ${startAnimation ? '1' : '0'};
        transition-property: opacity;
        transition-duration: 2s;
    `;

    return <div css={slideInAnimation}>{children}</div>;
};

export default SlideIn;
