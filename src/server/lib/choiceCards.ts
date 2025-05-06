import type {
    CountryGroupId,
    IsoCurrency} from '../../shared/lib';
import {
    countryGroups,
    isoCurrencyToCurrencySymbol,
} from '../../shared/lib';
import type { Channel } from '../../shared/types';
import type { ChoiceCardsSettings } from '../../shared/types/props/choiceCards';
import type { ProductCatalog } from '../productCatalog';

// TODO - regional
interface ChoiceCardsSettingsMap {
    epic: (isoCurrency: IsoCurrency, productCatalog: ProductCatalog) => ChoiceCardsSettings;
    banner: (isoCurrency: IsoCurrency, productCatalog: ProductCatalog) => ChoiceCardsSettings;
}

const epicChoiceCardsSettings: (isoCurrency: IsoCurrency, productCatalog: ProductCatalog) => ChoiceCardsSettings = (isoCurrency, productCatalog) => ({
    choiceCards: [
        {
            product: {
                supportTier: 'Contribution',
                ratePlan: 'Monthly',
            },
            label: `Support ${isoCurrencyToCurrencySymbol[isoCurrency]}${productCatalog.Contribution.ratePlans.Monthly.pricing[isoCurrency]}/month`,
            isDefault: false,
            benefitsLabel: 'Unlock Support benefits:',
            benefits: [{
                copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom',
            }],
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
                { copy: 'Exclusive newsletter for supporters, sent every week from the Guardian newsroom' },
                { copy: 'Far fewer asks for support' },
            ],
            pill: {
                copy: 'Recommended',
            },
        },
        {
            product: {
                supportTier: 'OneOff',
            },
            label: `Support with another amount`,
            isDefault: false,
            benefits: [{
                // TODO - no bullet
                copy: 'We welcome support of any size, any time',
            }],
        },
    ],
    mobileChoiceCards: [],
});

const bannerChoiceCardsSettings = epicChoiceCardsSettings;

const choiceCardsSettingsMap: ChoiceCardsSettingsMap = {
    epic: epicChoiceCardsSettings,
    banner: bannerChoiceCardsSettings
}

export const getChoiceCardsSettings = (
    countryGroupId: CountryGroupId,
    channel: Channel,
    productCatalog: ProductCatalog,
): ChoiceCardsSettings | undefined => {
    const isoCurrency = countryGroups[countryGroupId].currency;
    if (channel === 'Epic') {
        return choiceCardsSettingsMap.epic(isoCurrency, productCatalog);
    } else if (channel === 'Banner1' || channel === 'Banner2') {
        return choiceCardsSettingsMap.banner(isoCurrency, productCatalog);
    }
    return undefined;
}
