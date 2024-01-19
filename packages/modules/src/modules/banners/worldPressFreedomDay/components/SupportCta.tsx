import React from 'react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/dist/lib';
import { Tracking } from '@sdc/shared/dist/types';
import { brandAlt, neutral, space } from '@guardian/source-foundations';
import { css, SerializedStyles } from '@emotion/react';
import { Hide } from '@guardian/src-layout';
import { Button } from './Button';
import { ChoiceCardSelection } from '../WorldPressFreedomDayBanner';

const buttonOverrides = css`
    margin-right: ${space[3]}px;
    margin-bottom: ${space[3]}px;
    background: ${brandAlt[400]};
    color: ${neutral[0]} !important;
    &:hover {
        background-color: ${brandAlt[200]};
    }
`;

export const SupportCta = ({
    tracking,
    numArticles,
    countryCode,
    amountsTestName,
    amountsVariantName,
    selection,
    getCtaText,
    cssOverrides,
}: {
    tracking: Tracking;
    numArticles: number;
    countryCode?: string;
    amountsTestName?: string;
    amountsVariantName?: string;
    selection: ChoiceCardSelection;
    getCtaText: (contentType: 'mainContent' | 'mobileContent') => string;
    cssOverrides?: SerializedStyles;
}): JSX.Element | null => {
    const url = `https://support.theguardian.com/contribute?selected-contribution-type=${selection.frequency}&selected-amount=${selection.amount}`;

    const mobileText = getCtaText('mobileContent');
    const desktopText = getCtaText('mainContent');

    const supportUrl = addRegionIdAndTrackingParamsToSupportUrl(
        url,
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
                    onClickAction={supportUrl}
                    showArrow
                    data-ignore="global-link-styling"
                    cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
                >
                    {mobileText}
                </Button>
            </Hide>

            <Hide below="tablet">
                <Button
                    onClickAction={supportUrl}
                    showArrow
                    data-ignore="global-link-styling"
                    cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
                >
                    {desktopText}
                </Button>
            </Hide>
        </>
    );
};
