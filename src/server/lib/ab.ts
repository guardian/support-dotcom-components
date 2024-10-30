import {
    Test,
    Variant,
    AmountsTests,
    SelectedAmountsVariant,
    Methodology,
} from '../../shared/types';
import { CountryGroupId } from '../../shared/lib';
import seedrandom from 'seedrandom';
import { BanditData } from '../bandit/banditData';
import { selectVariantUsingEpsilonGreedy } from '../bandit/banditSelection';

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

export const getRandomNumber = (seed: string, mvtId: number | string = ''): number => {
    const rng = seedrandom(mvtId + seed);
    return Math.abs(rng.int32());
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

const selectVariantWithMethodology = <V extends Variant, T extends Test<V>>(
    test: T,
    mvtId: number,
    banditData: BanditData[],
    methodology: Methodology,
): V | undefined => {
    if (methodology.name === 'EpsilonGreedyBandit') {
        return selectVariantUsingEpsilonGreedy(banditData, test, methodology.epsilon);
    }
    return selectVariantUsingMVT<V, T>(test, mvtId);
};

const addMethodologyToTestName = (testName: string, methodology: Methodology): string => {
    if (methodology.name === 'EpsilonGreedyBandit') {
        return `${testName}_EpsilonGreedyBandit-${methodology.epsilon}`;
    } else {
        return `${testName}_ABTest`;
    }
};

/**
 * Selects a variant from the test based on any configured methodologies.
 * Defaults to an AB test.
 */
export const selectVariant = <V extends Variant, T extends Test<V>>(
    test: T,
    mvtId: number,
    banditData: BanditData[],
): { test: T; variant: V } | undefined => {
    if (test.methodologies && test.methodologies.length === 1) {
        // Only one configured methodology
        const variant = selectVariantWithMethodology<V, T>(
            test,
            mvtId,
            banditData,
            test.methodologies[0],
        );
        if (variant) {
            return {
                test,
                variant,
            };
        }
    } else if (test.methodologies) {
        // More than one methodology, pick one of them using the mvt value
        const methodology =
            test.methodologies[getRandomNumber(test.name, mvtId) % test.methodologies.length];

        // Add the methodology to the test name so that we can track them separately
        const testWithNameExtension = {
            ...test,
            name: addMethodologyToTestName(test.name, methodology),
        };
        const variant = selectVariantWithMethodology<V, T>(
            testWithNameExtension,
            mvtId,
            banditData,
            methodology,
        );
        if (variant) {
            return {
                test: testWithNameExtension,
                variant,
            };
        }
    } else {
        // No configured methodology, default to AB test
        const variant = selectVariantUsingMVT<V, T>(test, mvtId);
        if (variant) {
            return {
                test,
                variant,
            };
        }
    }
    return;
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
