import React from 'react';
import { css } from '@emotion/core';
import { Hide } from '@guardian/src-layout';
import { news, brand } from '@guardian/src-foundations/palette';
import ContributionsTemplateHeader from '../../contributionsTemplate/ContributionsTemplateHeader';

const firstLineStyles = css`
    color: ${news[400]};
`;

const secondLineStyles = css`
    color: ${brand[400]};
`;

const UsEoyAppealVisual: React.FC = () => (
    <ContributionsTemplateHeader
        copy={
            <>
                <Hide above="tablet">As America begins a new chapter…</Hide>
                <Hide below="tablet">
                    <span css={firstLineStyles}>America’s future:</span>
                    <br />
                    <span css={secondLineStyles}>what’s next?</span>
                </Hide>
            </>
        }
    />
);

export default UsEoyAppealVisual;
