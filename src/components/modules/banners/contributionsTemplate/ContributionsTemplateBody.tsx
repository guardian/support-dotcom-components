import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { Hide } from '@guardian/src-layout';

const container = css`
    ${body.medium()}
`;

interface ContributionsTemplateBodyProps {
    copy: React.ReactElement;
}

const ContributionsTemplateBody: React.FC<ContributionsTemplateBodyProps> = ({
    copy,
}: ContributionsTemplateBodyProps) => <div css={container}>{copy}</div>;

export default ContributionsTemplateBody;
