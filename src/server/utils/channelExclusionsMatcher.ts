import type { ChannelExclusions, DateRange, ExclusionRule } from '../channelExclusions';
import { pageContextMatches } from '../lib/targeting';

export interface Targeting {
    tagIds?: string[];
    sectionId?: string;
    contentType?: string;
}

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

const inDateRange = (date: string, range: DateRange): boolean =>
    date >= range.start && date <= range.end;

const getSectionId = (targeting: Targeting): string | undefined => {
    if ('sectionId' in targeting) {
        return targeting.sectionId;
    }
};

const getTagIds = (targeting: Targeting): string[] => {
    if ('tagIds' in targeting) {
        return targeting.tagIds ?? [];
    }
    return [];
};

const FRONT_CONTENT_TYPES = ['Network Front', 'Section'];

const getContentType = (targeting: Targeting): 'Fronts' | 'Articles' => {
    const contentType = 'contentType' in targeting ? targeting.contentType : undefined;
    return contentType && FRONT_CONTENT_TYPES.includes(contentType) ? 'Fronts' : 'Articles';
};

const matchesRule = (targeting: Targeting, rule: ExclusionRule): boolean => {
    const now = new Date();
    const currentDate = toIsoDate(now);
    const sectionId = getSectionId(targeting)?.toLowerCase();
    const tagIds = getTagIds(targeting).map((tagId) => tagId.toLowerCase());
    const contentType = getContentType(targeting);

    const hasMatchingSectionOrTag = pageContextMatches(
        {
            sectionId,
            tagIds,
        },
        {
            sectionIds: (rule.sectionIds ?? []).map((id) => id.toLowerCase()),
            tagIds: (rule.tagIds ?? []).map((id) => id.toLowerCase()),
            excludedTagIds: [],
            excludedSectionIds: [],
        },
    );

    if (!hasMatchingSectionOrTag) {
        return false;
    }

    if (rule.dateRange && !inDateRange(currentDate, rule.dateRange)) {
        return false;
    }

    if (rule.contentTypes?.length) {
        if (!rule.contentTypes.includes(contentType)) {
            return false;
        }
    }

    return true;
};

export const inExclusions = (
    targeting: Targeting,
    exclusionSettings?: ChannelExclusions,
): boolean => {
    const rules = exclusionSettings?.rules;
    if (!rules?.length) {
        return false;
    }
    return rules.some((rule) => matchesRule(targeting, rule));
};
