import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    width: 100%;
    height: calc(100% -1px);
    /* This stops the image from overlapping the border-top */
    margin-top: 1px;

    ${from.tablet} {
        margin-top: 0;
        position: absolute;
        overflow-y: hidden;
        top: 0;
        right: 0;
        width: 52%;
    }

    ${from.desktop} {
        width: 50%;
        /* This stops the image from overlapping the border-top */
        margin-top: 1px;
    }
`;

const imageContainer = css`
    img {
        display: block;
        width: 90%;
        height: auto;
        margin: 0 auto;

        ${from.tablet} {
            margin-top: 5%;
        }

        ${from.desktop} {
            margin-top: 0;
            width: 100%;
        }

        ${from.leftCol} {
            max-height: 100%;
            max-width: 100%;
        }
    }
`;

const ElectionAuMomentBannerVisual = (): JSX.Element => (
    <div css={container}>
        <div css={imageContainer}>
            <picture>
                <source
                    media="(max-width: 374px)"
                    srcSet="https://media.guim.co.uk/99ecfd33fb530ce6cc47e606caac6952e7195cd1/0_0_266_89/266.png"
                />
                <source
                    media="(max-width: 479px)"
                    srcSet="https://media.guim.co.uk/ad0166d7724eb2dfc6aa16fea50fe41c02324eb8/0_0_281_131/281.png"
                />
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/166b8daf89992e0263fc9eff75e2af21dab5546e/0_0_1172_552/1000.png"
                />
                <source
                    media="(max-width: 979px)"
                    srcSet="https://media.guim.co.uk/8da1d854dee753e006afc5677a09a13bc84b4eb9/0_0_1524_1652/923.png"
                />
                <source
                    media="(max-width: 1139px)"
                    srcSet="https://media.guim.co.uk/6daf1817afa379d842b10eb91d7bcda3c4c5fdad/0_0_2028_1648/1000.png"
                />
                <source
                    media="(max-width: 1299px)"
                    srcSet="https://media.guim.co.uk/4fa98ca4b70ee9b21b74d16f2586b5d6c513297f/0_195_2836_1961/2000.png"
                />
                <source
                    media="(max-width: 2499px)"
                    srcSet="https://media.guim.co.uk/4fa98ca4b70ee9b21b74d16f2586b5d6c513297f/0_319_2836_1837/2000.png"
                />
                <source srcSet="https://media.guim.co.uk/166b8daf89992e0263fc9eff75e2af21dab5546e/0_0_1172_744/500.png" />
                <img src="https://media.guim.co.uk/99ecfd33fb530ce6cc47e606caac6952e7195cd1/0_0_266_89/266.png" />
            </picture>
        </div>
    </div>
);

export default ElectionAuMomentBannerVisual;
