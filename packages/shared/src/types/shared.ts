import * as z from 'zod';
import {
    OphanComponentType,
    ophanComponentTypeSchema,
    OphanProduct,
    ophanProductSchema,
} from './ophan';
import { ChoiceCardAmounts } from './epic';

export interface Variant {
    name: string;
}
export interface Test<V extends Variant> {
    name: string;
    variants: V[];
    controlProportionSettings?: ControlProportionSettings;
}

export interface Cta {
    text: string;
    baseUrl: string;
}

export const ctaSchema = z.object({
    text: z.string(),
    baseUrl: z.string(),
});

export enum SecondaryCtaType {
    Custom = 'CustomSecondaryCta',
    ContributionsReminder = 'ContributionsReminderSecondaryCta',
}

export const secondaryCtaTypeSchema = z.enum([
    'CustomSecondaryCta',
    'ContributionsReminderSecondaryCta',
]);

interface CustomSecondaryCta {
    type: SecondaryCtaType.Custom;
    cta: Cta;
}

export const customSecondaryCtaSchema = z.object({
    type: z.literal('CustomSecondaryCta'),
    cta: ctaSchema,
});

interface ContributionsReminderSecondaryCta {
    type: SecondaryCtaType.ContributionsReminder;
}

export const contributionsReminderSecondaryCtaSchema = z.object({
    type: z.literal('ContributionsReminderSecondaryCta'),
});

export type SecondaryCta = CustomSecondaryCta | ContributionsReminderSecondaryCta;

export const secondaryCtaSchema = z.union([
    customSecondaryCtaSchema,
    contributionsReminderSecondaryCtaSchema,
]);

export type UserCohort =
    | 'AllExistingSupporters'
    | 'AllNonSupporters'
    | 'Everyone'
    | 'PostAskPauseSingleContributors';

export enum TickerEndType {
    unlimited = 'unlimited',
    hardstop = 'hardstop', // currently unsupported
}

export const tickerEndTypeSchema = z.enum(['unlimited', 'hardstop']);

export enum TickerCountType {
    money = 'money',
    people = 'people',
}

export const tickerCountTypeSchema = z.enum(['money', 'people']);

interface TickerCopy {
    countLabel: string;
    goalReachedPrimary: string;
    goalReachedSecondary: string;
}

export const tickerCopySchema = z.object({
    countLabel: z.string(),
    goalReachedPrimary: z.string(),
    goalReachedSecondary: z.string(),
});

export interface TickerData {
    total: number;
    goal: number;
}

export const tickerDataSchema = z.object({
    total: z.number(),
    goal: z.number(),
});

export interface TickerSettings {
    endType: TickerEndType;
    countType: TickerCountType;
    currencySymbol: string;
    copy: TickerCopy;
    tickerData?: TickerData;
}

export const tickerSettingsSchema = z.object({
    endType: tickerEndTypeSchema,
    countType: tickerCountTypeSchema,
    currencySymbol: z.string(),
    copy: tickerCopySchema,
    tickerData: tickerDataSchema.optional(),
});

export interface ChoiceCardSettings {
    amounts: ChoiceCardAmounts;
    currencySymbol: string;
    showChoiceCards: boolean;
}

export type WeeklyArticleLog = {
    week: number;
    count: number;
};

export type WeeklyArticleHistory = WeeklyArticleLog[];

export interface ArticlesViewedSettings {
    minViews: number;
    maxViews?: number;
    periodInWeeks: number;
}

export interface ControlProportionSettings {
    proportion: number;
    offset: number;
}

export type Stage = 'PROD' | 'CODE' | 'DEV';

export type TestTracking = {
    abTestName: string;
    abTestVariant: string;
    campaignCode: string;
    campaignId?: string;
    componentType: OphanComponentType;
    products?: OphanProduct[];
    labels?: string[];
};

export type PageTracking = {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
};

export type Tracking = TestTracking & PageTracking;

export const trackingSchema = z.object({
    abTestName: z.string(),
    abTestVariant: z.string(),
    campaignCode: z.string(),
    componentType: ophanComponentTypeSchema,
    products: z.array(ophanProductSchema).optional(),
    labels: z.array(z.string()).optional(),
    ophanPageId: z.string(),
    platformId: z.string(),
    referrerUrl: z.string(),
    clientName: z.string(),
});
