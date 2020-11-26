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
                <Hide above="tablet">
                    <span css={firstLineStyles}>Help unite America</span>{' '}
                    <span css={secondLineStyles}>this Giving Tuesday</span>
                </Hide>
                <Hide below="tablet">
                    <span css={firstLineStyles}>Help unite America</span>
                    <br />
                    <span css={secondLineStyles}>this Giving Tuesday</span>
                </Hide>
            </>
        }
    />
);

export default UsEoyAppealVisual;
