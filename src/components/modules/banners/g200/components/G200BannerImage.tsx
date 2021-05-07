import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';

const containerStyles = css`
    position: relative;
    height: 0;
    overflow: hidden;
    padding-bottom: 38.83%;

    ${from.tablet} {
        padding-bottom: 79.5%;
    }

    img {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        object-fit: cover;
    }
`;

const G200BannerImage: React.FC = () => {
    return (
        <div css={containerStyles}>
            <picture>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/a388afcdb86e3abe360df93297a8b128feb6c97d/0_0_600_233/600.png"
                />
                <source srcSet="https://media.guim.co.uk/70d7202a2de37d5a214b58e1fc08ed86f3fc4400/0_0_800_636/800.png" />

                <img src="https://media.guim.co.uk/a388afcdb86e3abe360df93297a8b128feb6c97d/0_0_600_233/600.png" />
            </picture>
        </div>
    );
};

export default G200BannerImage;
