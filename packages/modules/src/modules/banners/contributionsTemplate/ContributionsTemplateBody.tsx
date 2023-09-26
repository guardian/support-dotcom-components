import React from 'react';
import { css } from '@emotion/react';
import { body } from '@guardian/src-foundations/typography';
import type { ReactComponent } from '../../../types';

const container = css`
    ${body.medium()}
`;

interface ContributionsTemplateBodyProps {
    copy: React.ReactElement;
}

const ContributionsTemplateBody: ReactComponent<ContributionsTemplateBodyProps> = ({
    copy,
}: ContributionsTemplateBodyProps) => <div css={container}>{copy}</div>;

export default ContributionsTemplateBody;
