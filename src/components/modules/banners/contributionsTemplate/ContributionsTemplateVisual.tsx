import React from 'react';
import { css } from '@emotion/core';

const container = css`
    width: 100%;
    height: 135px;

    img {
        object-fit: cover;
    }
`;

interface ContributionsTemplateVisualProps {
    imageUrl: string;
}

const ContributionsTemplateVisual: React.FC<ContributionsTemplateVisualProps> = ({
    imageUrl,
}: ContributionsTemplateVisualProps) => (
    <div css={container}>
        <img src={imageUrl} />
    </div>
);

export default ContributionsTemplateVisual;
