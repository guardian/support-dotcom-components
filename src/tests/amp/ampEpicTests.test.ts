import { selectAmpEpicTest } from './ampEpicTests';
import { CountryGroupId } from '../../lib/geolocation';
import { AMPEpic, AmpEpicTest } from './ampEpicModels';
import { TickerCountType, TickerEndType } from '../../lib/variants';

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
    ],
};

const expectedAmpEpic: AMPEpic = {
    heading: 'a',
    paragraphs: ['b'],
    highlightedText:
        'Support the Guardian from as little as £1 – and it only takes a minute. Thank you.',
    cta: {
        text: 'Show your support',
        url: 'https://support.theguardian.com/contribute',
        componentId: 'TEST1-CONTROL',
        campaignCode: 'TEST1-CONTROL',
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
        const result = await selectAmpEpicTest(tests, 'GB');
        expect(result).toEqual(expectedAmpEpic);
    });

    it('should not select test if disabled', async () => {
        const tests = [{ ...epicTest, isOn: false }];
        const result = await selectAmpEpicTest(tests, 'GB');
        expect(result).toEqual(null);
    });

    it('should select test with matching locations', async () => {
        const tests = [
            { ...epicTest, locations: ['UnitedStates' as CountryGroupId] },
            { ...epicTest, name: 'TEST2', nickname: 'TEST2' },
        ];
        const result = await selectAmpEpicTest(tests, 'GB');
        expect(result).toEqual({
            ...expectedAmpEpic,
            cta: {
                ...expectedAmpEpic.cta,
                componentId: 'TEST2-CONTROL',
                campaignCode: 'TEST2-CONTROL',
            },
        });
    });
});
