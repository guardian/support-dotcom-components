import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';

const container = css`
    ${body.small()}
`;

const EnvironmentMomentBannerBody: React.FC = () => (
    <div css={container}>
        It’s our responsibility to never stay quiet. Read our commitment for climate crisis
    </div>
);

export default EnvironmentMomentBannerBody;
