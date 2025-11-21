import type { ChoiceCardsSettings } from '../../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../../productCatalog';
import type { PromotionsCache } from '../promotions/promotions';
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
                    id: 'SupporterPlus-Monthly',
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
        DigitalSubscription: {
            ratePlans: {
                Monthly: {
                    id: 'DigitalSubscription-Monthly',
                    pricing: {
                        AUD: 30,
                        CAD: 30,
                        EUR: 20,
                        GBP: 18,
                        NZD: 30,
                        USD: 28,
                    },
                },
                Annual: {
                    id: 'DigitalSubscription-Annual',
                    pricing: {
                        AUD: 300,
                        CAD: 300,
                        EUR: 200,
                        GBP: 180,
                        NZD: 300,
                        USD: 280,
                    },
                },
            },
        },
    };

    const mockPromotionsCache: PromotionsCache = {
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

    const digitalSubscriptionMonthlyCard = {
        product: {
            supportTier: 'DigitalSubscription' as const,
            ratePlan: 'Monthly' as const,
        },
        label: '',
        isDefault: true,
        benefitsLabel: '',
        benefits: [{ copy: '' }],
        pill: {
            copy: 'Recommended',
        },
        destination: 'LandingPage' as const,
    };

    const digitalSubscriptionAnnualCard = {
        product: {
            supportTier: 'DigitalSubscription' as const,
            ratePlan: 'Annual' as const,
        },
        label: '',
        isDefault: true,
        benefitsLabel: '',
        benefits: [{ copy: '' }],
        pill: {
            copy: 'Recommended',
        },
        destination: 'LandingPage' as const,
    };

    it('returns default settings without promotion applied', () => {
        const variantChoiceCardSettings = undefined;
        const promoCodes: string[] = [];

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            mockPromotionsCache,
            promoCodes,
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $15/monthly');
        expect(result?.choiceCards[1].pill?.copy).toBe('Recommended');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Monthly',
        });
        expect(result?.choiceCards[1].destination).toEqual('LandingPage');
    });

    it('preserves custom destination when provided', () => {
        const variantChoiceCardSettings: ChoiceCardsSettings = {
            choiceCards: [
                {
                    ...defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[0],
                    destination: 'Checkout',
                },
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[1],
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[2],
            ],
        };
        const promoCodes: string[] = [];

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            mockPromotionsCache,
            promoCodes,
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[0].destination).toEqual('Checkout');
    });

    it('returns choice cards with monthly discount (PROMO_B) applied', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promoCodes: string[] = ['PROMO_B'];

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            mockPromotionsCache,
            promoCodes,
            variantChoiceCardSettings,
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
        const promoCodes: string[] = ['PROMO_A'];

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            mockPromotionsCache,
            promoCodes,
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$150</s> $105/year');
        expect(result?.choiceCards[1].pill?.copy).toBe('30% off');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Annual',
        });
    });

    it('returns DigitalSubscription choice card with correct label and product (monthly)', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        variantChoiceCardSettings.choiceCards.push(digitalSubscriptionMonthlyCard);
        const promoCodes: string[] = [];

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            {},
            promoCodes,
            variantChoiceCardSettings,
        );

        // Find DigitalSubscription Monthly card
        const dsCard = result?.choiceCards.find(
            (card) =>
                card.product.supportTier === 'DigitalSubscription' &&
                card.product.ratePlan === 'Monthly',
        );

        expect(dsCard).toBeDefined();
        expect(dsCard?.label).toContain('Support $28/monthly');
        expect(dsCard?.product).toEqual({
            supportTier: 'DigitalSubscription',
            ratePlan: 'Monthly',
        });
    });

    it('returns DigitalSubscription choice card with annual rate plan', () => {
        const variantChoiceCardSettings: ChoiceCardsSettings = {
            choiceCards: [
                ...defaultEpicChoiceCardsSettings('UnitedStates').choiceCards,
                digitalSubscriptionAnnualCard,
            ],
        };
        const promoCodes: string[] = [];

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            {},
            promoCodes,
            variantChoiceCardSettings,
        );

        const dsCard = result?.choiceCards.find(
            (card) =>
                card.product.supportTier === 'DigitalSubscription' &&
                card.product.ratePlan === 'Annual',
        );

        expect(dsCard).toBeDefined();
        expect(dsCard?.label).toContain('Support $280/year');
        expect(dsCard?.product).toEqual({
            supportTier: 'DigitalSubscription',
            ratePlan: 'Annual',
        });
    });
});
