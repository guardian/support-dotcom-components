import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';

const container = css`
    display: flex;

    ${from.tablet} {
        & > * + * {
            margin-left: ${space[2]}px;
        }
    }

    svg {
        display: block;
    }
`;

interface ContributionsTemplateCloseButtonProps {
    closeButton: React.ReactElement;
    roundel: React.ReactElement;
}

const ContributionsTemplateCloseButton: React.FC<ContributionsTemplateCloseButtonProps> = ({
    closeButton,
    roundel,
}: ContributionsTemplateCloseButtonProps) => (
    <div css={container}>
        <Hide below="tablet">{roundel}</Hide>
        {closeButton}
    </div>
);

export default ContributionsTemplateCloseButton;
