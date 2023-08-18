import { countryCodeToLocalLanguageHeader } from './localLanguage';

describe('getCountryCodeToLocalLanguageHeader', () => {
    const countries = [
        {
            input: 'FR',
            output:
                'Faites partie de notre <span style="color:red;font-weight:bold">aventure</span> européenne !',
        },
        { input: 'DE', output: 'hallo (German)' },
        { input: 'IT', output: 'Prendi parte alla nostra nuova avventura europea!' },
        { input: 'NL', output: 'hallo (Dutch)' },
        { input: 'SE', output: 'halla' },
        { input: 'SP', output: 'hola' },
        { input: 'GB', output: 'default (English)' },
        { input: 'US', output: 'default (English)' },
        { input: '', output: 'default (English)' },
    ];

    countries.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(countryCodeToLocalLanguageHeader(input)).toEqual(output);
        });
    });
});
