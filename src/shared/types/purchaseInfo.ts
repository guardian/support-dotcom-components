import { z } from 'zod';

const purchaseInfoProduct = ['Contribution', 'SupporterPlus', 'GuardianWeekly', 'Paper'] as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- model predates linting rule
export type purchaseInfoProduct = (typeof purchaseInfoProduct)[number];
export const purchaseInfoProductSchema = z.enum(purchaseInfoProduct);

const purchaseInfoUser = ['new', 'guest', 'current'] as const;
// eslint-disable-next-line @typescript-eslint/naming-convention -- model predates linting rule
export type purchaseInfoUser = (typeof purchaseInfoUser)[number];
export const purchaseInfoUserSchema = z.enum(purchaseInfoUser);
