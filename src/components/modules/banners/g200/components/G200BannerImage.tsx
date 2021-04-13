import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';

const containerStyles = css`
    img {
        display: block;
        width: 100%;
        object-fit: cover;

        ${from.tablet} {
            margin-bottom: 0;
        }
    }
`;

const G200BannerImage: React.FC = () => {
    return (
        <div css={containerStyles}>
            <picture>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/9b34bc8b49d22897b5bd06e42000d475257a945a/0_0_743_281/743.png"
                />
                <source srcSet="https://media.guim.co.uk/044def2953b03db4fa798a5d62f47be80eacfa5e/0_0_476_372/476.png" />

                <img src="https://media.guim.co.uk/9b34bc8b49d22897b5bd06e42000d475257a945a/0_0_743_281/743.png" />
            </picture>
        </div>
    );
};

export default G200BannerImage;
