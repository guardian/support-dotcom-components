import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';

const container = (isGivingTuesday: boolean) => css`
    width: ${isGivingTuesday ? '50%' : '40%'};
    padding-top: 45%;
    position: relative;
    float: right;
    overflow-y: clip;
    clip-path: inset(0% -100% 0% -100%);
    -webkit-clip-path: inset(0% -100% 0% -100%);

    ${from.mobileMedium} {
        padding-top: 40%;
        width: ${isGivingTuesday ? '55%' : '43%'};
    }

    ${from.mobileLandscape} {
        padding-top: ${isGivingTuesday ? '0' : '30%'};
        padding-bottom: ${isGivingTuesday ? '35%' : '0'};
    }

    ${from.phablet} {
        padding-top: 25%;
        padding-bottom: 0;
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
        right: ${isGivingTuesday ? '-2%' : '0'};
    }

    ${from.leftCol} {
        width: 34%;
    }
`;

const imageContainer = (isGivingTuesday: boolean) => css`
    margin-right: ${isGivingTuesday ? `-${space[6]}px` : `-${space[3]}px`};
    margin-left: -32px;

    position: absolute;
    left: 0;
    right: 0;
    bottom: ${isGivingTuesday ? '-12%' : '0'};

    ${from.mobileMedium} {
        margin-right: -${space[3]}px;
        bottom: ${isGivingTuesday ? '-20%' : '-11%'};
    }

    ${from.mobileLandscape} {
        margin-right: -${space[5]}px;
        bottom: -40%;
    }

    ${from.phablet} {
        bottom: -55%;
        margin-left: ${space[5]}px;
    }

    ${from.tablet} {
        margin-left: 0;
        margin-right: 0;
        bottom: ${isGivingTuesday ? `${space[6]}px` : '0'};
        margin-left: 3%;
        ${isGivingTuesday
            ? `
                width: 120%;
                left: 3%;
                clip-path: inset(0 0 0 2%);
                `
            : ''}
    }

    ${from.desktop} {
        bottom: ${isGivingTuesday ? `${space[6]}px` : '0'};
        margin-left: 5%;
        ${isGivingTuesday
            ? `
                width: 130%;
                margin-left: 0;
                clip-path: inset(0 0 0 3%);
                transform: translateX(-6%);
                `
            : ''}
    }

    ${from.leftCol} {
        right: -5%;
        bottom: ${isGivingTuesday ? `${space[6]}px` : '0'};
        ${isGivingTuesday
            ? `
                width: 105%;
                transform: translateX(2%);
                `
            : ''}
    }

    ${from.wide} {
        ${isGivingTuesday
            ? `
                transform: translateX(5%);
                `
            : ''}
    }

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
`;

interface UsEoyMomentBannerVisualProps {
    isGivingTuesday: boolean;
}

const UsEoyMomentBannerVisual = ({
    isGivingTuesday,
}: UsEoyMomentBannerVisualProps): JSX.Element => (
    <div css={container(isGivingTuesday)}>
        <div css={imageContainer(isGivingTuesday)}>
            {isGivingTuesday ? (
                <picture>
                    <source
                        media="(max-width: 979px)"
                        srcSet="https://i.guim.co.uk/img/media/59cd29e896d058a0e633322f0000527065ea79e6/0_0_600_424/500.jpg?quality=85&s=1a2d5cf12aea1c07db2f09d83119df35"
                    />
                    <source
                        media="(max-width: 1299px)"
                        srcSet="https://i.guim.co.uk/img/media/59cd29e896d058a0e633322f0000527065ea79e6/0_0_600_424/600.jpg?quality=85&s=886b19ca6e5f868fa758fee62eb3bb1e"
                    />
                    <source srcSet="https://i.guim.co.uk/img/media/59cd29e896d058a0e633322f0000527065ea79e6/0_0_600_424/600.jpg?quality=85&s=886b19ca6e5f868fa758fee62eb3bb1e" />
                    <img src="https://i.guim.co.uk/img/media/59cd29e896d058a0e633322f0000527065ea79e6/0_0_600_424/500.jpg?quality=85&s=1a2d5cf12aea1c07db2f09d83119df35" />
                </picture>
            ) : (
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
            )}
        </div>
    </div>
);

export default UsEoyMomentBannerVisual;
