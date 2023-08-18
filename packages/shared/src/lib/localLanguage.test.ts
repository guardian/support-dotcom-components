import { countryCodeToLocalLanguageHeader } from './localLanguage';

describe('getCountryCodeToLocalLanguageHeader', () => {
    const countries = [
        { input: 'FR', output: 'Faites partie de notre aventure européenne !' },
        { input: 'DE', output: 'hallo (German)' },
        { input: 'IT', output: 'Prendi parte alla nostra nuova avventura europea!' },
        { input: 'NL', output: 'hallo (Dutch)' },
        { input: 'SE', output: 'halla' },
        { input: 'SP', output: 'hola' },
    ];

    countries.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(countryCodeToLocalLanguageHeader(input)).toEqual(output);
        });
    });
});
