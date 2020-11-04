import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';

const container = css`
    display: flex;

    & > * + * {
        margin-left: ${space[4]}px;
    }
`;

interface ContributionsTemplateCtaProps {
    primaryCta: React.ReactElement;
    secondaryCta: React.ReactElement;
}

const ContributionsTemplateCta: React.FC<ContributionsTemplateCtaProps> = ({
    primaryCta,
    secondaryCta,
}: ContributionsTemplateCtaProps) => (
    <div css={container}>
        {primaryCta}
        {secondaryCta}
    </div>
);

export default ContributionsTemplateCta;
