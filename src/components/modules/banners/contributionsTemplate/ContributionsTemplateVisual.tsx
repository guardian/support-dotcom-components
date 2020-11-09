import React from 'react';
import { css } from '@emotion/core';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    width: 100%;
    height: 135px;

    img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    ${from.tablet} {
        height: 100%;
    }
`;

interface ContributionsTemplateVisualProps {
    image: React.ReactElement;
}

const ContributionsTemplateVisual: React.FC<ContributionsTemplateVisualProps> = ({
    image,
}: ContributionsTemplateVisualProps) => <div css={container}>{image}</div>;

export default ContributionsTemplateVisual;
