import { selectAmpEpicTest } from './ampEpicTests';
import { CountryGroupId } from '../../lib/geolocation';

const epicTest = {
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
            showTicker: false,
        },
    ],
};

describe('ampEpicTests', () => {
    it('should select test with no targeting', () => {
        const tests = [epicTest];
        expect(selectAmpEpicTest(tests, 'GB')).toEqual({
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
        });
    });

    it('should not select test if disabled', () => {
        const tests = [{ ...epicTest, isOn: false }];
        expect(selectAmpEpicTest(tests, 'GB')).toEqual(null);
    });

    it('should select test with matching locations', () => {
        const tests = [
            { ...epicTest, locations: ['UnitedStates' as CountryGroupId] },
            { ...epicTest, name: 'TEST2', nickname: 'TEST2' },
        ];
        expect(selectAmpEpicTest(tests, 'GB')).toEqual({
            heading: 'a',
            paragraphs: ['b'],
            highlightedText:
                'Support the Guardian from as little as £1 – and it only takes a minute. Thank you.',
            cta: {
                text: 'Show your support',
                url: 'https://support.theguardian.com/contribute',
                componentId: 'TEST2-CONTROL',
                campaignCode: 'TEST2-CONTROL',
            },
        });
    });
});
