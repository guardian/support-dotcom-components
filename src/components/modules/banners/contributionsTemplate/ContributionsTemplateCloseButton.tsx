import React from 'react';
import { css } from '@emotion/core';

const container = css``;

interface ContributionsTemplateCloseButtonProps {
    closeButton: React.ReactElement;
}

const ContributionsTemplateCloseButton: React.FC<ContributionsTemplateCloseButtonProps> = ({
    closeButton,
}: ContributionsTemplateCloseButtonProps) => <div css={container}>{closeButton}</div>;

export default ContributionsTemplateCloseButton;
