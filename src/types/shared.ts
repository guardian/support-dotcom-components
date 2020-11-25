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
