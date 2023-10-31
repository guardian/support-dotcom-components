import { ContributionFrequency, SelectedAmountsVariant } from '@sdc/shared/src/types/abTests/epic';
import { useState, useEffect } from 'react';
import { BannerTextContent } from '../modules/banners/common/types';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib';

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

const useChoiceCards = (
    choiceCardAmounts: SelectedAmountsVariant | undefined,
    countryCode: string | undefined,
    content: BannerTextContent,
): {
    choiceCardSelection: ChoiceCardSelection | undefined;
    setChoiceCardSelection: (choiceCardSelection: ChoiceCardSelection) => void;
    getCtaText: (contentType: 'mainContent' | 'mobileContent') => string;
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

    const getCtaText = (contentType: 'mainContent' | 'mobileContent'): string => {
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
