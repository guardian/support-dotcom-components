import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import {
    ModifiedChoiceCardAmounts,
    ChoiceCardAmounts,
    ConfiguredRegionAmounts,
} from '@sdc/shared/types';
import { buildReloader, ValueReloader } from './utils/valueReloader';

const getChoiceCardAmounts = (): Promise<ModifiedChoiceCardAmounts> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/configured-amounts.json`)
        .then(JSON.parse)
        .then((packet: ChoiceCardAmounts) => {
            const buildRegionData = (rawData: ConfiguredRegionAmounts, name: string) => {
                const res = {
                    name: rawData.test?.name ?? name,
                    testIsLive: rawData.test?.isLive ?? false,
                    seed: '' + rawData.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: rawData.control,
                        },
                    ],
                };

                if (rawData.test && Array.isArray(rawData.test.variants)) {
                    res.variants.push(...rawData.test.variants);
                }
                return res;
            };

            return {
                GBPCountries: buildRegionData(packet.GBPCountries, 'GBPCountries_default'),
                UnitedStates: buildRegionData(packet.UnitedStates, 'UnitedStates_default'),
                AUDCountries: buildRegionData(packet.AUDCountries, 'AUDCountries_default'),
                EURCountries: buildRegionData(packet.EURCountries, 'EURCountries_default'),
                International: buildRegionData(packet.International, 'International_default'),
                NZDCountries: buildRegionData(packet.NZDCountries, 'NZDCountries_default'),
                Canada: buildRegionData(packet.Canada, 'Canada_default'),
            };
        });

const buildChoiceCardAmountsReloader = (): Promise<ValueReloader<ModifiedChoiceCardAmounts>> =>
    buildReloader(getChoiceCardAmounts, 60);

export { buildChoiceCardAmountsReloader };
