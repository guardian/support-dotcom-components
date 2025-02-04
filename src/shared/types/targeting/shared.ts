import { z } from 'zod';
import { purchaseInfoProduct, purchaseInfoUser } from '../purchaseInfo';

export type TagCounts = {
    [tag: string]: number;
};

export type WeeklyArticleLog = {
    week: number;
    count: number;
    tags?: TagCounts;
};

export type WeeklyArticleHistory = WeeklyArticleLog[];

/**
 * This interface is duplicated from the @guardian/libs definition of StorageFactory. This is to avoid adding the
 * whole library as a dependency.
 */
export interface LocalStorage {
    set(key: string, value: unknown): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(key: string): any;
}

export interface PurchaseInfo {
    userType: purchaseInfoUser;
    product: purchaseInfoProduct;
}

export const abandonedBasketSchema = z.object({
    amount: z.union([z.number(), z.literal('other')]),
    billingPeriod: z.union([z.literal('ONE_OFF'), z.literal('MONTHLY'), z.literal('ANNUAL')]),
    product: z.union([
        z.literal('Contribution'),
        z.literal('SupporterPlus'),
        z.literal('PremiumTier'),
        z.literal('DailyEdition'),
        z.literal('GuardianWeekly'),
        z.literal('Paper'),
        z.literal('PaperAndDigital'),
    ]),
    //values for region should match allowable values for supportInternationalisationId in
    //support-frontend/assets/helpers/internationalisation/countryGroup.ts
    region: z.union([
        z.literal('uk'),
        z.literal('us'),
        z.literal('au'),
        z.literal('eu'),
        z.literal('int'),
        z.literal('nz'),
        z.literal('ca'),
    ]),
});

export type AbandonedBasket = z.infer<typeof abandonedBasketSchema>;
