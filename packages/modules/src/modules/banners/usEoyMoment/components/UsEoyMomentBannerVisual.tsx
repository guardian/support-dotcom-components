import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    width: 100%;
    padding-top: 45%;
    position: relative;

    ${from.tablet} {
        padding-top: 0;
        height: 100%;
    }
`;

const imageContainer = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    ${from.tablet} {
        position: relative;
        width: 100%;
        height: 100%;
    }
`;

const UsEoyMomentBannerVisual = (): JSX.Element => ( // better return type?
    <div css={container}>
        <div css={imageContainer}>
            <picture>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/c4d243dee6813a12818f37d297c5ffea66fb38aa/0_0_320_135/320.png"
                />
                <source
                    media="(max-width: 979px)"
                    srcSet="https://media.guim.co.uk/0410464a8813131d3c878beeebf6938628bbc18a/0_0_360_439/360.png"
                />
                <source
                    media="(max-width: 1299px)"
                    srcSet="https://media.guim.co.uk/5894dcdff5be591627bb69f74688896fdec503a1/0_0_481_422/481.png"
                />
                <source srcSet="https://media.guim.co.uk/646365f26cafa1179b6799daaa3621cf04f511d5/0_0_719_395/719.png" />
                <img src="https://media.guim.co.uk/c4d243dee6813a12818f37d297c5ffea66fb38aa/0_0_320_135/320.png" />
            </picture>
        </div>
    </div>
);

export default UsEoyMomentBannerVisual;
