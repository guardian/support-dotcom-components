import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import ContributionsTemplateVisual from '../../contributionsTemplate/ContributionsTemplateVisual';

const visualStyles = css`
    img {
        ${from.tablet} {
            object-fit: contain;
        }

        ${from.desktop} {
            margin-top: 1%;
            height: 105%;
        }
    }
`;

const GlobalEoyVisual: React.FC = () => (
    <ContributionsTemplateVisual
        image={
            <picture css={visualStyles}>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/e901715a478eef5f0515b990ebecca76f8572280/0_0_960_432/960.png"
                />
                <source srcSet="https://media.guim.co.uk/fa23ce83c3455c9b3c12edddf6a138d5151cdb06/0_0_720_681/720.png" />
                <img src="https://media.guim.co.uk/e901715a478eef5f0515b990ebecca76f8572280/0_0_960_432/960.png" />
            </picture>
        }
    />
);

export default GlobalEoyVisual;
