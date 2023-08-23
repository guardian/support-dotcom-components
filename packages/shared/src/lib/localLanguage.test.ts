import { countryCodeToLocalLanguageEpic, countryCodeToLocalLanguageHeader } from './localLanguage';

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
        { input: 'GB', output: '' },
        { input: 'US', output: '' },
        { input: '', output: '' },
    ];

    countries.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(countryCodeToLocalLanguageHeader(input)).toEqual(output);
        });
    });
});

describe('getCountryCodeToLocalLanguageEpic', () => {
    const countries = [
        {
            input: 'FR',
            output:
                'epic Faites partie de notre <span style="color:red;font-weight:bold">aventure</span> européenne !',
        },
        { input: 'DE', output: 'epic hallo (German)' },
        { input: 'IT', output: 'epic Prendi parte alla nostra nuova avventura europea!' },
        { input: 'NL', output: 'epic hallo (Dutch)' },
        { input: 'SE', output: 'epic halla' },
        { input: 'SP', output: 'epic hola' },
        { input: 'GB', output: '' },
        { input: 'US', output: '' },
        { input: '', output: '' },
    ];

    countries.forEach(({ input, output }) => {
        it(`returns ${output}, given ${input}`, () => {
            expect(countryCodeToLocalLanguageEpic(input)).toEqual(output);
        });
    });
});
