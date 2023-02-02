import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import { ModifiedChoiceCardAmounts } from '@sdc/shared/types';
import { buildReloader, ValueReloader } from './utils/valueReloader';

const getChoiceCardAmounts = (): Promise<ModifiedChoiceCardAmounts> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/configured-amounts.json`)
        .then(JSON.parse)
        .then(packet => {
            const {
                GBPCountries,
                UnitedStates,
                AUDCountries,
                EURCountries,
                International,
                NZDCountries,
                Canada,
            } = packet;

            return {
                GBPCountries: {
                    name: GBPCountries?.test?.name ?? 'GBPCountries_default',
                    testIsLive: GBPCountries?.test?.isLive ?? false,
                    seed: '' + GBPCountries?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: GBPCountries.control,
                        },
                        ...GBPCountries?.test?.variants,
                    ],
                },
                UnitedStates: {
                    name: UnitedStates?.test?.name ?? 'UnitedStates_default',
                    testIsLive: UnitedStates?.test?.isLive ?? false,
                    seed: '' + UnitedStates?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: UnitedStates.control,
                        },
                        ...UnitedStates?.test?.variants,
                    ],
                },
                AUDCountries: {
                    name: AUDCountries?.test?.name ?? 'AUDCountries_default',
                    testIsLive: AUDCountries?.test?.isLive ?? false,
                    seed: '' + AUDCountries?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: AUDCountries.control,
                        },
                        ...AUDCountries?.test?.variants,
                    ],
                },
                EURCountries: {
                    name: EURCountries?.test?.name ?? 'EURCountries_default',
                    testIsLive: EURCountries?.test?.isLive ?? false,
                    seed: '' + EURCountries?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: EURCountries.control,
                        },
                        ...EURCountries?.test?.variants,
                    ],
                },
                International: {
                    name: International?.test?.name ?? 'International_default',
                    testIsLive: International?.test?.isLive ?? false,
                    seed: '' + International?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: International.control,
                        },
                        ...International?.test?.variants,
                    ],
                },
                NZDCountries: {
                    name: NZDCountries?.test?.name ?? 'NZDCountries_default',
                    testIsLive: NZDCountries?.test?.isLive ?? false,
                    seed: '' + NZDCountries?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: NZDCountries.control,
                        },
                        ...NZDCountries?.test?.variants,
                    ],
                },
                Canada: {
                    name: Canada?.test?.name ?? 'Canada_default',
                    testIsLive: Canada?.test?.isLive ?? false,
                    seed: '' + Canada?.test?.seed ?? '0',
                    variants: [
                        {
                            name: 'control',
                            amounts: Canada.control,
                        },
                        ...Canada?.test?.variants,
                    ],
                },
            };
        });

const buildChoiceCardAmountsReloader = (): Promise<ValueReloader<ModifiedChoiceCardAmounts>> =>
    buildReloader(getChoiceCardAmounts, 60);

export { buildChoiceCardAmountsReloader };
