import type { Cta } from '../../../shared/types';
import type { ProductCatalog } from '../../productCatalog';
import { JunePromotion } from '../promotions/promotions';
import { getChoiceCardsSettings } from './choiceCards';

describe('getChoiceCardsSettings', () => {
    const mockProductCatalog: ProductCatalog = {
        Contribution: {
            ratePlans: {
                Monthly: {
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

    it('returns choice cards with June promotion applied', () => {
        const cta: Cta = {
            baseUrl: `https://support.theguardian.com/contribute?promoCode=${JunePromotion.code}`,
            text: 'Support',
        };
        const variantChoiceCardSettings = undefined;

        const result = getChoiceCardsSettings(
            'UnitedStates',
            'Epic',
            mockProductCatalog,
            variantChoiceCardSettings,
            cta,
        );

        expect(result).toBeDefined();
        expect(result?.choiceCards[1].label).toEqual('Support <s>$150</s> $75/year');
        expect(result?.choiceCards[1].pill?.copy).toBe('50% off');
        expect(result?.choiceCards[1].product).toEqual({
            supportTier: 'SupporterPlus',
            ratePlan: 'Annual',
        });
    });
});
