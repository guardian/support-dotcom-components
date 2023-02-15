import {
    Test,
    Variant,
    ModifiedChoiceCardAmounts,
    SelectedAmountsVariant,
} from '@sdc/shared/types';
import { CountryGroupId } from '@sdc/shared/lib';
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

// Amounts test code should match the equivalent code in support-frontend as closely as possible
const amountsRandomNumber = (mvtId: number, seed: number): number => {
    const rng = seedrandom(`${mvtId + seed}`);
    return Math.abs(rng.int32());
};

export const selectAmountsTestVariant = (
    test: ModifiedChoiceCardAmounts,
    countryGroupId: CountryGroupId,
    mvtId: number,
): SelectedAmountsVariant | undefined => {
    const regionTest = test[countryGroupId];

    const { name, variants, testIsLive, seed } = regionTest;

    const seedNumber = parseInt(seed, 10);

    const returnData: SelectedAmountsVariant = {
        testName: name,
    };

    // No control or variants in data
    if (!variants.length) {
        return undefined;
    }

    // Return the control variant if there's no test or just a single variant
    if (!testIsLive || variants.length === 1) {
        const variant = variants[0];
        returnData.variantName = variant.name;
        returnData.amounts = variant.amounts;
        return returnData;
    }

    // Assign user to a variant
    const assignmentIndex = amountsRandomNumber(mvtId, seedNumber) % variants.length;
    const variant = variants[assignmentIndex];

    if (variant == null) {
        return undefined;
    }

    // Test is running and user has been successfully assigned to a control/variant
    returnData.variantName = variant.name;
    returnData.amounts = variant.amounts;
    return returnData;
};
