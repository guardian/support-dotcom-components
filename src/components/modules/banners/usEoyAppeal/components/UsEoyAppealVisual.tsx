import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import ContributionsTemplateVisual from '../../contributionsTemplate/ContributionsTemplateVisual';

const visualStyles = css`
    img {
        ${from.tablet} {
            object-fit: contain;
        }
    }
`;

const UsEoyAppealVisual: React.FC = () => (
    <ContributionsTemplateVisual
        image={
            <picture css={visualStyles}>
                <source
                    media="(max-width: 739px)"
                    srcSet="https://media.guim.co.uk/0c02b0c63cfdb5e73a86bb4c5a4e1e88b17e24c8/0_0_960_432/960.png"
                />
                <source
                    media="(max-width: 979px)"
                    srcSet="https://media.guim.co.uk/3ccf1f7b696e373324fd9a2087a4152b2be9acac/0_0_720_681/720.png"
                />
                <source srcSet="https://media.guim.co.uk/1086a07886ece443319926c063468e58c6423106/0_0_720_681/720.png" />
                <img src="https://media.guim.co.uk/0c02b0c63cfdb5e73a86bb4c5a4e1e88b17e24c8/0_0_960_432/960.png" />
            </picture>
        }
    />
);

export default UsEoyAppealVisual;
