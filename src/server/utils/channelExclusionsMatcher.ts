import type {
    BannerTargeting,
    EpicTargeting,
    GutterTargeting,
    HeaderTargeting,
} from '../../shared/types';
import type { DateRange, ExclusionRule, ExclusionSettings } from '../channelExclusions';

type ExclusionChannel = keyof ExclusionSettings;

interface TargetingByChannel {
    banner: BannerTargeting;
    epic: EpicTargeting;
    gutterAsk: GutterTargeting;
    header: HeaderTargeting;
}

const toIsoDate = (date: Date): string => date.toISOString().slice(0, 10);

const inDateRange = (date: string, range: DateRange): boolean =>
    date >= range.start && date <= range.end;

const getSectionId = (targeting: TargetingByChannel[ExclusionChannel]): string | undefined => {
    if ('sectionId' in targeting) {
        return targeting.sectionId;
    }
};

const getTagIds = (targeting: TargetingByChannel[ExclusionChannel]): string[] => {
    if ('tagIds' in targeting) {
        return targeting.tagIds ?? [];
    }
    if ('tags' in targeting) {
        return targeting.tags.map(({ id }) => id);
    }
    return [];
};

const getContentType = (targeting: TargetingByChannel[ExclusionChannel]): 'Fronts' | 'Articles' =>
    'isFront' in targeting && targeting.isFront ? 'Fronts' : 'Articles';

const matchesRule = (
    targeting: TargetingByChannel[ExclusionChannel],
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

export const inExclusions = <T extends ExclusionChannel>(
    targeting: TargetingByChannel[T],
    exclusionSettings?: ExclusionSettings[T],
): boolean => {
    const rules = exclusionSettings?.rules;
    if (!rules?.length) {
        return false;
    }
    return rules.some((rule) => matchesRule(targeting, rule));
};
