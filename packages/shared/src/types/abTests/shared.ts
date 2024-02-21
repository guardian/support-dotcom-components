import * as z from 'zod';
import { OphanComponentType, OphanProduct } from '../ophan';
import {
    purchaseInfoProduct,
    purchaseInfoProductSchema,
    purchaseInfoUser,
    purchaseInfoUserSchema,
} from '../purchaseInfo';

const TestStatus = ['Live', 'Draft', 'Archived'] as const;
export type TestStatus = (typeof TestStatus)[number];

export const testStatusSchema = z.enum(TestStatus);

const DeviceType = ['Mobile', 'Desktop', 'All', 'iOS', 'Android'] as const;
export type DeviceType = (typeof DeviceType)[number];
export type UserDeviceType = Exclude<DeviceType, 'Mobile' | 'All'>;

export const deviceTypeSchema = z.enum(DeviceType);

const SignedInStatus = ['SignedIn', 'SignedOut', 'All'] as const;
export type SignedInStatus = (typeof SignedInStatus)[number];

export const signedInStatusSchema = z.enum(SignedInStatus);

export interface Variant {
    name: string;
}
export interface Test<V extends Variant> {
    name: string;
    status: TestStatus;
    priority: number;
    variants: V[];
    controlProportionSettings?: ControlProportionSettings;
    deviceType?: DeviceType;
    signedInStatus?: SignedInStatus;
}

export const testSchema = z.object({
    name: z.string(),
    status: testStatusSchema,
    priority: z.number(),
    controlProportionSettings: z
        .object({
            proportion: z.number(),
            offset: z.number(),
        })
        .optional(),
    deviceType: deviceTypeSchema.optional(),
    signedInStatus: signedInStatusSchema.optional(),
});

export interface ControlProportionSettings {
    proportion: number;
    offset: number;
}

export type UserCohort =
    | 'AllExistingSupporters'
    | 'AllNonSupporters'
    | 'Everyone'
    | 'PostAskPauseSingleContributors';

export const userCohortSchema = z.enum([
    'AllExistingSupporters',
    'AllNonSupporters',
    'Everyone',
    'PostAskPauseSingleContributors',
]);

export const articlesViewedSettingsSchema = z.object({
    minViews: z.number(),
    maxViews: z.number().optional(),
    periodInWeeks: z.number(),
    tagId: z.string().optional(),
});

export interface ArticlesViewedSettings {
    minViews: number;
    maxViews?: number;
    periodInWeeks: number;
    tagId?: string;
}

/**
 * Targeting tests are for experimenting with targeting rules.
 * It is not a message test and should not affect what the user sees once they're in a test.
 * But we do need to carry the test/variant names through in the tracking.
 */
export interface TargetingAbTest {
    testName: string;
    variantName: string;
}

export type TestTracking = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId?: string;
    componentType: OphanComponentType;
    products?: OphanProduct[];
    labels?: string[];
    targetingAbTest?: TargetingAbTest;
};

export interface PurchaseInfoTest {
    userType: purchaseInfoUser[];
    product: purchaseInfoProduct[];
}

export const purchaseInfoTestSchema = z.object({
    userType: z.array(purchaseInfoUserSchema),
    product: z.array(purchaseInfoProductSchema),
});

export const pageContextTargetingSchema = z.object({
    tagIds: z.array(z.string()), // tags must include one of these
    sectionIds: z.array(z.string()), // AND section must be one of these
    excludedTagIds: z.array(z.string()), // AND tags must not include one of these
    excludedSectionIds: z.array(z.string()), // AND section must not be one of these
});

export type PageContextTargeting = z.infer<typeof pageContextTargetingSchema>;
