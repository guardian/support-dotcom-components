import type { CountryGroupId, IsoCurrency } from '../../../shared/lib';
import { countryGroups, isoCurrencyToCurrencySymbol } from '../../../shared/lib';
import type { Channel } from '../../../shared/types';
import type {
    ChoiceCard,
    ChoiceCardsSettings,
    RatePlan,
} from '../../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../../productCatalog';
import { isPromotionLive, type Promotion, type PromotionsCache } from '../promotions/promotions';
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
        return 'year';
    }
};

const getDayPriceForRatePlan = (price: number, ratePlan: string): number => {
    if (ratePlan === 'Annual') {
        return price / 365;
    }
    if (ratePlan === 'Quarterly') {
        return (price * 4) / 365;
    }
    if (ratePlan === 'Monthly') {
        return (price * 12) / 365;
    }
    return price / 7;
};

const formatPrice = (price: number): string =>
    price % 1 === 0 ? price.toString() : price.toFixed(2);

// Add pricing, currency etc
const enrichChoiceCard = (
    choiceCard: ChoiceCard,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
    promotion?: Promotion,
    isWeeklyVariant?: boolean,
): ChoiceCard => {
    const currencySymbol = isoCurrencyToCurrencySymbol[isoCurrency];

    const buildLabelForRecurringProduct = (
        ratePlan: RatePlan,
        tier: 'Contribution' | 'SupporterPlus' | 'DigitalSubscription',
    ) => {
        const basePrice = productCatalog[tier].ratePlans[ratePlan].pricing[isoCurrency];
        const price = isWeeklyVariant ? getDayPriceForRatePlan(basePrice, ratePlan) * 7 : basePrice;
        const ratePlanCopyText = isWeeklyVariant ? 'weekly' : ratePlanCopy(ratePlan);
        const formattedPrice = formatPrice(price);

        if (promotion) {
            const discount = price * (promotion.discountPercent / 100);
            const discountedPrice = price - discount;
            const formattedDiscountedPrice = formatPrice(discountedPrice);
            return `Support <s>${currencySymbol}${formattedPrice}</s> ${currencySymbol}${formattedDiscountedPrice}/${ratePlanCopyText}`;
        } else {
            return `Support ${currencySymbol}${formattedPrice}/${ratePlanCopyText}`;
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

    const benefitsLabel =
        choiceCard.benefitsLabel &&
        replaceCurrencyTemplate(choiceCard.benefitsLabel, currencySymbol);

    const buildPill = (): ChoiceCard['pill'] => {
        if (promotion) {
            return {
                copy: `${promotion.discountPercent}% off`,
                backgroundColour: choiceCard.pill?.backgroundColour ?? {
                    r: 'C7',
                    g: '00',
                    b: '00',
                    kind: 'hex',
                }, // error[400]
                textColour: choiceCard.pill?.textColour ?? {
                    r: 'FF',
                    g: 'FF',
                    b: 'FF',
                    kind: 'hex',
                }, // neutral[100]
            };
        }
        return choiceCard.pill;
    };
    const pill = buildPill();

    return {
        product: choiceCard.product,
        label,
        isDefault: choiceCard.isDefault,
        defaultExpanded: choiceCard.defaultExpanded,
        benefitsLabel,
        benefits,
        pill,
        destination: choiceCard.destination,
        destinationTest: choiceCard.destinationTest,
    };
};

export const getChoiceCardsSettings = (
    countryGroupId: CountryGroupId,
    channel: Channel,
    productCatalog: ProductCatalog,
    promotionsCache: PromotionsCache,
    promoCodes: string[],
    variantChoiceCardSettings?: ChoiceCardsSettings, // defined only if the test variant overrides the default settings
    forceNoDefault?: boolean,
    forceExpanded?: boolean,
    isWeeklyVariant?: boolean,
): ChoiceCardsSettings | undefined => {
    let choiceCardsSettings: ChoiceCardsSettings | undefined;
    const isoCurrency = countryGroups[countryGroupId].currency;
    const promotions = promoCodes
        .map((code) => promotionsCache[code])
        .filter((promo): promo is Promotion => Boolean(promo) && isPromotionLive(promo));

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

    const getPromotion = (choiceCard: ChoiceCard): Promotion | undefined => {
        // We only support promos for SupporterPlus for now
        if (promotions.length > 0 && choiceCard.product.supportTier === 'SupporterPlus') {
            const { ratePlan } = choiceCard.product;
            const choiceCardProduct = productCatalog['SupporterPlus'].ratePlans[ratePlan];
            // Find a promo with a matching productRatePlanId
            return promotions.find((promo) =>
                promo.productRatePlanIds.includes(choiceCardProduct.id),
            );
        }
        return undefined;
    };

    const maybeForceCardSettings = (card: ChoiceCard): ChoiceCard => {
        if (forceNoDefault || forceExpanded) {
            return {
                ...card,
                isDefault: forceNoDefault ? false : card.isDefault,
                defaultExpanded: forceExpanded ? true : card.defaultExpanded,
            };
        }
        return card;
    };

    if (choiceCardsSettings) {
        // Prepare the choice cards settings for rendering
        return {
            choiceCards: choiceCardsSettings.choiceCards.map((card) =>
                maybeForceCardSettings(
                    enrichChoiceCard(
                        card,
                        isoCurrency,
                        productCatalog,
                        getPromotion(card),
                        isWeeklyVariant,
                    ),
                ),
            ),
            mobileChoiceCards: choiceCardsSettings.mobileChoiceCards?.map((card) =>
                maybeForceCardSettings(
                    enrichChoiceCard(
                        card,
                        isoCurrency,
                        productCatalog,
                        getPromotion(card),
                        isWeeklyVariant,
                    ),
                ),
            ),
        };
    }
    return undefined;
};
