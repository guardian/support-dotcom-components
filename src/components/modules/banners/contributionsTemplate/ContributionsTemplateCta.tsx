import React from 'react';
import { css } from '@emotion/core';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    display: flex;

    & > * + * {
        margin-left: ${space[4]}px;
    }

    ${from.tablet} {
        & > * + * {
            margin-left: ${space[5]}px;
        }
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
