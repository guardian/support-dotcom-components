import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const container = css`
    width: 40%;
    padding-top: 45%;
    position: relative;
    float: right;
    overflow-y: clip;
    clip-path: inset(0% -100% 0% -100%);
    -webkit-clip-path: inset(0% -100% 0% -100%);

    ${from.mobileMedium} {
        padding-top: 40%;
        width: 43%;
    }

    ${from.mobileLandscape} {
        padding-top: 30%;
    }

    ${from.phablet} {
        padding-top: 25%;
    }

    ${from.tablet} {
        padding-top: 0;
        height: 100%;
        position: absolute;
        bottom: 0;
        right: 0;
        width: 42%;
        clip-path: none;
        -webkit-clip-path: none;
    }

    ${from.desktop} {
        width: 34%;
    }

    ${from.desktop} {
        width: 36%;
        right: -2%;
    }

    ${from.leftCol} {
        width: 34%;
    }
`;

const imageContainer = css`
    margin-right: -${space[3]}px;
    margin-left: -32px;

    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;

    ${from.mobileMedium} {
        bottom: -11%;
    }

    ${from.mobileLandscape} {
        margin-right: -${space[5]}px;
        bottom: -40%;
    }

    ${from.phablet} {
        bottom: -55%;
    }

    ${from.tablet} {
        margin-left: 0;
        margin-right: 0;
        bottom: 0%;
        padding-left: 3%;
    }

    ${from.desktop} {
        bottom: 0%;
        padding-left: 5%;
    }

    ${from.leftCol} {
        right: -5%;
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

const UsEoyMomentBannerVisual = (): JSX.Element => (
    <div css={container}>
        <div css={imageContainer}>
            <picture>
                <source
                    media="(max-width: 979px)"
                    srcSet="https://i.guim.co.uk/img/media/fb8279054062d480d5f14c7098accc980fb5dd45/0_0_600_724/414.jpg?width=414&quality=85&s=d1aa5690af8abb2c696c528eb44e5ca5"
                />
                <source
                    media="(max-width: 1299px)"
                    srcSet="
                    https://i.guim.co.uk/img/media/fb8279054062d480d5f14c7098accc980fb5dd45/0_0_600_724/600.jpg?width=600&quality=85&s=2859c5b61e0b033bfe458b32d29fdc7e"
                />
                <source srcSet="https://i.guim.co.uk/img/media/fb8279054062d480d5f14c7098accc980fb5dd45/0_0_600_724/600.jpg?width=600&quality=85&s=2859c5b61e0b033bfe458b32d29fdc7e" />
                <img src="https://i.guim.co.uk/img/media/fb8279054062d480d5f14c7098accc980fb5dd45/0_0_600_724/414.jpg?width=414&quality=85&s=d1aa5690af8abb2c696c528eb44e5ca5" />
            </picture>
        </div>
    </div>
);

export default UsEoyMomentBannerVisual;
