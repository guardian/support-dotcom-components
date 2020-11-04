import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';

const container = css`
    ${headline.xxxsmall({ fontWeight: 'regular' })}
`;

interface ContributionsTemplateBodyProps {
    copy: string;
}

const ContributionsTemplateBody: React.FC<ContributionsTemplateBodyProps> = ({
    copy,
}: ContributionsTemplateBodyProps) => <div css={container}>{copy}</div>;

export default ContributionsTemplateBody;
