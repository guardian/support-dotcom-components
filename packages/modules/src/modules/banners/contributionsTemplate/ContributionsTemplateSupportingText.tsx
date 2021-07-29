import React from 'react';
import { css } from '@emotion/react';
import { headline } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';

const container = css`
	${headline.xxxsmall()}
	font-weight: 300;

	${from.tablet} {
		font-size: 24px;
	}
`;

interface ContributionsTemplateSupportingProps {
	copy: React.ReactElement;
}

const ContributionsTemplateSupporting: React.FC<ContributionsTemplateSupportingProps> =
	({ copy }: ContributionsTemplateSupportingProps) => (
		<div css={container}>{copy}</div>
	);

export default ContributionsTemplateSupporting;
