import type { CountryGroupId, IsoCurrency } from '../../../shared/lib';
import { countryGroups, isoCurrencyToCurrencySymbol } from '../../../shared/lib';
import type { Channel, Cta } from '../../../shared/types';
import type {
    ChoiceCard,
    ChoiceCardsSettings,
    RatePlan,
} from '../../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../../productCatalog';
import type { Promotion } from '../promotions/promotions';
import { JunePromotion } from '../promotions/promotions';
import {
    currencySymbolTemplate,
    defaultBannerChoiceCardsSettings,
    defaultEpicChoiceCardsSettings,
} from './defaultChoiceCardSettings';
import {
    junePromoBannerChoiceCardsSettings,
    junePromoEpicChoiceCardsSettings,
} from './junePromoChoiceCardSettings';

const replaceCurrencyTemplate = (s: string, currencySymbol: string) =>
    s.replace(currencySymbolTemplate, currencySymbol);

const ratePlanCopy = (ratePlan: RatePlan): string => {
    if (ratePlan === 'Monthly') {
        return 'monthly';
    } else {
        return 'year';
    }
};

// Add pricing, currency etc
const enrichChoiceCard = (
    choiceCard: ChoiceCard,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
    promotion?: Promotion,
): ChoiceCard => {
    const currencySymbol = isoCurrencyToCurrencySymbol[isoCurrency];

    const buildLabelForRecurringProduct = (
        ratePlan: RatePlan,
        tier: 'Contribution' | 'SupporterPlus',
    ) => {
        const price = productCatalog[tier].ratePlans.Monthly.pricing[isoCurrency];
        if (promotion) {
            return `Support <s>${currencySymbol}${price}</s> ${currencySymbol}${price * (promotion.discountPercent / 100)}/${ratePlanCopy(ratePlan)}`;
        } else {
            return `Support ${currencySymbol}${price}/${ratePlanCopy(ratePlan)}`;
        }
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

    const buildPill = (): ChoiceCard['pill'] => {
        if (promotion) {
            return {
                copy: `${promotion.discountPercent}% off`,
                backgroundColour: { r: 'C7', g: '00', b: '00', kind: 'hex' }, // error[400]
                textColour: { r: 'FF', g: 'FF', b: 'FF', kind: 'hex' }, // neutral[100]
            };
        } else {
            return choiceCard.pill;
        }
    };

    const pill = buildPill();

    return {
        product: choiceCard.product,
        label,
        isDefault: choiceCard.isDefault,
        benefitsLabel: choiceCard.benefitsLabel,
        benefits,
        pill,
    };
};

const getPromoCodeFromUrl = (url: string): string | undefined => {
    try {
        const parsedUrl = new URL(url);
        return parsedUrl.searchParams.get('promoCode') ?? undefined;
    } catch {
        return undefined;
    }
};

export const getChoiceCardsSettings = (
    countryGroupId: CountryGroupId,
    channel: Channel,
    productCatalog: ProductCatalog,
    variantChoiceCardSettings?: ChoiceCardsSettings, // defined only if the test variant overrides the default settings
    cta?: Cta,
): ChoiceCardsSettings | undefined => {
    let choiceCardsSettings: ChoiceCardsSettings | undefined;
    const isoCurrency = countryGroups[countryGroupId].currency;
    const hasJunePromoCode = cta ? getPromoCodeFromUrl(cta.baseUrl) === JunePromotion.code : false;

    if (variantChoiceCardSettings) {
        // Use the overridden settings from the test variant
        choiceCardsSettings = variantChoiceCardSettings;
    } else {
        // Use the default settings
        if (channel === 'Epic') {
            choiceCardsSettings = hasJunePromoCode
                ? junePromoEpicChoiceCardsSettings(countryGroupId)
                : defaultEpicChoiceCardsSettings(countryGroupId);
        } else if (channel === 'Banner1' || channel === 'Banner2') {
            choiceCardsSettings = hasJunePromoCode
                ? junePromoBannerChoiceCardsSettings(countryGroupId)
                : defaultBannerChoiceCardsSettings(countryGroupId);
        }
    }

    const getPromotion = (choiceCard: ChoiceCard): Promotion | undefined => {
        if (!hasJunePromoCode) {
            return undefined;
        } else if (
            choiceCard.product.supportTier === 'SupporterPlus' &&
            choiceCard.product.ratePlan === JunePromotion.product.ratePlan
        ) {
            return JunePromotion;
        } else {
            return undefined;
        }
    };

    if (choiceCardsSettings) {
        // Prepare the choice cards settings for rendering
        return {
            choiceCards: choiceCardsSettings.choiceCards.map((card) =>
                enrichChoiceCard(card, isoCurrency, productCatalog, getPromotion(card)),
            ),
            mobileChoiceCards: choiceCardsSettings.mobileChoiceCards?.map((card) =>
                enrichChoiceCard(card, isoCurrency, productCatalog, getPromotion(card)),
            ),
        };
    }
    return undefined;
};
