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
                    srcSet="https://media.guim.co.uk/352673c50e980b241e36b14bbcb93096368186ea/0_0_1920_846/1920.jpg"
                />
                <source
                    media="(prefers-reduced-motion: reduce)"
                    srcSet="https://media.guim.co.uk/6a1f495e9c6c92404e54315f1c8ac4e06d3c8635/0_0_1440_1362/1440.jpg"
                />
                <source srcSet="https://uploads.guim.co.uk/2020/12/22/us-eoy-desktop.gif" />
                <img src="https://media.guim.co.uk/352673c50e980b241e36b14bbcb93096368186ea/0_0_1920_846/1920.jpg" />
            </picture>
        }
    />
);

export default UsEoyAppealVisual;
