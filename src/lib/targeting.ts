import { Tag } from '../components/ContributionsWrapper';

// Content types to be considered for an Epic
const ACCEPTED_TYPES = ['Article'];

// SECTION / KEYWORD / TONE BLACKLIST
// Candidates to be abstracted into a config layer
const SECTION_BLACKLIST: string[] = [
    'football',
    'money',
    'education',
    'games',
    'teacher-network',
    'careers',
];
const KEYWORD_BLACKLIST: string[] = ['guardian-masterclasses/guardian-masterclasses'];
const TONE_BLACKLIST: string[] = [];

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
    const isNotSuitable = [shouldHideReaderRevenue, isMinuteArticle, isPaidContent].some(
        condition => condition,
    );
    return !isNotSuitable;
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
    const isSectionBlacklisted = SECTION_BLACKLIST.includes(sectionName);

    // Determine if Content matches Keyword blacklist
    const contentKeywords = tags.filter(tag => tag.type === 'Keyword').map(tag => tag.id);
    const isKeywordBlacklisted = contentKeywords.some(contentKeyword =>
        KEYWORD_BLACKLIST.includes(contentKeyword),
    );

    // Determine if Content matches Tone blacklist
    const contentTones = tags.filter(tag => tag.type === 'Tone').map(tag => tag.id);
    const isToneBlacklisted = contentTones.some(contentTone =>
        TONE_BLACKLIST.includes(contentTone),
    );

    // Epic is worthwhile if it's neither blacklisted for Section, Keyword or Tone
    return !isSectionBlacklisted && !isKeywordBlacklisted && !isToneBlacklisted;
};
