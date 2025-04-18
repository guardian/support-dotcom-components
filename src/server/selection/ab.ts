import type { CountryGroupId } from '../../shared/lib';
import type { AmountsTests, SelectedAmountsVariant, Test, Variant } from '../../shared/types';
import { getRandomNumber } from './helpers';

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
    return variants[getRandomNumber(seed, mvtId) % variants.length];
};

/**
 * For use in AB tests.
 * If controlProportionSettings is set then we use this to define the range of mvt values for the control variant.
 * Otherwise we evenly distribute all variants across maxMvt.
 */
export const selectVariantUsingMVT = <V extends Variant, T extends Test<V>>(
    test: T,
    mvtId: number,
): V => {
    const control = test.variants.find((v) => v.name.toLowerCase() === 'control');
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
            const otherVariants = test.variants.filter((v) => v.name.toLowerCase() !== 'control');
            if (otherVariants.length > 0) {
                return selectWithSeed(mvtId, seed, otherVariants);
            }
            return control;
        }
    }
    return selectWithSeed(mvtId, seed, test.variants);
};

export const selectAmountsTestVariant = (
    tests: AmountsTests,
    countryCode: string,
    countryGroupId: CountryGroupId,
    mvtId: number,
): SelectedAmountsVariant | undefined => {
    // Two-tier amounts - check for live country test, else get a region test
    const targetTestArray = tests.filter(
        (t) =>
            t.isLive &&
            t.targeting.targetingType === 'Country' &&
            t.targeting.countries.includes(countryCode),
    );
    let targetTest;
    if (targetTestArray.length) {
        targetTestArray.sort((a, b) => a.order - b.order);
        targetTest = targetTestArray[0];
    }
    if (!targetTest) {
        targetTest = tests.find(
            (t) => t.targeting.targetingType === 'Region' && t.targeting.region === countryGroupId,
        );
    }

    if (!targetTest) {
        return undefined;
    }

    const { testName, liveTestName, isLive, seed, variants } = targetTest;

    // No control or variants in data
    if (!variants.length) {
        return undefined;
    }

    // Return the control variant if there's no test or just a single variant
    if (!isLive || variants.length === 1) {
        return {
            testName,
            ...variants[0],
        };
    }

    // Assign user to a variant - support-frontend repo adds mvtId and test seed (both are numbers) and stringifies the result to create a seed for the pseudorandom number generator. This is different from the way message test variants are selected, which concatenates mvtId with the test name to create the pseudorandom seed
    const assignmentIndex = getRandomNumber(`${seed + mvtId}`) % variants.length;
    const variant = variants[assignmentIndex];

    if (!variant) {
        return undefined;
    }

    // Test is running and user has been successfully assigned to a control/variant
    return {
        testName: liveTestName || `${testName}_AB_TEST`,
        ...variant,
    };
};
