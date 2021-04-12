import { Test } from '../lib/variants';
import {
    BASE_TEST,
    EU_ROW_HIGHLY_ENGAGED_VARIANTS,
    EU_ROW_LESS_ENGAGED_VARIANTS,
    HIGHLY_ENGAGED_ARTICLES_VIEWED_SETTINGS,
    LESS_ENGAGED_ARTICLES_VIEWED_SETTINGS,
    UK_AUS_HIGHLY_ENGAGED_VARIANTS,
    UK_AUS_LESS_ENGAGED_VARIANTS,
    US_HIGHLY_ENGAGED_VARIANTS,
    US_LESS_ENGAGED_VARIANTS,
} from './epicTargetingTestData';

// ---- UK + AUS ---- //

const ukAusHighlyEngaged: Test = {
    ...BASE_TEST,
    name: 'EpicTargetingHighlyEngagedTest__UkAus',
    locations: ['GBPCountries', 'AUDCountries'],
    variants: UK_AUS_HIGHLY_ENGAGED_VARIANTS,
    articlesViewedSettings: HIGHLY_ENGAGED_ARTICLES_VIEWED_SETTINGS,
};

const ukAusLessEngaged: Test = {
    ...BASE_TEST,
    name: 'EpicTargetingLessEngagedTest__UkAus',
    locations: ['GBPCountries', 'AUDCountries'],
    variants: UK_AUS_LESS_ENGAGED_VARIANTS,
    articlesViewedSettings: LESS_ENGAGED_ARTICLES_VIEWED_SETTINGS,
};

// ---- US ---- //

const usHighlyEngaged: Test = {
    ...BASE_TEST,
    name: 'EpicTargetingHighlyEngagedTest__Us',
    locations: ['UnitedStates'],
    variants: US_HIGHLY_ENGAGED_VARIANTS,
    articlesViewedSettings: HIGHLY_ENGAGED_ARTICLES_VIEWED_SETTINGS,
};

const usLessEngaged: Test = {
    ...BASE_TEST,
    name: 'EpicTargetingLessEngagedTest__Us',
    locations: ['UnitedStates'],
    variants: US_LESS_ENGAGED_VARIANTS,
    articlesViewedSettings: LESS_ENGAGED_ARTICLES_VIEWED_SETTINGS,
};

// ---- EU + ROW ---- //

const euRowHighlyEngaged: Test = {
    ...BASE_TEST,
    name: 'EpicTargetingHighlyEngagedTest__EuRow',
    locations: ['EURCountries', 'Canada', 'NZDCountries', 'International'],
    variants: EU_ROW_HIGHLY_ENGAGED_VARIANTS,
    articlesViewedSettings: HIGHLY_ENGAGED_ARTICLES_VIEWED_SETTINGS,
};

const euRowLessEngaged: Test = {
    ...BASE_TEST,
    name: 'EpicTargetingLessEngagedTest__EuRow',
    locations: ['EURCountries', 'Canada', 'NZDCountries', 'International'],
    variants: EU_ROW_LESS_ENGAGED_VARIANTS,
    articlesViewedSettings: LESS_ENGAGED_ARTICLES_VIEWED_SETTINGS,
};

export const tests = [
    ukAusHighlyEngaged,
    ukAusLessEngaged,
    usHighlyEngaged,
    usLessEngaged,
    euRowHighlyEngaged,
    euRowLessEngaged,
];
