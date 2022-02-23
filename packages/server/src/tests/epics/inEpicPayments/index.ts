import { buildTest, buildTopReaderTest } from './build';
import { EU_ROW, EU_ROW_TOP_READER, UK_AUS, UK_AUS_TOP_READER, US, US_TOP_READER } from './copy';

export const tests = [
    buildTest({ suffix: 'UK_AUS', locations: ['GBPCountries', 'AUDCountries'], copy: UK_AUS }),
    buildTopReaderTest({
        suffix: 'UK_AUS_TOP_READER',
        locations: ['GBPCountries', 'AUDCountries'],
        copy: UK_AUS_TOP_READER,
    }),
    buildTest({ suffix: 'US', locations: ['UnitedStates'], copy: US }),
    buildTopReaderTest({
        suffix: 'US_TOP_READER',
        locations: ['UnitedStates'],
        copy: US_TOP_READER,
    }),
    buildTest({
        suffix: 'EU_ROW',
        locations: ['EURCountries', 'Canada', 'NZDCountries', 'International'],
        copy: EU_ROW,
    }),
    buildTopReaderTest({
        suffix: 'EU_ROW_TOP_READER',
        locations: ['EURCountries', 'Canada', 'NZDCountries', 'International'],
        copy: EU_ROW_TOP_READER,
    }),
];
