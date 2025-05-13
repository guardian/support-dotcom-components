import type { CountryGroupId } from '../../../shared/lib';
import type { ChoiceCard, ChoiceCardsSettings } from '../../../shared/types/props/choiceCards';

const currencySymbolTemplate = '%%CURRENCY_SYMBOL%%';

const oneOffCard = (countryGroupId: CountryGroupId): ChoiceCard => ({
    product: {
        supportTier: 'OneOff',
    },
    label:
        countryGroupId === 'UnitedStates'
            ? `Support once from just ${currencySymbolTemplate}1`
            : `Support with another amount`,
    isDefault: false,
    benefits: [
        {
            copy:
                countryGroupId === 'UnitedStates'
                    ? `We welcome support of any size, any time - whether you choose to give ${currencySymbolTemplate}1 or more`
                    : 'We welcome support of any size, any time',
        },
    ],
});

const fullChoiceCards = (countryGroupId: CountryGroupId): ChoiceCard[] => [
    {
        product: {
            supportTier: 'Contribution',
            ratePlan: 'Monthly',
        },
        label: '', // label is generated for recurring products
        isDefault: false,
        benefitsLabel: 'Unlock Support benefits:',
        benefits: [
            {
                copy: 'Give to the Guardian every month with Support',
            },
        ],
    },
    {
        product: {
            supportTier: 'SupporterPlus',
            ratePlan: 'Monthly',
        },
        label: '', // label is generated for recurring products
        isDefault: true,
        benefitsLabel: 'Unlock All-access digital benefits:',
        benefits: [
            { copy: 'Unlimited access to the Guardian app' },
            { copy: 'Unlimited access to our new Feast App' },
            { copy: 'Ad-free reading on all your devices' },
            {
                copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
            },
            { copy: 'Far fewer asks for support' },
        ],
        pill: {
            copy: 'Recommended',
        },
    },
    oneOffCard(countryGroupId),
];

const shorterChoiceCards = (countryGroupId: CountryGroupId): ChoiceCard[] => [
    {
        product: {
            supportTier: 'Contribution',
            ratePlan: 'Monthly',
        },
        label: '', // label is generated for recurring products
        isDefault: false,
        benefits: [
            {
                copy: 'Give to the Guardian every month with Support',
            },
        ],
    },
    {
        product: {
            supportTier: 'SupporterPlus',
            ratePlan: 'Monthly',
        },
        label: '', // label is generated for recurring products
        isDefault: true,
        benefits: [
            { copy: 'Unlimited access to the Guardian app and Feast app' },
            { copy: 'Ad-free reading on all your devices' },
        ],
        pill: {
            copy: 'Recommended',
        },
    },
    oneOffCard(countryGroupId),
];

const defaultEpicChoiceCardsSettings = (countryGroupId: CountryGroupId): ChoiceCardsSettings => ({
    choiceCards: fullChoiceCards(countryGroupId),
    // same on mobile
});

const defaultBannerChoiceCardsSettings = (countryGroupId: CountryGroupId): ChoiceCardsSettings => ({
    choiceCards: shorterChoiceCards(countryGroupId),
    // same on mobile
});

export { currencySymbolTemplate, defaultEpicChoiceCardsSettings, defaultBannerChoiceCardsSettings };
