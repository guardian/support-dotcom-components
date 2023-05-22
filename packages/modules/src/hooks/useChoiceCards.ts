import { ContributionFrequency, SelectedAmountsVariant } from '@sdc/shared/src/types/abTests/epic';
import { useState, useEffect } from 'react';
import { BannerTextContent } from '../modules/banners/common/types';
import { getLocalCurrencySymbol } from '@sdc/shared/src/lib/geolocation';

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

const useChoiceCards = (
    choiceCardAmounts: SelectedAmountsVariant | undefined,
    countryCode: string | undefined,
): {
    choiceCardSelection: ChoiceCardSelection | undefined;
    setChoiceCardSelection: (choiceCardSelection: ChoiceCardSelection) => void;
    getCtaText: (
        contentType: 'mainContent' | 'mobileContent',
        content?: BannerTextContent,
    ) => string;
    currencySymbol: string;
} => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    useEffect(() => {
        if (choiceCardAmounts?.amounts) {
            const defaultFrequency: ContributionFrequency = 'MONTHLY';
            const localAmounts = choiceCardAmounts.amounts[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts]);

    const getCtaText = (
        contentType: 'mainContent' | 'mobileContent',
        content?: BannerTextContent,
    ): string => {
        const primaryCtaText = content?.[contentType]?.primaryCta?.ctaText;

        return primaryCtaText ? primaryCtaText : 'Contribute';
    };

    const currencySymbol = getLocalCurrencySymbol(countryCode);

    return {
        choiceCardSelection,
        setChoiceCardSelection,
        getCtaText,
        currencySymbol,
    };
};

export default useChoiceCards;
