import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { from } from '@guardian/src-foundations/mq';
import styles from '../helpers/styles';

const container = css`
    max-width: 40rem;
    padding-bottom: 0;
    ${body.medium()};
`;

const headerText = css`
    font-weight: bold;
    display: block;

    ${from.tablet} {
        display: initial;
    }
`;

interface EnvironmentMomentBannerBodyProps {
    isSupporter: boolean;
}

const EnvironmentMomentBannerBody: React.FC<EnvironmentMomentBannerBodyProps> = ({
    isSupporter,
}: EnvironmentMomentBannerBodyProps) => (
    <div css={container}>
        <span css={headerText}>Our climate promise to you.</span>{' '}
        <span css={styles.hideAfterTablet}>
            We will not sideline the climate crisis. Today, one year on from our pledge, we want to
            update you on our progress.
        </span>
        <span css={styles.hideBeforeTablet}>
            {isSupporter ? (
                <>
                    One year ago, we outlined our plans to confront the escalating climate crisis.
                    We promised to report with authority on the defining issue of our lifetime –
                    giving it the sustained attention it demands. Then came the global pandemic.
                    <br />
                    Today we want to update you on our progress, and assure you that the Guardian
                    will not sideline the climate emergency in 2020, or in the years to come.
                    Generosity from supporters like you sustains our open, independent journalism.
                    Thank you.
                </>
            ) : (
                <>
                    One year ago, we outlined our plans to confront the escalating climate crisis.
                    We promised to report with authority on the defining issue of our lifetime –
                    giving it the sustained attention it demands. Then came the global pandemic.
                    <br />
                    Today we want to update you on our progress, and assure you that the Guardian
                    will not sideline the climate emergency in 2020, or in the years to come. Your
                    support sustains our open, independent journalism.
                </>
            )}
        </span>
    </div>
);

export default EnvironmentMomentBannerBody;
