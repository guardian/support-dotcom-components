import type { TickerSettings } from '../../../shared/types';
import { TickerCountType, TickerEndType } from '../../../shared/types';
import type { AmpVariantAssignments } from '../../lib/ampVariantAssignments';
import { TickerDataProvider } from '../../lib/fetchTickerData';
import type { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { selectAmpEpic } from './ampEpicSelection';

const tickerSettings: TickerSettings = {
    currencySymbol: '$',
    copy: {
        countLabel: 'contributions',
        goalReachedPrimary: "We've hit our goal!",
        goalReachedSecondary: 'but you can still support us',
    },
    name: 'US',
};

const epicTest: AmpEpicTest = {
    channel: 'EpicAMP',
    name: 'TEST1',
    priority: 1,
    nickname: 'TEST1',
    status: 'Live',
    locations: [],
    regionTargeting: {
        targetedCountryGroups: [],
        targetedCountryCodes: [],
    },
    variants: [
        {
            name: 'CONTROL',
            heading: 'a',
            paragraphs: ['b'],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.',
            cta: {
                text: 'Show your support',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            tickerSettings,
        },
        {
            name: 'VARIANT',
            heading: 'a',
            paragraphs: ['b'],
            highlightedText:
                'Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.',
            cta: {
                text: 'Show your support',
                baseUrl: 'https://support.theguardian.com/contribute',
            },
            tickerSettings,
        },
    ],
};

const ampVariantAssignments: AmpVariantAssignments = {
    TEST1: 'CONTROL',
    TEST2: 'CONTROL',
};

const expectedAmpEpic: AMPEpic = {
    testName: 'TEST1',
    variantName: 'CONTROL',
    heading: 'a',
    paragraphs: ['b'],
    highlightedText:
        'Support the Guardian from as little as £1 – and it only takes a minute. Thank you.',
    cta: {
        text: 'Show your support',
        url: 'https://support.theguardian.com/contribute',
        componentId: 'AMP__TEST1__CONTROL',
        campaignCode: 'AMP__TEST1__CONTROL',
    },
    ticker: {
        bottomLeft: 'contributions',
        bottomRight: 'our goal',
        percentage: '99.9',
        topLeft: '$999',
        topRight: '$1,000',
    },
};

const tickerDataReloader = new TickerDataProvider({
    US: { get: () => ({ total: 999, goal: 1000 }) },
    AU: { get: () => ({ total: 999, goal: 1000 }) },
    global: { get: () => ({ total: 999, goal: 1000 }) },
});

describe('ampEpicTests', () => {
    it('should select test with no targeting', async () => {
        const tests = [epicTest];
        const result = await selectAmpEpic(tests, ampVariantAssignments, tickerDataReloader, 'GB');
        expect(result).toEqual(expectedAmpEpic);
    });

    it('should not select test if disabled', async () => {
        const tests: AmpEpicTest[] = [{ ...epicTest, status: 'Draft' }];
        const result = await selectAmpEpic(tests, ampVariantAssignments, tickerDataReloader, 'GB');
        expect(result).toEqual(null);
    });

    it('should select test based on region targeting', async () => {
        const tests: AmpEpicTest[] = [
            {
                ...epicTest,
                regionTargeting: {
                    targetedCountryGroups: ['UnitedStates'],
                    targetedCountryCodes: ['US'],
                },
            },
        ];

        // User in targeted country group (US)
        let result = await selectAmpEpic(tests, ampVariantAssignments, tickerDataReloader, 'US');
        expect(result).toMatchObject({
            testName: 'TEST1',
            variantName: 'CONTROL',
            heading: 'a',
            paragraphs: ['b'],
            highlightedText: expect.stringContaining('Support the Guardian from as little as $1'),
            cta: {
                text: 'Show your support',
                url: 'https://support.theguardian.com/contribute',
            },
            ticker: {
                percentage: '99.9',
                topLeft: '$999',
                topRight: '$1,000',
            },
        });

        // Ensure optional properties are handled correctly otherwise test fails
        expect(result?.secondaryCta).toBeUndefined();
        expect(result?.showChoiceCards).toBeUndefined();
        expect(result?.defaultChoiceCardFrequency).toBeUndefined();

        // User not in targeted country group (GB)
        result = await selectAmpEpic(tests, ampVariantAssignments, tickerDataReloader, 'GB');
        expect(result).toBeNull();
    });
});
