import React from 'react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/dist/lib';
import { Tracking } from '@sdc/shared/dist/types';
import { neutral, space } from '@guardian/src-foundations';
import { css } from '@emotion/react';
import { BannerEnrichedCta } from '../../common/types';
import { Hide } from '@guardian/src-layout';
import { Button } from './Button';
import { ChoiceCardSelection } from '../ChoiceCardsBanner';

const buttonOverrides = css`
    margin-right: ${space[3]}px;
    margin-bottom: ${space[3]}px;
    background: ${neutral[0]};
    color: ${neutral[100]} !important;

    &:hover {
        background-color: rgba(0, 0, 0, 0.75);
    }
`;

export const SupportCta = ({
    tracking,
    numArticles,
    countryCode,
    amountsTestName,
    amountsVariantName,
    selection,
}: {
    tracking: Tracking;
    numArticles: number;
    countryCode?: string;
    amountsTestName?: string;
    amountsVariantName?: string;
    selection: ChoiceCardSelection;
}): JSX.Element | null => {
    const baseUrl = 'https://support.theguardian.com/contribute';

    const getPrimaryCta = (): BannerEnrichedCta => {
        return {
            ctaText: 'Support us',
            ctaUrl: `${baseUrl}?selected-contribution-type=${selection.frequency}&selected-amount=${selection.amount}`,
        };
    };

    const cta = getPrimaryCta();

    const supportUrl = addRegionIdAndTrackingParamsToSupportUrl(
        cta.ctaUrl,
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
                    css={buttonOverrides}
                >
                    {cta.ctaText}
                </Button>
            </Hide>

            <Hide below="tablet">
                <Button
                    onClickAction={supportUrl}
                    showArrow
                    data-ignore="global-link-styling"
                    css={buttonOverrides}
                >
                    {cta.ctaText}
                </Button>
            </Hide>
        </>
    );
};
