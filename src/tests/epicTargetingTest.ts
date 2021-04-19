import { Test } from '../lib/variants';
import {
    BASE_TEST,
    HIGHLY_ENGAGED_ARTICLES_VIEWED_SETTINGS,
    LESS_ENGAGED_ARTICLES_VIEWED_SETTINGS,
    US_HIGHLY_ENGAGED_VARIANTS,
    US_LESS_ENGAGED_VARIANTS,
} from './epicTargetingTestData';

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

export const tests = [usHighlyEngaged, usLessEngaged];
