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
            We will not sideline the climate crisis. Today, one year on from our pledge, we want to
            update you on our progress.
        </div>
        <div css={styles.hideBeforeTablet}>
            One year ago, we outlined our plans to confront the escalating climate crisis. We
            promised to report with authority on the defining issue of our lifetime – giving it the
            sustained attention it demands. Then came the global pandemic.
            <br />
            Today we want to update you on our progress, and assure you that the Guardian will not
            sideline the climate emergency in 2020, or in the years to come. Generosity from
            supporters like you sustains our open, independent journalism. Thank you.
        </div>
    </div>
);

export default EnvironmentMomentBannerBody;
