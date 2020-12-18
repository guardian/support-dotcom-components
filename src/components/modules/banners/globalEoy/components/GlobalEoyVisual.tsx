import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import ContributionsTemplateVisual from '../../contributionsTemplate/ContributionsTemplateVisual';

const visualStyles = css`
    img {
        ${from.tablet} {
            object-fit: contain;
            transform: scale(1.1);
        }

        ${from.desktop} {
            transform: scale(1.2);
        }

        ${from.leftCol} {
            transform: scale(1.3);
        }

        ${from.wide} {
            transform: scale(1.4);
        }
    }
`;

const GlobalEoyVisual: React.FC = () => (
    <ContributionsTemplateVisual
        image={
            <picture css={visualStyles}>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/e9012f30db4814101252a0f76ec653c80e3d81b4/0_0_960_432/960.jpg"
                />
                <source srcSet="https://media.guim.co.uk/3b2c4eb1ef1e354a851fe7ea5a547266ceaba981/0_0_720_681/720.jpg" />
                <img src="https://media.guim.co.uk/e9012f30db4814101252a0f76ec653c80e3d81b4/0_0_960_432/960.jpg" />
            </picture>
        }
    />
);

export default GlobalEoyVisual;
