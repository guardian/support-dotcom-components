import React from 'react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/src/lib';
import { Tracking } from '@sdc/shared/src/types';
import { Button } from '../../../epics/Button';
import { neutral, space } from '@guardian/src-foundations';
import { css } from '@emotion/react';

const buttonOverrides = css`
    margin-right: ${space[3]}px;
    margin-bottom: ${space[3]}px;
    background: ${neutral[0]};
    color: ${neutral[100]} !important
    ;
`;

export const SupportCta = ({
    tracking,
    numArticles,
    countryCode,
    amountsTestName,
    amountsVariantName,
}: {
    tracking: Tracking;
    numArticles: number;
    countryCode?: string;
    amountsTestName?: string;
    amountsVariantName?: string;
}): JSX.Element | null => {
    const buttonText = 'Support us';
    const baseUrl = 'https://support.theguardian.com/contribute';
    const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
        baseUrl,
        tracking,
        numArticles,
        countryCode,
        amountsTestName,
        amountsVariantName,
    );

    console.log(urlWithRegionAndTracking);

    return (
        <Button
            onClickAction={urlWithRegionAndTracking}
            showArrow
            data-ignore="global-link-styling"
            css={buttonOverrides}
        >
            {buttonText}
        </Button>
    );
};
