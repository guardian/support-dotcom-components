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

const UsEoyAppealVisual: React.FC = () => (
    <ContributionsTemplateVisual
        image={
            <picture css={visualStyles}>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/c7567686da9c9d6fcdb3fdbe14dc24acee86cc04/0_0_960_432/960.png"
                />
                <source srcSet="https://media.guim.co.uk/616cc303876506fd5849d55adb88e42d381153fe/0_0_720_681/720.png" />
                <img src="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png" />
            </picture>
        }
    />
);

export default UsEoyAppealVisual;
