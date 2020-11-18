import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { Hide } from '@guardian/src-layout';

const container = css`
    ${body.medium()}
`;

interface ContributionsTemplateBodyProps {
    mobileCopy: string;
    desktopCopy: string;
}

const ContributionsTemplateBody: React.FC<ContributionsTemplateBodyProps> = ({
    mobileCopy,
    desktopCopy,
}: ContributionsTemplateBodyProps) => (
    <div css={container}>
        <Hide above="tablet">{mobileCopy}</Hide>
        <Hide below="tablet">{desktopCopy}</Hide>
    </div>
);

export default ContributionsTemplateBody;
