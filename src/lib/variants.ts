import { EpicTargeting } from '../components/ContributionsEpicTypes';

interface ArticlesViewedSettings {
    minViews: number;
    periodInWeeks: number;
    maxViews?: number;
}

interface MaxViews {
    maxViewsCount: number;
    maxViewsDays: number;
    minDaysBetweenViews: number;
}

enum UserCohort {
    AllExistingSupporters = 'AllExistingSupporters',
    AllNonSupporters = 'AllNonSupporters',
}

interface Cta {
    text: string;
    baseUrl: string;
}

interface Variant {
    name: string;
    heading?: string;
    paragraphs: string[];
    highlightedText?: string;
    showTicker: boolean;
    cta?: Cta;
    secondaryCta?: Cta;
    footer?: string;
    backgroundImageUrl?: string;
}

interface Test {
    name: string;
    isOn: boolean;
    locations: string[];
    tagIds: string[];
    sections: string[];
    excludedTagIds: any[];
    excludedSections: string[];
    alwaysAsk: boolean;
    maxViews?: MaxViews;
    userCohort: UserCohort;
    isLiveBlog: boolean;
    hasCountryName: boolean;
    variants: Variant[];
    highPriority: boolean;
    useLocalViewLog: boolean;
    articlesViewedSettings?: ArticlesViewedSettings;
}

export interface EpicTests {
    tests: Test[];
}

export const select = (metadata: EpicTargeting): Variant => {
    // Also need to include canRun of individual variants (only relevant for
    // manually configured tests).

    // https://github.com/guardian/frontend/blob/master/static/src/javascripts/projects/common/modules/commercial/contributions-utilities.js#L378
    /* return (
        (!initVariant.canRun || initVariant.canRun()) &&
        meetsMaxViewsConditions &&
        matchesCountryGroups &&
        matchesTagsOrSections &&
        noExcludedTags &&
        notExcludedSection &&
        copyIsValid()
    ); */

    return undefined;
};
