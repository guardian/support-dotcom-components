import {containsNonArticleCountPlaceholder, replaceNonArticleCountPlaceholders} from './placeholders';
import {Prices} from "../types";

describe('containsNonArticleCountPlaceholder', () => {
    it('returns true if string contains placeholder (that is not %%ARTICLE_COUNT%%)', () => {
        const got = containsNonArticleCountPlaceholder('apple %%SOME_PLACEHOLDER%%');
        expect(got).toBe(true);
    });

    it('returns true if string contains two placeholders (that is not %%ARTICLE_COUNT%%)', () => {
        const got = containsNonArticleCountPlaceholder(
            "You've read %%ARTICLE_COUNT%%. Support the Guardian from as little as %%CURRENCY_SYMBOL%%1 – and it only takes a minute. Thank you.",
        );
        expect(got).toBe(true);
    });

    it('returns false if string contains an article count placeholder', () => {
        const got = containsNonArticleCountPlaceholder('apple %%ARTICLE_COUNT%%SDF%%');
        expect(got).toBe(false);
    });

    it('returns false if string does not contain placeholder', () => {
        const got = containsNonArticleCountPlaceholder('apple without placeholder');
        expect(got).toBe(false);
    });
});

describe('replaceNonArticleCountPlaceholders', () => {
    const prices: Prices = {
        GBPCountries: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
        UnitedStates: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
        EURCountries: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
        AUDCountries: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
        International: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
        NZDCountries: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
        Canada: {
            GuardianWeekly: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
            Digisub: {
                Monthly: {
                    price: '0.00',
                },
                Annual: {
                    price: '0.00',
                },
            },
        },
    };

    it('replaces %%COUNTRY_NAME%%', () => {
        const result = replaceNonArticleCountPlaceholders(
            'You live in %%COUNTRY_NAME%%.',
            'IT',
            prices,
        );
        expect(result).toBe('You live in Italy.');
    });
});
