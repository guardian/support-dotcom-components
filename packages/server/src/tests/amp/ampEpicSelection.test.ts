import { CountryGroupId } from '@sdc/shared/lib';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { selectAmpEpic } from './ampEpicSelection';
import { TickerDataProvider } from '../../lib/fetchTickerData';
import {
    TickerCountType,
    TickerEndType,
    TickerSettings,
} from '@sdc/shared/dist/types/props/shared';

const tickerSettings: TickerSettings = {
    endType: TickerEndType.unlimited,
    countType: TickerCountType.money,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributions',
        goalReachedPrimary: "We've hit our goal!",
        goalReachedSecondary: 'but you can still support us',
    },
    name: 'US',
    tickerData: {
        total: 5000,
        goal: 200000,
    },
};

const epicTest: AmpEpicTest = {
    name: 'TEST1',
    priority: 1,
    nickname: 'TEST1',
    status: 'Live',
    locations: [],
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

    it('should select test with matching locations', async () => {
        const tests = [
            { ...epicTest, locations: ['UnitedStates' as CountryGroupId] },
            { ...epicTest, name: 'TEST2', nickname: 'TEST2' },
        ];
        const result = await selectAmpEpic(tests, ampVariantAssignments, tickerDataReloader, 'GB');
        expect(result).toEqual({
            ...expectedAmpEpic,
            testName: 'TEST2',
            variantName: 'CONTROL',
            cta: {
                ...expectedAmpEpic.cta,
                componentId: 'AMP__TEST2__CONTROL',
                campaignCode: 'AMP__TEST2__CONTROL',
            },
        });
    });
});
