import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';
import ContributionsTemplateVisual from '../../contributionsTemplate/ContributionsTemplateVisual';
import { selectComponent } from '../helpers/xmasUpdates';

const beforeDec29VisualStyles = css`
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

const dec29AndAfterVisualStyles = css`
    img {
        ${from.tablet} {
            object-fit: contain;
        }
    }
`;

const UsEoyAppealVisual: React.FC = () => {
    const BeforeDec29Picture: React.FC = () => (
        <picture css={beforeDec29VisualStyles}>
            <source
                media="(max-width: 739px)"
                srcSet="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png"
            />
            <source srcSet="https://media.guim.co.uk/cdba08ee85134397376c8ad1a20a78c670431f26/0_122_720_681/720.png" />
            <img src="https://media.guim.co.uk/53cb3ec24999db33d9957cd5f70223350f4fbba1/0_0_960_432/960.png" />
        </picture>
    );

    const Dec29AndAfter: React.FC = () => (
        <picture css={dec29AndAfterVisualStyles}>
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
    );

    const Picture = selectComponent(
        BeforeDec29Picture,
        Dec29AndAfter,
        Dec29AndAfter,
        Dec29AndAfter,
    );

    return <ContributionsTemplateVisual image={<Picture />} />;
};

export default UsEoyAppealVisual;
