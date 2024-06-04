import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/source/foundations';
import type { ReactComponent } from '../../../types';

const container = css`
    width: 100%;
    padding-top: 45%;
    position: relative;

    ${from.tablet} {
        padding-top: 0;
        height: 100%;
    }
`;

const imageContainer = css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    ${from.tablet} {
        position: relative;
        width: 100%;
        height: 100%;
    }
`;

interface ContributionsTemplateVisualProps {
    image: React.ReactElement;
}

const ContributionsTemplateVisual: ReactComponent<ContributionsTemplateVisualProps> = ({
    image,
}: ContributionsTemplateVisualProps) => (
    <div css={container}>
        <div css={imageContainer}>{image}</div>
    </div>
);

export default ContributionsTemplateVisual;
