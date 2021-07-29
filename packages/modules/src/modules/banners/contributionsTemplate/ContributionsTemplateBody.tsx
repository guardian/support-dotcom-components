import React from 'react';
import { css } from '@emotion/react';
import { body } from '@guardian/src-foundations/typography';

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
