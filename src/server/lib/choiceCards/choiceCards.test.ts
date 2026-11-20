import type { ChoiceCardsSettings } from '../../../shared/types/props/choiceCards';
import type { DefaultChoiceCardSettings } from '../../defaultChoiceCardSettings';
import type { ProductCatalog } from '../../productCatalog';
import {
    getPromotionsForCountry,
    mapTableItemToPromotion,
    type Promotion,
} from '../promotions/promotions';
import { getChoiceCardsSettings } from './choiceCards';
import { defaultEpicChoiceCardsSettings } from './defaultChoiceCardSettings';

const now = new Date();
const futureDate = new Date(now.getTime() + 24 * 60 * 60 * 1000 * 30).toISOString(); // 30 days from now
const pastDate = new Date(now.getTime() - 24 * 60 * 60 * 1000 * 30).toISOString(); // 30 days ago

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

    const mockPromotions = {
        PROMO_A: {
            promoCode: 'PROMO_A',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Annual.id],
            countries: ['US', 'GB'],
            discountPercent: 35,
        },
        PROMO_B: {
            promoCode: 'PROMO_B',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US', 'GB'],
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

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $15/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('Recommended');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Monthly',
        });
        expect(result?.choiceCards[1].destination).toEqual('LandingPage');
    });

    it('only expands the default choice card when forceExpanded is enabled', () => {
        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
            defaultEpicChoiceCardsSettings('UnitedStates'),
            undefined,
            true,
        );

        expect(result?.choiceCards.map((card) => card.defaultExpanded)).toEqual([
            false,
            true,
            false,
        ]);
    });

    it.each(['Epic', 'Banner1', 'Banner2'] as const)(
        'uses singular month wording for %s choice cards',
        (channel) => {
            const result = getChoiceCardsSettings(
                'UnitedStates',
                channel,
                mockProductCatalog,
                [],
                undefined,
            );

            expect(result?.choiceCards[1].label).toEqual('Support $15/month');
        },
    );

    it('uses S3 Default settings when the country group has no choice cards', () => {
        const defaultSettings: DefaultChoiceCardSettings = {
            epic: {
                Default: defaultEpicChoiceCardsSettings('GBPCountries'),
                EURCountries: { choiceCards: [] },
            },
        };

        const result = getChoiceCardsSettings(
            'EURCountries',
            'Epic',
            mockProductCatalog,
            [],
            undefined,
            undefined,
            undefined,
            undefined,
            { get: () => defaultSettings },
        );

        expect(result?.choiceCards).toHaveLength(3);
        expect(result?.choiceCards[1].benefits).toHaveLength(5);
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

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[0].destination).toEqual('Checkout');
    });

    it('preserves destination test when provided', () => {
        const variantChoiceCardSettings: ChoiceCardsSettings = {
            choiceCards: [
                {
                    ...defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[0],
                    destinationTest: {
                        testName: 'dest_test',
                        variantName: 'checkout_variant',
                    },
                },
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[1],
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[2],
            ],
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[0].destinationTest).toEqual({
            testName: 'dest_test',
            variantName: 'checkout_variant',
        });
    });

    it('returns choice cards with monthly discount (PROMO_B) applied', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [mockPromotions.PROMO_B],
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $9/month');
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

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [mockPromotions.PROMO_A],
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$150</s> $97.50/year');
        expect(result?.choiceCards[1].pill?.copy).toBe('35% off');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Annual',
        });
    });

    it('returns DigitalSubscription choice card with correct label and product (monthly)', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        variantChoiceCardSettings.choiceCards.push(digitalSubscriptionMonthlyCard);

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
            variantChoiceCardSettings,
        );

        // Find DigitalSubscription Monthly card
        const dsCard = result?.choiceCards.find(
            (card) =>
                card.product.supportTier === 'DigitalSubscription' &&
                card.product.ratePlan === 'Monthly',
        );

        expect(dsCard).toBeDefined();
        expect(dsCard?.label).toContain('Support $28/month');
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

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
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

    it('returns weekly price for monthly rate plan when weekly variant is enabled', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [],
            variantChoiceCardSettings,
            undefined,
            undefined,
            true,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $3.45/week');
    });

    it('returns weekly price for annual rate plan when weekly variant is enabled', () => {
        const variantChoiceCardSettings: ChoiceCardsSettings = {
            choiceCards: [
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[0],
                {
                    ...defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[1],
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
            [],
            variantChoiceCardSettings,
            undefined,
            undefined,
            true,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $2.88/week');
    });

    it('returns weekly price with monthly discount (PROMO_B) applied when weekly variant is enabled', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            [mockPromotions.PROMO_B],
            variantChoiceCardSettings,
            undefined,
            undefined,
            true,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$3.45</s> $2.07/week');
        expect(result?.choiceCards[1].pill?.copy).toBe('40% off');
    });

    it('returns weekly price and discount for annual rate plan when weekly variant is enabled', () => {
        const variantChoiceCardSettings: ChoiceCardsSettings = {
            choiceCards: [
                defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[0],
                {
                    ...defaultEpicChoiceCardsSettings('UnitedStates').choiceCards[1],
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
            [mockPromotions.PROMO_A],
            variantChoiceCardSettings,
            undefined,
            undefined,
            true,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$2.88</s> $1.87/week');
    });

    it('does not apply discount for promo with future start date', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_FUTURE',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 40,
            startTimestamp: futureDate,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        // Should show full price without discount since promo hasn't started yet
        expect(result?.choiceCards[1].label).toEqual('Support $15/month');
        // Should not show the discount pill (e.g., "40% off")
        expect(result?.choiceCards[1].pill?.copy).not.toBe('40% off');
    });

    it('does not apply discount for promo with past end date', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_EXPIRED',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 40,
            endTimestamp: pastDate,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        // Should show full price without discount since promo has expired
        expect(result?.choiceCards[1].label).toEqual('Support $15/month');
        // Should not show the discount pill (e.g., "40% off")
        expect(result?.choiceCards[1].pill?.copy).not.toBe('40% off');
    });

    it('applies discount for promo with no dates (always live)', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_NO_DATES',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 40,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        // Should show discounted price since promo has no date restrictions
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $9/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('40% off');
    });

    it('applies a discount for a an introductory pricing offer promo but does not show the original price', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_INTRO_OFFER',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 40,
            isIntroductoryPricing: true,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $9/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('Recommended');
    });

    it('correctly rounds discounted prices with tiny fractions to in integer', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_INTRO_OFFER',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 40.001, // This results in a non integer price, but rounds to $9.
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $9/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('40% off');
    });

    it('correctly renders non-integer discounted prices', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_INTRO_OFFER',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 50,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $7.50/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('50% off');
    });

    it('does not apply discount for a promotion targeting another country', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_GB_ONLY',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['GB'],
            discountPercent: 40,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support $15/month');
        expect(result?.choiceCards[1].pill?.copy).not.toBe('40% off');
    });

    it('applies discount for a promotion targeting the reader’s country', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_US',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: ['US'],
            discountPercent: 40,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $9/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('40% off');
    });

    it('applies discount for an unrestricted legacy promotion', () => {
        const variantChoiceCardSettings = defaultEpicChoiceCardsSettings('UnitedStates');
        const promotion: Promotion = {
            promoCode: 'PROMO_ALL',
            productRatePlanIds: [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id],
            countries: null,
            discountPercent: 40,
        };

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            getPromotionsForCountry(
                [promotion.promoCode],
                { [promotion.promoCode]: promotion },
                'US',
            ),
            variantChoiceCardSettings,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$15</s> $9/month');
        expect(result?.choiceCards[1].pill?.copy).toBe('40% off');
    });

    it('uses the French promotion even when the international promotion is listed first', () => {
        const productRatePlanIds = [mockProductCatalog.SupporterPlus.ratePlans.Monthly.id];
        const promotions = {
            ROW_OFFER: mapTableItemToPromotion({
                promoCode: 'ROW_OFFER',
                discount: { amount: 25 },
                appliesTo: { productRatePlanIds, countries: ['US', 'AM', 'TR'] },
            }),
            EU_OFFER: mapTableItemToPromotion({
                promoCode: 'EU_OFFER',
                discount: { amount: 50 },
                appliesTo: { productRatePlanIds, countryGroups: ['eu'] },
            }),
        };
        const applicablePromotions = getPromotionsForCountry(
            Object.keys(promotions),
            promotions,
            'FR',
        );
        const result = getChoiceCardsSettings(
            'EURCountries',
            'Banner1',
            mockProductCatalog,
            applicablePromotions,
        );

        expect(applicablePromotions.map((promo) => promo.promoCode)).toEqual(['EU_OFFER']);
        expect(result?.choiceCards[1].label).toBe('Support <s>€12</s> €6/month');
    });

    it('limits a group promotion to its configured countries and preserves explicit exceptions', () => {
        const promotion = mapTableItemToPromotion({
            promoCode: 'REGIONAL_OFFER',
            appliesTo: {
                productRatePlanIds: [],
                countryGroups: ['ukm'],
                countries: ['FR'],
            },
        });
        const cache = { REGIONAL_OFFER: promotion };
        const codes = ['REGIONAL_OFFER'];

        expect(getPromotionsForCountry(codes, cache, 'GB')).toHaveLength(1);
        expect(getPromotionsForCountry(codes, cache, 'FR')).toHaveLength(1);
        expect(getPromotionsForCountry(codes, cache, 'JE')).toHaveLength(0);
    });

    it('keeps legacy empty country lists unrestricted and empty group lists ineligible', () => {
        const promoCode = 'REGIONAL_OFFER';
        const productRatePlanIds: string[] = [];
        const legacy = mapTableItemToPromotion({
            promoCode,
            appliesTo: { productRatePlanIds, countries: [] },
        });
        const groups = mapTableItemToPromotion({
            promoCode,
            appliesTo: { productRatePlanIds, countryGroups: [] },
        });

        expect(getPromotionsForCountry([promoCode], { [promoCode]: legacy }, 'FR')).toHaveLength(1);
        expect(getPromotionsForCountry([promoCode], { [promoCode]: groups }, 'FR')).toHaveLength(0);
    });
});
