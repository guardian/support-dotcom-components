import React from 'react';
import { css } from '@emotion/core';
import { headline } from '@guardian/src-foundations/typography';
import { Hide } from '@guardian/src-layout';

const container = css`
    ${headline.xxxsmall({ fontWeight: 'regular' })}
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
