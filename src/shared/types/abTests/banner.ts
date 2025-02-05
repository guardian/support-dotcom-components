import {
    BannerChannel,
    bannerContentSchema,
    ConfigurableDesign,
    separateArticleCountSchema,
    tickerSettingsSchema,
} from '../props';
import {
    articlesViewedSettingsSchema,
    pageContextTargetingSchema,
    TargetingAbTest,
    testSchema,
    userCohortSchema,
} from './shared';
import { countryGroupIdSchema, targetedRegionsSchema } from '../../lib';
import { BannerTargeting, PageTracking } from '../targeting';
import { PurchaseInfoTest } from './shared';
import { z } from 'zod';
import { OphanComponentType, OphanProduct } from '@guardian/libs';

/**
 * The `template` field decides which React component to use for a banner.
 * This field has type `BannerUi`, which is a union of `BannerDesignName` and `BannerTemplate`.
 *
 * If the type is `BannerDesignName` then the `DesignableBanner` component is used and a `designName` must be provided.
 *
 * If the type is `BannerTemplate` then it must be the name of one of a fixed set of "templates". Currently only the `SignInPromptBanner` exists.
 *
 * Note - support-admin-console (the RRCP) only allows `BannerDesignName`, but here in SDC we do support other banner components.
 */

export enum BannerTemplate {
    SignInPromptBanner = 'SignInPromptBanner',
}

export interface BannerDesignName {
    designName: string;
}

type BannerUi = BannerTemplate | BannerDesignName;

export function uiIsDesign(ui: BannerUi): ui is BannerDesignName {
    return (ui as BannerDesignName).designName !== undefined;
}

export const bannerVariantFromToolSchema = z.object({
    name: z.string(),
    tickerSettings: tickerSettingsSchema.optional(),
    template: z.union([z.nativeEnum(BannerTemplate), z.object({ designName: z.string() })]),
    bannerContent: bannerContentSchema.optional(),
    mobileBannerContent: bannerContentSchema.optional(),
    separateArticleCount: z.boolean().optional(),
    separateArticleCountSettings: separateArticleCountSchema.optional(),
});

export type BannerVariantFromTool = z.infer<typeof bannerVariantFromToolSchema>;

export interface BannerVariant extends BannerVariantFromTool {
    componentType: OphanComponentType;
    products?: OphanProduct[];
}

export type CanRun = (targeting: BannerTargeting, pageTracking: PageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant;
    moduleName: string;
    targetingAbTest?: TargetingAbTest;
}

export interface BannerTest extends BannerTestFromTool {
    bannerChannel: BannerChannel;
    isHardcoded: boolean;
    canRun?: CanRun;
    purchaseInfo?: PurchaseInfoTest;
    variants: BannerVariant[];
}

export const bannerTestFromToolSchema = testSchema.extend({
    userCohort: userCohortSchema,
    locations: z.array(countryGroupIdSchema).optional(), //deprecated
    regionTargeting: targetedRegionsSchema.optional(),
    contextTargeting: pageContextTargetingSchema,
    variants: z.array(bannerVariantFromToolSchema),
    articlesViewedSettings: articlesViewedSettingsSchema.optional(),
    deploySchedule: z
        .object({
            daysBetween: z.number(),
        })
        .optional(),
});

export type BannerTestFromTool = z.infer<typeof bannerTestFromToolSchema>;

export type BannerDesignFromTool = { name: string } & ConfigurableDesign;
