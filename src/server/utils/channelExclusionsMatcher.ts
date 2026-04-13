import type { ChannelExclusions, DateRange, ExclusionRule } from '../channelExclusions';

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

const matchesRule = (
    targeting: Targeting,
    rule: ExclusionRule,
): boolean => {
    const now = new Date();
    const currentDate = toIsoDate(now);
    const sectionId = getSectionId(targeting)?.toLowerCase();
    const tagIds = new Set(getTagIds(targeting).map((tagId) => tagId.toLowerCase()));
    const contentType = getContentType(targeting);

    if (rule.sectionIds?.length) {
        if (!sectionId) {
            return false;
        }
        const hasSection = rule.sectionIds.some((id) => id.toLowerCase() === sectionId);
        if (!hasSection) {
            return false;
        }
    }

    if (rule.tagIds?.length) {
        const hasTag = rule.tagIds.some((id) => tagIds.has(id.toLowerCase()));
        if (!hasTag) {
            return false;
        }
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
