import React from 'react';
import { css } from '@emotion/react';
import { space, from } from '@guardian/source-foundations';
import { Hide } from '@guardian/source-react-components';
import type { ReactComponent } from '../../../types';

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

const ContributionsTemplateCloseButton: ReactComponent<ContributionsTemplateCloseButtonProps> = ({
    closeButton,
    roundel,
}: ContributionsTemplateCloseButtonProps) => (
    <div css={container}>
        <Hide below="tablet">{roundel}</Hide>
        {closeButton}
    </div>
);

export default ContributionsTemplateCloseButton;
