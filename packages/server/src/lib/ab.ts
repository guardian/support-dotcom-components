import {
    Test,
    Variant,
    ModifiedChoiceCardAmounts,
    SelectedAmountsVariant,
} from '@sdc/shared/types';
import {
    CountryGroupId,
} from '@sdc/shared/lib';
import seedrandom from 'seedrandom';

const maxMvt = 1000000;

export const withinRange = (lower: number, proportion: number, mvtId: number): boolean => {
    const upper = (lower + maxMvt * proportion) % maxMvt;

    if (lower > upper) {
        // wrapped
        return mvtId >= lower || mvtId < upper;
    } else {
        return mvtId >= lower && mvtId < upper;
    }
};

export const selectWithSeed = <V extends Variant>(
    mvtId: number,
    seed: string,
    variants: V[],
): V => {
    if (variants.length === 1) {
        // optimisation as it's common for a 'test' to have a single variant
        return variants[0];
    }

    const n: number = Math.abs(seedrandom(mvtId + seed).int32());
    return variants[n % variants.length];
};

/**
 * If controlProportionSettings is set then we use this to define the range of mvt values for the control variant.
 * Otherwise we evenly distribute all variants across maxMvt.
 */
export const selectVariant = <V extends Variant, T extends Test<V>>(test: T, mvtId: number): V => {
    const control = test.variants.find(v => v.name.toLowerCase() === 'control');
    const seed = test.name.split('__')[0];

    if (test.controlProportionSettings && control) {
        if (
            withinRange(
                test.controlProportionSettings.offset,
                test.controlProportionSettings.proportion,
                mvtId,
            )
        ) {
            return control;
        } else {
            const otherVariants = test.variants.filter(v => v.name.toLowerCase() !== 'control');
            if (otherVariants.length > 0) {
                return selectWithSeed(mvtId, seed, otherVariants);
            }
            return control;
        }
    }

    return selectWithSeed(mvtId, seed, test.variants);
};

const amountsRandomNumber = (mvtId: number, seed: number): number => {
    console.log(mvtId, seed);
    return 0;
};

export const selectAmountsTestVariant = (
    test: ModifiedChoiceCardAmounts,
    countryGroupId: CountryGroupId,
    mvtId: number,
): SelectedAmountsVariant => {
    console.log('test', test);
    console.log('countryGroupId', countryGroupId);
    console.log('amountsRandomNumber', amountsRandomNumber(mvtId, 0));
    return {
        testName: 'test',
        variantName: 'variant',
        amounts: {
            'ONE_OFF': {
                amounts: [1, 5, 10, 20],
                defaultAmount: 5,
            },
            'MONTHLY': {
                amounts: [1, 5, 10, 20],
                defaultAmount: 5,
            },
            'ANNUAL': {
                amounts: [1, 5, 10, 20],
                hideChooseYourAmount: true,
                defaultAmount: 5,
            },
        }
    };
};

// function randomNumber(mvtId: number, seed: number): number {
//     const rng = seedrandom(`${mvtId + seed}`);
//     return Math.abs(rng.int32());
// }
// -------------------------------------------
// function getAmountsTestParticipations(
//     countryGroupId: CountryGroupId,
//     settings: Settings,
// ): Participations | null | undefined {
//     if (
//         !targetPageMatches(
//             window.location.pathname,
//             '/??/contribute|contribute-in-epic|thankyou(/.*)?$',
//         )
//     ) {
//         return null;
//     }

//     const { test } = settings.amounts?.[countryGroupId] ?? {};

//     if (!test || !test.isLive) {
//         return null;
//     }

//     const variants = ['CONTROL', ...test.variants.map((variant) => variant.name)];
//     const assignmentIndex = randomNumber(getMvtId(), test.seed) % variants.length;
//     return {
//         [test.name]: variants[assignmentIndex],
//     };
// }
