import React from 'react';
import { EpicTargeting, Tag } from './ContributionsEpic';

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

// Determine if it's the right type of content to be considered for an epic
const isEpicContent = ({ contentType }: { contentType: string }): boolean => {
    const acceptedTypes = ['Article'];
    return acceptedTypes.includes(contentType);
};

// Determine if the content is suitable for an epic
const isEpicSuitable = ({
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
const isEpicWorthwhile = ({ sectionName, tags }: { sectionName: string; tags: Tag[] }): boolean => {
    console.log('=========================================');
    console.log('===> sectionName: ', sectionName);
    // Determine Section blacklist
    const isSectionBlacklisted = SECTION_BLACKLIST.includes(sectionName);

    // Determine Keyword blacklist
    const contentKeywords = tags.filter(tag => tag.type === 'Keyword').map(tag => tag.id);
    console.log('===> contentKeywords:');
    console.log(contentKeywords);
    const isKeywordBlacklisted = contentKeywords.some(contentKeyword =>
        KEYWORD_BLACKLIST.includes(contentKeyword),
    );

    // Determine Tone blacklist
    const contentTones = tags.filter(tag => tag.type === 'Tone').map(tag => tag.id);
    console.log('===> contentTones:');
    console.log(contentTones);
    const isToneBlacklisted = contentTones.some(contentTone =>
        TONE_BLACKLIST.includes(contentTone),
    );

    console.log('isSectionBlacklisted: ', isSectionBlacklisted);
    console.log('isKeywordBlacklisted: ', isKeywordBlacklisted);
    console.log('isToneBlacklisted: ', isToneBlacklisted);
    // Epic is worthwhile if it's neither blacklisted for Section, Keyword or Tone
    return !isSectionBlacklisted && !isKeywordBlacklisted && !isToneBlacklisted;
};

type Props = {
    children: JSX.Element;
    targeting: EpicTargeting;
};

export const ContributionsWrapper: React.FC<Props> = ({ children, targeting }: Props) => {
    // Render children (i.e. Epic) if all conditions are met
    if (isEpicContent(targeting) && isEpicSuitable(targeting) && isEpicWorthwhile(targeting)) {
        return children;
    }

    // Otherwise, don't render anything
    return null;
};
