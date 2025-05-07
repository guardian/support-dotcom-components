import type { CountryGroupId, IsoCurrency } from '../../shared/lib';
import { countryGroups, isoCurrencyToCurrencySymbol } from '../../shared/lib';
import type { Channel } from '../../shared/types';
import type { ChoiceCard, ChoiceCardsSettings } from '../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../productCatalog';

interface ChoiceCardsSettingsMap {
    epic: (countryGroupId: CountryGroupId, isoCurrency: IsoCurrency, productCatalog: ProductCatalog) => ChoiceCardsSettings;
    banner: (countryGroupId: CountryGroupId, isoCurrency: IsoCurrency, productCatalog: ProductCatalog) => ChoiceCardsSettings;
}

const oneOffCard = (countryGroupId: CountryGroupId, currencySymbol: string): ChoiceCard => ({
    product: {
        supportTier: 'OneOff',
    },
    label: countryGroupId === 'UnitedStates' ? `Support once from just ${currencySymbol}1` : `Support with another amount`,
    isDefault: false,
    benefits: [
        {
            copy: countryGroupId === 'UnitedStates' ? `We welcome support of any size, any time - whether you choose to give ${currencySymbol}1 or more` : 'We welcome support of any size, any time',
        },
    ],
});

const fullChoiceCards = (
    countryGroupId: CountryGroupId,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
): ChoiceCard[] => [
    {
        product: {
            supportTier: 'Contribution',
            ratePlan: 'Monthly',
        },
        label: `Support ${isoCurrencyToCurrencySymbol[isoCurrency]}${productCatalog.Contribution.ratePlans.Monthly.pricing[isoCurrency]}/month`,
        isDefault: false,
        benefitsLabel: 'Unlock Support benefits:',
        benefits: [
            {
                copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
            },
        ],
    },
    {
        product: {
            supportTier: 'SupporterPlus',
            ratePlan: 'Annual',
        },
        label: `Support ${isoCurrencyToCurrencySymbol[isoCurrency]}${productCatalog.SupporterPlus.ratePlans.Monthly.pricing[isoCurrency]}/month`,
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
    oneOffCard(countryGroupId, isoCurrencyToCurrencySymbol[isoCurrency]),
];

const shorterChoiceCards = (
    countryGroupId: CountryGroupId,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
): ChoiceCard[] => [
    {
        product: {
            supportTier: 'Contribution',
            ratePlan: 'Monthly',
        },
        label: `Support ${isoCurrencyToCurrencySymbol[isoCurrency]}${productCatalog.Contribution.ratePlans.Monthly.pricing[isoCurrency]}/month`,
        isDefault: false,
        benefits: [
            {
                copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
            },
        ],
    },
    {
        product: {
            supportTier: 'SupporterPlus',
            ratePlan: 'Annual',
        },
        label: `Support ${isoCurrencyToCurrencySymbol[isoCurrency]}${productCatalog.SupporterPlus.ratePlans.Monthly.pricing[isoCurrency]}/month`,
        isDefault: true,
        benefits: [
            { copy: 'Unlimited access to the Guardian app and Feast app' },
            { copy: 'Ad-free reading on all your devices' },
        ],
        pill: {
            copy: 'Recommended',
        },
    },
    oneOffCard(countryGroupId, isoCurrencyToCurrencySymbol[isoCurrency]),
];

const epicChoiceCardsSettings: (
    countryGroupId: CountryGroupId,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
) => ChoiceCardsSettings = (countryGroupId, isoCurrency, productCatalog) => ({
    choiceCards: fullChoiceCards(countryGroupId, isoCurrency, productCatalog),
    // same on mobile
});

const bannerChoiceCardsSettings: (
    countryGroupId: CountryGroupId,
    isoCurrency: IsoCurrency,
    productCatalog: ProductCatalog,
) => ChoiceCardsSettings = (countryGroupId, isoCurrency, productCatalog) => ({
    choiceCards: shorterChoiceCards(countryGroupId, isoCurrency, productCatalog),
    // same on mobile
});

const choiceCardsSettingsMap: ChoiceCardsSettingsMap = {
    epic: epicChoiceCardsSettings,
    banner: bannerChoiceCardsSettings,
};

export const getChoiceCardsSettings = (
    countryGroupId: CountryGroupId,
    channel: Channel,
    productCatalog: ProductCatalog,
): ChoiceCardsSettings | undefined => {
    const isoCurrency = countryGroups[countryGroupId].currency;
    if (channel === 'Epic') {
        return choiceCardsSettingsMap.epic(countryGroupId, isoCurrency, productCatalog);
    } else if (channel === 'Banner1' || channel === 'Banner2') {
        return choiceCardsSettingsMap.banner(countryGroupId, isoCurrency, productCatalog);
    }
    return undefined;
};
