import { ContributionFrequency, SelectedAmountsVariant } from '@sdc/shared/src/types/abTests/epic';
import { useState, useEffect } from 'react';
import { BannerTextContent } from '../modules/banners/common/types';
import { addChoiceCardsParams, getLocalCurrencySymbol } from '@sdc/shared/dist/lib';

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

export type ContentType = 'mainContent' | 'mobileContent';

const useChoiceCards = (
    choiceCardAmounts: SelectedAmountsVariant | undefined,
    countryCode: string | undefined,
    content: BannerTextContent,
): {
    choiceCardSelection: ChoiceCardSelection | undefined;
    setChoiceCardSelection: (choiceCardSelection: ChoiceCardSelection) => void;
    getCtaText: (contentType: ContentType) => string;
    getCtaUrl: (contentType: ContentType) => string;
    currencySymbol: string;
} => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    useEffect(() => {
        if (choiceCardAmounts?.amountsCardData) {
            const defaultFrequency: ContributionFrequency =
                choiceCardAmounts.defaultContributionType || 'MONTHLY';
            const localAmounts = choiceCardAmounts.amountsCardData[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts]);

    const getCtaText = (contentType: ContentType): string => {
        const primaryCtaText = content?.[contentType]?.primaryCta?.ctaText;

        return primaryCtaText ? primaryCtaText : 'Contribute';
    };
    const getCtaUrl = (contentType: ContentType): string => {
        const primaryCtaUrl =
            content?.[contentType]?.primaryCta?.ctaUrl ??
            'https://support.theguardian.com/contribute';

        if (choiceCardSelection) {
            return addChoiceCardsParams(
                primaryCtaUrl,
                choiceCardSelection.frequency,
                choiceCardSelection.amount,
            );
        } else {
            return primaryCtaUrl;
        }
    };

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    return {
        choiceCardSelection,
        setChoiceCardSelection,
        getCtaText,
        getCtaUrl,
        currencySymbol,
    };
};

export default useChoiceCards;
