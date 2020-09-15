import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import styles from '../helpers/styles';

const container = css`
    ${body.small()}
`;

const EnvironmentMomentBannerBody: React.FC = () => (
    <div css={container}>
        <div css={styles.hideAfterTablet}>
            It’s our responsibility to never stay quiet. Read our commitment for climate crisis
        </div>
        <div css={styles.hideBeforeTablet}>
            The escalating climate crisis is the defining issue of our lifetimes and that the planet
            is in the grip of an emergency. We know that our readers and supporters around the world
            care passionately about this too, as so many of you have told us
        </div>
    </div>
);

export default EnvironmentMomentBannerBody;
