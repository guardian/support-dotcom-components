import { selectAmpEpicTestAndVariant } from './ampEpicTests';
import { CountryGroupId } from '../../lib/geolocation';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { AmpVariantAssignments } from '../../lib/ampVariantAssignments';
import { TickerCountType, TickerEndType } from '@sdc/shared/types';

jest.mock('../../lib/fetchTickerData', () => {
    return {
        fetchTickerDataCached: jest.fn().mockImplementation(() =>
            Promise.resolve({
                total: 999,
                goal: 1000,
            }),
        ),
    };
});

const epicTest: AmpEpicTest = {
    name: 'TEST1',
    nickname: 'TEST1',
    isOn: true,
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
            tickerSettings: {
                endType: TickerEndType.unlimited,
                countType: TickerCountType.money,
                currencySymbol: '$',
                copy: {
                    countLabel: 'contributions',
                    goalReachedPrimary: "We've hit our goal!",
                    goalReachedSecondary: 'but you can still support us',
                },
            },
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
            tickerSettings: {
                endType: TickerEndType.unlimited,
                countType: TickerCountType.money,
                currencySymbol: '$',
                copy: {
                    countLabel: 'contributions',
                    goalReachedPrimary: "We've hit our goal!",
                    goalReachedSecondary: 'but you can still support us',
                },
            },
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

describe('ampEpicTests', () => {
    it('should select test with no targeting', async () => {
        const tests = [epicTest];
        const result = await selectAmpEpicTestAndVariant(tests, ampVariantAssignments, 'GB');
        expect(result).toEqual(expectedAmpEpic);
    });

    it('should not select test if disabled', async () => {
        const tests = [{ ...epicTest, isOn: false }];
        const result = await selectAmpEpicTestAndVariant(tests, ampVariantAssignments, 'GB');
        expect(result).toEqual(null);
    });

    it('should select test with matching locations', async () => {
        const tests = [
            { ...epicTest, locations: ['UnitedStates' as CountryGroupId] },
            { ...epicTest, name: 'TEST2', nickname: 'TEST2' },
        ];
        const result = await selectAmpEpicTestAndVariant(tests, ampVariantAssignments, 'GB');
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
