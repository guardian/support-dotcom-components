import type { Cta } from '../../../shared/types';
import type { ChoiceCardsSettings } from '../../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../../productCatalog';
import type { PromotionsMap } from '../promotions/promotions';
import { getChoiceCardsSettings } from './choiceCards';
import { defaultEpicChoiceCardsSettings } from './defaultChoiceCardSettings';

describe('getChoiceCardsSettings', () => {
    const mockProductCatalog: ProductCatalog = {
        Contribution: {
            ratePlans: {
                Monthly: {
                    id: 'Contribution-Monthly',
                    pricing: {
                        USD: 60,
                        NZD: 60,
                        EUR: 60,
                        GBP: 60,
                        CAD: 5,
                        AUD: 100,
                    },
                },
                Annual: {
                    id: 'Contribution-Annual',
                    pricing: {
                        USD: 60,
                        NZD: 60,
                        EUR: 60,
                        GBP: 60,
                        CAD: 5,
                        AUD: 100,
                    },
                },
            },
        },
        SupporterPlus: {
            ratePlans: {
                Monthly: {
                    id: 'SupporterPlus-Annual',
                    pricing: {
                        USD: 15,
                        NZD: 20,
                        EUR: 12,
                        GBP: 12,
                        CAD: 15,
                        AUD: 20,
                    },
                },
                Annual: {
                    id: 'SupporterPlus-Annual',
                    pricing: {
                        USD: 150,
                        NZD: 200,
                        EUR: 120,
                        GBP: 120,
                        CAD: 150,
                        AUD: 200,
                    },
                },
            },
        },
    };

    const promotionsMap: PromotionsMap = {
        PROMO_A: {
            promoCode: 'PROMO_A',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Annual.id],
            discountPercent: 30,
        },
        PROMO_B: {
            promoCode: 'PROMO_B',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            discountPercent: 40,
        },
    };

    it('returns default settings without promotion applied', () => {
        const cta: Cta = {
            baseUrl: `https://support.theguardian.com/contribute`,
            text: 'Support',
        };

        const variantChoiceCardSettings = undefined;

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            promotionsMap,
            variantChoiceCardSettings,
            cta,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $15/monthly');
        expect(result?.choiceCards[1].pill?.copy).toBe('Recommended');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Monthly',
        });
    });

    it('returns choice cards with monthly discount (PROMO_B) applied', () => {
        const cta: Cta = {
            baseUrl: `https://support.theguardian.com/contribute?promoCode=PROMO_B`,
            text: 'Support',
        };

        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            promotionsMap,
            variantChoiceCardSettings,
            cta,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $9/monthly');
        expect(result?.choiceCards[1].pill?.copy).toBe('40% off');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Monthly',
        });
    });

    it('returns choice cards with annual discount (PROMO_A) applied', () => {
        const cta: Cta = {
            baseUrl: `https://support.theguardian.com/contribute?promoCode=PROMO_A`,
            text: 'Support',
        };

        // Make the SupporterPlus choice card ratePlan Annual
        const variantChoiceCardSettings: ChoiceCardsSettings = {
            choiceCards: [
                defaultEpicChoiceCardsSettings('GBPCountries').choiceCards[0],
                {
                    ...defaultEpicChoiceCardsSettings('GBPCountries').choiceCards[1],
                    product: {
                        ratePlan: 'Annual',
                        supportTier: 'SupporterPlus',
                    },
                },
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[2],
            ],
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            promotionsMap,
            variantChoiceCardSettings,
            cta,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$150</s> $105/year');
        expect(result?.choiceCards[1].pill?.copy).toBe('30% off');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Annual',
        });
    });
});
