import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import { ModifiedChoiceCardAmounts } from '@sdc/shared/types';
import { buildReloader, ValueReloader } from './utils/valueReloader';

/*
WE WANT TO TURN THIS
{
  "GBPCountries" : {
    "control" : {
      "ONE_OFF" : {
        "amounts" : [...],
        "defaultAmount" : 10
      },
      "MONTHLY" : {...},
      "ANNUAL" : {...}
    },
    "test" : {
      "name" : "GBP_COUNTRIES_AMOUNTS_TEST",
      "isLive" : true,
      "seed" : 398375
      "variants" : [
        {
          "name" : "V1",
          "hideChooseYourAmount" : true
          "amounts" : {
            "ONE_OFF" : {
              "amounts" : [...],
              "defaultAmount" : 20
            },
            "MONTHLY" : {...},
            "ANNUAL" : {...}
          },
        },
        {
          "name" : "V2",
          "amounts" : {...}
        }
      ],
    }
  },
  "UnitedStates" : {
    "hideChooseYourAmount" : true
    "control" : {
      "ONE_OFF" : {
        "amounts" : [...],
        "defaultAmount" : 5
      },
      "MONTHLY" : {...},
      "ANNUAL" : {...}
    },
  },
  "EURCountries" : {...},
  "AUDCountries" : {...},
  "International" : {...},
  "NZDCountries" : {...},
  "Canada" : {...}
}

...INTO THIS
{
  GBPCountries: {
    name: 'GBP_COUNTRIES_AMOUNTS_TEST';
    testIsLive: true;
    seed: 398375;
    variants: [{
      name: 'control';
      hideChooseYourAmount: false;
      amounts: {
        ONE_OFF: {
          amounts: [...],
          defaultAmount: 20
        },
        MONTHLY: {...},
        ANNUAL: {...}
      };
    },{
      name: 'V1',
      hideChooseYourAmount: true
      amounts: {
        ONE_OFF: {
          amounts: [...],
          defaultAmount: 20
        },
        MONTHLY: {...},
        ANNUAL: {...}
      },
    },{
      name: 'V2',
      hideChooseYourAmount: false
      amounts: {...}
    }];
  },
  UnitedStates: {
    name: 'UnitedStates_default';
    testIsLive: false;
    seed: 0;
    variants: [{
      name: 'control';
      hideChooseYourAmount: true;
      amounts: {...};
    }];
  },
  EURCountries: {
    name: 'EURCountries_default';
    testIsLive: false;
    seed: 0;
    variants: [{
      name: 'control';
      hideChooseYourAmount: false;
      amounts: {...};
    }];
  },
  AUDCountries: {...},
  International: {...},
  NZDCountries: {...},
  Canada: {...}
}
*/

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
                            hideChooseYourAmount: GBPCountries?.hideChooseYourAmount ?? false,
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
                            hideChooseYourAmount: UnitedStates?.hideChooseYourAmount ?? false,
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
                            hideChooseYourAmount: AUDCountries?.hideChooseYourAmount ?? false,
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
                            hideChooseYourAmount: EURCountries?.hideChooseYourAmount ?? false,
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
                            hideChooseYourAmount: International?.hideChooseYourAmount ?? false,
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
                            hideChooseYourAmount: NZDCountries?.hideChooseYourAmount ?? false,
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
                            hideChooseYourAmount: Canada?.hideChooseYourAmount ?? false,
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
