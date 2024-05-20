import * as z from 'zod';
import { purchaseInfoProduct, purchaseInfoUser } from '../purchaseInfo';

export type PageTracking = {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
};

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
        z.literal('SubscriptionProduct'),
    ]),
    region: z.string(),
});

export type AbandonedBasket = z.infer<typeof abandonedBasketSchema>;
