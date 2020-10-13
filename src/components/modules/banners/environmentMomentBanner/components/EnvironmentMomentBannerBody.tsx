import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import styles from '../helpers/styles';
import { getLocalCurrencySymbol } from '../../../../../lib/geolocation';

const container = css`
    ${body.small()}
`;

const paragraphsContainer = css`
    & > * + * {
        margin-top: 8px;
    }
`;

interface EnvironmentMomentBannerBodyProps {
    isSupporter: boolean;
    countryCode: string;
}

const EnvironmentMomentBannerBody: React.FC<EnvironmentMomentBannerBodyProps> = ({
    isSupporter,
    countryCode,
}: EnvironmentMomentBannerBodyProps) => (
    <div css={container}>
        <div css={styles.hideAfterTablet}>
            We will not sideline the climate crisis. Today, one year on from our pledge, we want to
            update you on our progress.
        </div>
        <div css={styles.hideBeforeTablet}>
            {isSupporter ? (
                <div css={paragraphsContainer}>
                    <div>
                        At the Guardian, we’ve been trying to live up to the ambitious promises we
                        made a year ago. We pledged to do more in service of the escalating climate
                        emergency.
                    </div>
                    <div>
                        Thanks to your support, we can provide independent, authoritative,
                        persistent journalism that is always led by science and truth. And we can
                        keep it open for all so more people can be informed, and inspired to take
                        action. We’ve stopped taking advertising from fossil fuel companies, and
                        we’re on course to reach net zero carbon emissions by 2030.
                    </div>
                    <div>Thank you for helping to sustain our open, independent journalism.</div>
                </div>
            ) : (
                <div css={paragraphsContainer}>
                    <div>
                        At the Guardian, we’ve been trying to live up to the ambitious promises we
                        made a year ago. We pledged to do more in service of the escalating climate
                        emergency.
                    </div>
                    <div>
                        We will provide independent, authoritative, persistent journalism that is
                        always led by science and truth. And we’ll keep it open for all so more
                        people can be informed, and inspired to take action. We’ve stopped taking
                        advertising from fossil fuel companies, and we’re set to reach net zero
                        carbon emissions by 2030.
                    </div>
                    <div>
                        From as little as {getLocalCurrencySymbol(countryCode)}1, today you can help
                        us achieve so much more.
                    </div>
                </div>
            )}
        </div>
    </div>
);

export default EnvironmentMomentBannerBody;
