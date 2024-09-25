import { EpicTest, EpicVariant } from '../../shared/types';
import { BanditData } from './banditData';
import { AppliedLearningBanditTestsNames, Result } from '../tests/epics/epicSelection';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';

/**
 * In general we select the best known variant, except with probability 'epsilon' when we select at random.
 * https://en.wikipedia.org/wiki/Multi-armed_bandit#Semi-uniform_strategies
 */

export function selectVariantWithHighestMean(
    testBanditData: BanditData,
    test: EpicTest,
): EpicVariant | undefined {
    const variant =
        testBanditData.bestVariants.length < 2
            ? testBanditData.bestVariants[0]
            : testBanditData.bestVariants[
                  Math.floor(Math.random() * testBanditData.bestVariants.length)
              ];

    if (!variant) {
        return undefined;
    }

    return test.variants.find((v) => v.name === variant.variantName);
}

function selectRandomVariant(test: EpicTest): Result {
    const randomVariantIndex = Math.floor(Math.random() * test.variants.length);
    const randomVariantData = test.variants[randomVariantIndex];

    if (!randomVariantData) {
        logError(`Failed to select random variant for bandit test: ${test.name}`);
        putMetric('bandit-selection-error');
        return {};
    }

    return {
        result: { test, variant: randomVariantData },
    };
}

export function epsilonValueForBanditTest(testBanditData: BanditData): number {
    if (testBanditData.testName.includes(AppliedLearningBanditTestsNames.BanditTestEpsilon1)) {
        return 1;
    } else if (
        testBanditData.testName.includes(AppliedLearningBanditTestsNames.BanditTestEpsilon2)
    ) {
        return 0.5;
    }
    return 1;
}

export function selectVariantUsingEpsilonGreedy(banditData: BanditData[], test: EpicTest): Result {
    const testBanditData = banditData.find((bandit) => bandit.testName === test.name);

    if (!testBanditData) {
        // We don't yet have bandit data for this test, select a random variant
        return selectRandomVariant(test);
    }

    // Choose at random with probability epsilon
    const random = Math.random();

    const EPSILON = epsilonValueForBanditTest(testBanditData);

    if (EPSILON > random) {
        return selectRandomVariant(test);
    }

    const highestMeanVariantData = selectVariantWithHighestMean(testBanditData, test);

    if (!highestMeanVariantData) {
        logError(`Failed to select best variant for bandit test: ${test.name}`);
        putMetric('bandit-selection-error');
        return {};
    }

    return {
        result: {
            test,
            variant: highestMeanVariantData,
        },
    };
}
