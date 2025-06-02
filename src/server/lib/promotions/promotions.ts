import type { RatePlan } from '../../../shared/types/props/choiceCards';

export interface Promotion {
    code: string;
    discountPercent: number;
    product: {
        supportTier: 'SupporterPlus'; // The only product we support for now
        ratePlan: RatePlan;
    };
}

export const JunePromotion: Promotion = {
    code: '30OFFANNUALJUNE',
    discountPercent: 30,
    product: {
        supportTier: 'SupporterPlus',
        ratePlan: 'Annual',
    },
};
