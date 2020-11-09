import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    ${headline.xsmall({ fontWeight: 'bold' })}

    ${from.tablet} {
        font-size: 28px;
    }
`;

interface ContributionsTemplateHeaderProps {
    copy: string;
}

const ContributionsTemplateHeader: React.FC<ContributionsTemplateHeaderProps> = ({
    copy,
}: ContributionsTemplateHeaderProps) => (
    <header css={container}>
        <div>{copy}</div>
    </header>
);

export default ContributionsTemplateHeader;
