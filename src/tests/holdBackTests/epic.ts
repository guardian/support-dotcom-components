import { Test, Variant } from '../../lib/variants';

export const EpicHoldBackVariant: Variant = {
    name: 'CONTROL',
    heading: '',
    paragraphs: [],
    highlightedText: '',
};

export const EpicHoldBackTest: Test = {
    name: 'EpicHoldBack',
    isOn: true,
    locations: [],
    tagIds: [],
    sections: [],
    excludedTagIds: [],
    excludedSections: [],
    alwaysAsk: false,
    userCohort: 'AllNonSupporters',
    isLiveBlog: false,
    hasCountryName: false,
    variants: [EpicHoldBackVariant],
    highPriority: false,
    useLocalViewLog: false,
};
