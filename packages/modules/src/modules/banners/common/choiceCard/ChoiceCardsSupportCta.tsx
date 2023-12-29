import React from 'react';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/dist/lib';
import { Tracking } from '@sdc/shared/dist/types';
import { space } from '@guardian/src-foundations';
import { css, SerializedStyles } from '@emotion/react';
import { Hide } from '@guardian/src-layout';
import { ChoiceCardsButton } from './ChoiceCardsButton';
import { ChoiceCardSelection } from '../../../shared/helpers/choiceCards';

const buttonOverrides = css`
    margin-right: ${space[3]}px;
`;

export const ChoiceCardsSupportCta = ({
    tracking,
    numArticles,
    countryCode,
    amountsTestName,
    amountsVariantName,
    selection,
    getCtaText,
    cssOverrides,
    onCtaClick,
}: {
    tracking: Tracking;
    numArticles: number;
    countryCode?: string;
    amountsTestName?: string;
    amountsVariantName?: string;
    selection: ChoiceCardSelection;
    getCtaText: (contentType: 'mainContent' | 'mobileContent') => string;
    cssOverrides?: SerializedStyles;
    onCtaClick: () => void;
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
                <ChoiceCardsButton
                    onClickAction={supportUrl}
                    showArrow
                    data-ignore="global-link-styling"
                    cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
                    onCtaClick={onCtaClick}
                    ctaText={mobileText}
                />
            </Hide>

            <Hide below="tablet">
                <ChoiceCardsButton
                    onClickAction={supportUrl}
                    showArrow
                    data-ignore="global-link-styling"
                    cssOverrides={[buttonOverrides, cssOverrides ?? css``]}
                    onCtaClick={onCtaClick}
                    ctaText={desktopText}
                />
            </Hide>
        </>
    );
};
