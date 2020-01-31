import { EpicTargeting, Tag } from '../components/ContributionsEpic';

// Content types allowed to be considered for an Epic
const ACCEPTED_TYPES = ['Article'];

// SECTION BLACKLIST
// No content belonging to any of these Sections should be served an Epic
const SECTION_BLACKLIST: string[] = [
    'football', // e.g. https://www.theguardian.com/football/2019/mar/27/gordon-taylor-departure-pfa-chief-executive
    'money', // e.g. https://www.theguardian.com/money/2018/dec/13/slime-toys-tested-fail-meet-eu-safety-standards-hamleys-christmas
    'education', // e.g. https://www.theguardian.com/education/2018/dec/12/female-scholars-are-marginalised-on-wikipedia-because-its-written-by-men
    'games', // e.g. https://www.theguardian.com/games/2018/dec/13/cat-condo-is-the-stupidest-most-cynical-game-in-the-app-store-so-why-cant-i-stop-playing
    'teacher-network', // e.g. https://www.theguardian.com/teacher-network/2018/jun/02/secret-teacher-teaching-children-without-play-soul-destroying-sats-assessment
    'careers', // e.g. https://www.theguardian.com/careers/2018/dec/06/dont-expect-a-survivor-to-tell-you-her-experience-of-undergoing-fgm
];

// The Tag types our targeting should perform checks against
// Others could be 'Tone', 'Publication', 'Tracking', etc.
type TagType = 'Keyword' | 'Tone';
type TagBlacklist = Record<TagType, string[]>;

// TAG BLACKLIST
// The key should be the 'Type' value of the Tag
// The value should be an array of forbidden tags of that type
const TAG_BLACKLIST: TagBlacklist = {
    Keyword: ['guardian-masterclasses/guardian-masterclasses'], // e.g. https://www.theguardian.com/guardian-masterclasses/2018/oct/25/get-healthy-and-live-your-best-life-with-dr-rangan-chatterjee-health-wellness-course
    Tone: [], // Empty blacklist for tags of type Tone, allows everything
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
    return contentTagsOfType.some(tag => TAG_BLACKLIST[tagType].includes(tag));
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

    // Determine if Content matches any of the supported Tag's blacklist
    const tagTypes = Object.keys(TAG_BLACKLIST) as TagType[];
    const isContentTagBlacklisted = tagTypes.some(tagType => isTagBlacklisted(tags, tagType));

    // Epic is worthwhile if it's neither blacklisted for Section or Tag
    return !isContentSectionBlacklisted && !isContentTagBlacklisted;
};

export const shouldRenderEpic = (targeting: EpicTargeting): boolean => {
    // Should render Epic if all conditions are met:
    // 1) The right type to be served an Epic (i.e. an Article)
    // 2) Suitable to be served an Epic (i.e. not 'sensitive' or sponsored)
    // 3) Worth it of an Epic (i.e. not blacklisted for section/tags)
    return isEpicContent(targeting) && isEpicSuitable(targeting) && isEpicWorthwhile(targeting);
};
