import type { CountryGroupId, IsoCurrency } from '../../../shared/lib';
import { countryGroups, isoCurrencyToCurrencySymbol } from '../../../shared/lib';
import type { Channel } from '../../../shared/types';
import type {
    ChoiceCard,
    ChoiceCardsSettings,
    RatePlan,
} from '../../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../../productCatalog';
import {
    currencySymbolTemplate,
    defaultBannerChoiceCardsSettings,
    defaultEpicChoiceCardsSettings,
} from './defaultChoiceCardSettings';

const replaceCurrencyTemplate = (s: string, currencySymbol: string) =>
    s.replace(currencySymbolTemplate, currencySymbol);

const ratePlanCopy = (ratePlan: RatePlan): string => {
    if (ratePlan === 'Monthly') {
        return 'monthly';
    } else {
        return 'annually';
    }
};

// Add pricing, currency etc
const enrichChoiceCard = (
    choiceCard: ChoiceCard,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
): ChoiceCard => {
    const currencySymbol = isoCurrencyToCurrencySymbol[isoCurrency];

    const buildLabelForRecurringProduct = (
        ratePlan: RatePlan,
        tier: 'Contribution' | 'SupporterPlus',
    ) => {
        const price = productCatalog[tier].ratePlans.Monthly.pricing[isoCurrency];
        return `Support ${currencySymbol}${price}/${ratePlanCopy(ratePlan)}`;
    };
    const buildLabelForOneOffContribution = (label: string) =>
        replaceCurrencyTemplate(label, currencySymbol);

    const label =
        choiceCard.product.supportTier === 'OneOff'
            ? buildLabelForOneOffContribution(choiceCard.label)
            : buildLabelForRecurringProduct(
                  choiceCard.product.ratePlan,
                  choiceCard.product.supportTier,
              );

    const benefits = choiceCard.benefits.map((benefit) => ({
        ...benefit,
        copy: replaceCurrencyTemplate(benefit.copy, currencySymbol),
    }));

    return {
        product: choiceCard.product,
        label,
        isDefault: choiceCard.isDefault,
        benefitsLabel: choiceCard.benefitsLabel,
        benefits,
        pill: choiceCard.pill,
    };
};

export const getChoiceCardsSettings = (
    countryGroupId: CountryGroupId,
    channel: Channel,
    productCatalog: ProductCatalog,
    variantChoiceCardSettings?: ChoiceCardsSettings, // defined only if the test variant overrides the default settings
): ChoiceCardsSettings | undefined => {
    let choiceCardsSettings: ChoiceCardsSettings | undefined;
    const isoCurrency = countryGroups[countryGroupId].currency;

    if (variantChoiceCardSettings) {
        // Use the overridden settings from the test variant
        choiceCardsSettings = variantChoiceCardSettings;
    } else {
        // Use the default settings
        if (channel === 'Epic') {
            choiceCardsSettings = defaultEpicChoiceCardsSettings(countryGroupId);
        } else if (channel === 'Banner1' || channel === 'Banner2') {
            choiceCardsSettings = defaultBannerChoiceCardsSettings(countryGroupId);
        }
    }

    if (choiceCardsSettings) {
        // Prepare the choice cards settings for rendering
        return {
            choiceCards: choiceCardsSettings.choiceCards.map((card) =>
                enrichChoiceCard(card, isoCurrency, productCatalog),
            ),
            mobileChoiceCards: choiceCardsSettings.mobileChoiceCards?.map((card) =>
                enrichChoiceCard(card, isoCurrency, productCatalog),
            ),
        };
    }
    return undefined;
};
