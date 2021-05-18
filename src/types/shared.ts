import * as z from 'zod';

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

export type Audience =
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
    tickerData: tickerDataSchema,
});

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
