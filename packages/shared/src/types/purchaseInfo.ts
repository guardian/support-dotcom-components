import * as z from 'zod';

const purchaseInfoProduct = ['Contribution', 'SupporterPlus', 'GuardianWeekly', 'Paper'] as const;
export type purchaseInfoProduct = (typeof purchaseInfoProduct)[number];
export const purchaseInfoProductSchema = z.enum(purchaseInfoProduct);

const purchaseInfoUser = ['new', 'guest', 'current'] as const;
export type purchaseInfoUser = (typeof purchaseInfoUser)[number];
export const purchaseInfoUserSchema = z.enum(purchaseInfoUser);
