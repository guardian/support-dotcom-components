import type { OphanComponentType, OphanProduct } from '@guardian/libs';
import { z } from 'zod';
import type { purchaseInfoProduct, purchaseInfoUser } from '../purchaseInfo';
import { purchaseInfoProductSchema, purchaseInfoUserSchema } from '../purchaseInfo';

const Channel = [
    'Epic',
    'EpicAMP',
    'EpicAppleNews',
    'EpicLiveblog',
    'Banner1',
    'Banner2',
    'Header',
    'GutterLiveblog',
] as const;
export type Channel = (typeof Channel)[number];
const channelSchema = z.enum(Channel);

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

const ConsentStatus = ['HasConsented', 'HasNotConsented', 'All'] as const;
export type ConsentStatus = (typeof ConsentStatus)[number];
export const ConsentStatusSchema = z.enum(ConsentStatus);

const abTestMethodologySchema = z.object({ name: z.literal('ABTest') });
const epsilonGreedyMethodologySchema = z.object({
    name: z.literal('EpsilonGreedyBandit'),
    epsilon: z.number(),
    sampleCount: z.number().optional(),
});
const rouletteMethodologySchema = z.object({
    name: z.literal('Roulette'),
    sampleCount: z.number().optional(),
});
const methodologySchema = z.intersection(
    z.discriminatedUnion('name', [
        abTestMethodologySchema,
        epsilonGreedyMethodologySchema,
        rouletteMethodologySchema,
    ]),
    // each methodology may have an optional testName, which should be used for tracking
    z.object({ testName: z.string().optional() }),
);
export type Methodology = z.infer<typeof methodologySchema>;
export type BanditMethodology = Exclude<Methodology, { name: 'ABTest' }>;

export interface Variant {
    name: string;
}
export interface Test<V extends Variant> {
    channel: Channel;
    name: string;
    status: TestStatus;
    priority: number;
    variants: V[];
    controlProportionSettings?: ControlProportionSettings;
    deviceType?: DeviceType;
    signedInStatus?: SignedInStatus;
    consentStatus?: ConsentStatus;
    methodologies?: Methodology[];
}

export const testSchema = z.object({
    channel: channelSchema,
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
    consentStatus: ConsentStatusSchema.optional(),
    methodologies: methodologySchema.array().optional(),
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
    tagIds: z.array(z.string()).optional(),
});

export interface ArticlesViewedSettings {
    minViews: number;
    maxViews?: number;
    periodInWeeks: number;
    tagIds?: string[];
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
