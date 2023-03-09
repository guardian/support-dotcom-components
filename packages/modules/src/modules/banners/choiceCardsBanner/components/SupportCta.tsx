import React from 'react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/src/lib';
import { Tracking } from '@sdc/shared/src/types';
import { Button } from '../../../epics/Button';
import { neutral, space } from '@guardian/src-foundations';
import { css } from '@emotion/react';
import { BannerEnrichedCta, BannerTextContent } from '../../common/types';
import { Hide } from '@guardian/src-layout';

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
    content,
    getPrimaryCta,
}: {
    tracking: Tracking;
    numArticles: number;
    countryCode?: string;
    amountsTestName?: string;
    amountsVariantName?: string;
    content?: BannerTextContent;
    getPrimaryCta: (
        contentType: 'mainContent' | 'mobileContent',
        content?: BannerTextContent,
    ) => BannerEnrichedCta;
}): JSX.Element | null => {
    const mobileCta = getPrimaryCta('mobileContent', content);
    const mainCta = getPrimaryCta('mainContent', content);

    const fallbackButtonText = 'Support us';
    const fallbackBaseUrl = 'https://support.theguardian.com/contribute';

    const mainUrlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
        mainCta.ctaUrl ?? fallbackBaseUrl,
        tracking,
        numArticles,
        countryCode,
        amountsTestName,
        amountsVariantName,
    );

    const mobileUrlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
        mobileCta.ctaUrl ?? fallbackBaseUrl,
        tracking,
        numArticles,
        countryCode,
        amountsTestName,
        amountsVariantName,
    );

    return (
        <>
            <Hide above="tablet">
                <Button
                    onClickAction={mobileUrlWithRegionAndTracking}
                    showArrow
                    data-ignore="global-link-styling"
                    css={buttonOverrides}
                >
                    {mobileCta.ctaText ?? fallbackButtonText}
                </Button>
            </Hide>

            <Hide below="tablet">
                <Button
                    onClickAction={mainUrlWithRegionAndTracking}
                    showArrow
                    data-ignore="global-link-styling"
                    css={buttonOverrides}
                >
                    {mainCta.ctaText ?? fallbackButtonText}
                </Button>
            </Hide>
        </>
    );
};
