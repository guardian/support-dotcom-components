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
import { countryGroupIdSchema } from '../../lib';
import { BannerTargeting, PageTracking } from '../targeting';
import { PurchaseInfoTest } from './shared';
import * as z from 'zod';
import { OphanComponentType, OphanProduct } from '@guardian/libs';

export enum BannerTemplate {
    ContributionsBanner = 'ContributionsBanner',
    ContributionsBannerWithSignIn = 'ContributionsBannerWithSignIn',
    EnvironmentBanner = 'EnvironmentBanner',
    SignInPromptBanner = 'SignInPromptBanner',
    WorldPressFreedomDayBanner = 'WorldPressFreedomDayBanner',
    EuropeMomentLocalLanguageBanner = 'EuropeMomentLocalLanguageBanner',
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
    modulePathBuilder: (version?: string) => string;
    componentType: OphanComponentType;
    products?: OphanProduct[];
}

export type CanRun = (targeting: BannerTargeting, pageTracking: PageTracking) => boolean;

export type BannerTestGenerator = () => Promise<BannerTest[]>;

// The result of selecting a test+variant for a user
export interface BannerTestSelection {
    test: BannerTest;
    variant: BannerVariant;
    moduleUrl: string;
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
    locations: z.array(countryGroupIdSchema),
    contextTargeting: pageContextTargetingSchema,
    variants: z.array(bannerVariantFromToolSchema),
    articlesViewedSettings: articlesViewedSettingsSchema.optional(),
});

export type BannerTestFromTool = z.infer<typeof bannerTestFromToolSchema>;

export type BannerDesignFromTool = { name: string } & ConfigurableDesign;
