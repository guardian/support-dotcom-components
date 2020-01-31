import { EpicTargeting, Tag } from '../components/ContributionsEpic';

// Content types to be considered for an Epic
const ACCEPTED_TYPES = ['Article'];

// SECTION / TAG BLACKLIST
// Candidates to be abstracted into a config layer
const SECTION_BLACKLIST: string[] = [
    'football',
    'money',
    'education',
    'games',
    'teacher-network',
    'careers',
];

// The types of tag our targeting checks support
// Others could be 'Tone', 'Publication', 'Tracking', etc.
type TagType = 'Keyword';

interface TagList {
    Keyword: string[];
}

const TAG_BLACKLIST: TagList = {
    Keyword: ['guardian-masterclasses/guardian-masterclasses'],
};

// Determine if it's the right type of content to be considered for an Epic
export const isEpicContent = ({ contentType }: { contentType: string }): boolean => {
    return ACCEPTED_TYPES.includes(contentType);
};

// Determine if the content is suitable for an Epic
export const isEpicSuitable = ({
    shouldHideReaderRevenue,
    isMinuteArticle,
    isPaidContent,
}: {
    shouldHideReaderRevenue: boolean;
    isMinuteArticle: boolean;
    isPaidContent: boolean;
}): boolean => {
    const foundUnmetCondition = [shouldHideReaderRevenue, isMinuteArticle, isPaidContent].some(
        condition => condition,
    );
    return !foundUnmetCondition;
};

const isSectionBlacklisted = (sectionName: string): boolean => {
    return SECTION_BLACKLIST.includes(sectionName);
};

// Given an array of tags and the type of tag we want to check against,
// this functions returns true if the list of tags includes at least one blacklisted tag of that type
const isTagBlacklisted = (tags: Tag[], tagType: TagType): boolean => {
    const contentTagsOfType = tags.filter(tag => tag.type === tagType).map(tag => tag.id);
    const isTagBlacklisted = contentTagsOfType.some(tag => TAG_BLACKLIST[tagType].includes(tag));

    return isTagBlacklisted;
};

// Determine if the content isn't blacklisted for Section, Keyword or Tone
export const isEpicWorthwhile = ({
    sectionName,
    tags,
}: {
    sectionName: string;
    tags: Tag[];
}): boolean => {
    // Determine if Content matches Section blacklist
    const isContentSectionBlacklisted = isSectionBlacklisted(sectionName);

    // Determine if Content matches Keyword blacklist
    const isContentKeywordBlacklisted = isTagBlacklisted(tags, 'Keyword');

    // Epic is worthwhile if it's neither blacklisted for Section, Keyword or Tone
    return !isContentSectionBlacklisted && !isContentKeywordBlacklisted;
};

export const shouldRenderEpic = (targeting: EpicTargeting): boolean => {
    // Should render Epic if all conditions are met:
    // 1) The right type to be served an Epic (i.e. an Article)
    // 2) Suitable to be served an Epic (i.e. not 'sensitive' or sponsored)
    // 3) Worth it of an Epic (i.e. not blacklisted for section/tags)
    return isEpicContent(targeting) && isEpicSuitable(targeting) && isEpicWorthwhile(targeting);
};
