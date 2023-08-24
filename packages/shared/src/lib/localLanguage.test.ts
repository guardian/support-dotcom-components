import { countryCodeToLocalLanguage } from './localLanguage';

describe('getCountryCodeToLocalLanguage', () => {
    const countries = [
        {
            input: 'FR',
            output: {
                bannerHeader: 'Faites partie de notre aventure européenne !',
                epicHeader: 'Faites partie de notre aventure européenne !',
            },
        },
        {
            input: 'DE',
            output: {
                bannerHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
                epicHeader: 'Nehmen Sie an unserem neuen europäischen Abenteuer teil!',
            },
        },
        {
            input: 'IT',
            output: {
                bannerHeader: 'Prendi parte alla nostra nuova avventura europea!',
                epicHeader: 'Prendi parte alla nostra nuova avventura europea!',
            },
        },
        {
            input: 'NL',
            output: {
                bannerHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
                epicHeader: 'Neem deel aan ons nieuwe Europese avontuur!',
            },
        },
        {
            input: 'SE',
            output: {
                bannerHeader: 'Ta del av vårt nya europeiska äventyr!',
                epicHeader: 'Ta del av vårt nya europeiska äventyr!',
            },
        },
        {
            input: 'SP',
            output: {
                bannerHeader: '¡Participa en nuestra nueva aventura europea!',
                epicHeader: '¡Participa en nuestra nueva aventura europea!',
            },
        },
        {
            input: 'GB',
            output: {
                bannerHeader: '',
                epicHeader: '',
            },
        },
        {
            input: 'US',
            output: {
                bannerHeader: '',
                epicHeader: '',
            },
        },
        {
            input: '',
            output: {
                bannerHeader: '',
                epicHeader: '',
            },
        },
    ];

    countries.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(countryCodeToLocalLanguage(input)).toEqual(output);
        });
    });
});
