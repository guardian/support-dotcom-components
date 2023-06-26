import React, { useState } from 'react';
import { css } from '@emotion/react';

const SlideIn = ({
    children,
    canShow,
}: {
    children: JSX.Element;
    canShow: boolean;
}): JSX.Element => {
    const [startAnimation, setStartAnimation] = useState(false);

    canShow && setTimeout(() => setStartAnimation(true), 2000);

    console.log('startAnimation: ', startAnimation);

    const slideInAnimation = css`
        transform: ${startAnimation ? 'translateY(0%)' : 'translateY(100%)'};
        transition-property: transform;
        transition-duration: 0.75s;
    `;

    return <div css={slideInAnimation}>{children}</div>;
};

export default SlideIn;
