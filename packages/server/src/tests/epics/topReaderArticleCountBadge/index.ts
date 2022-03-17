import { buildTest } from './build';
import { EU_ROW_COPY, UK_AUS_COPY, US_COPY } from './copy';

export const tests = [
    buildTest({ suffix: 'UK_AUS', locations: ['GBPCountries', 'AUDCountries'], copy: UK_AUS_COPY }),
    buildTest({
        suffix: 'EU_ROW',
        locations: ['EURCountries', 'Canada', 'NZDCountries', 'International'],
        copy: EU_ROW_COPY,
    }),
    buildTest({ suffix: 'US', locations: ['UnitedStates'], copy: US_COPY }),
];
