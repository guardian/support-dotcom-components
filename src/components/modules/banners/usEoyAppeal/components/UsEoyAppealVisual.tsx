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
                    srcSet="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png"
                />
                <source srcSet="https://media.guim.co.uk/cdba08ee85134397376c8ad1a20a78c670431f26/0_122_720_681/720.png" />
                <img src="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png" />
            </picture>
        }
    />
);

export default UsEoyAppealVisual;
