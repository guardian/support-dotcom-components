export interface PageTracking {
    ophanPageId: string;
    platformId: string;
    referrerUrl: string;
    clientName: string;
}

export interface TagCounts {
    [tag: string]: number;
}

export interface WeeklyArticleLog {
    week: number;
    count: number;
    tags?: TagCounts;
}

export type WeeklyArticleHistory = WeeklyArticleLog[];

export interface DailyArticleLog {
    day: number;
    count: number;
}

export type DailyArticleHistory = DailyArticleLog[];

/**
 * This interface is duplicated from the @guardian/libs definition of StorageFactory. This is to avoid adding the
 * whole library as a dependency.
 */
export interface LocalStorage {
    set(key: string, value: unknown): void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    get(key: string): any;
}
