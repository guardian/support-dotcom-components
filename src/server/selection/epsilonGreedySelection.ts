import type { Test, Variant } from '../../shared/types';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';
import type { BanditData } from './banditData';
import { selectRandomVariant } from './helpers';

/**
 * In general we select the best known variant, except with probability 'epsilon' when we select at random.
 * https://en.wikipedia.org/wiki/Multi-armed_bandit#Semi-uniform_strategies
 */

export function selectVariantWithHighestMean<V extends Variant, T extends Test<V>>(
    testBanditData: BanditData,
    test: T,
): V | undefined {
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

export function selectVariantUsingEpsilonGreedy<V extends Variant, T extends Test<V>>(
    test: T,
    epsilon: number,
    testBanditData?: BanditData,
): V | undefined {
    if (!testBanditData) {
        // We don't yet have bandit data for this test, select a random variant
        return selectRandomVariant(test);
    }

    // Choose at random with probability epsilon
    const random = Math.random();

    if (epsilon > random) {
        return selectRandomVariant(test);
    }

    const highestMeanVariantData = selectVariantWithHighestMean<V, T>(testBanditData, test);

    if (!highestMeanVariantData) {
        logError(`Failed to select best variant for bandit test: ${test.name}`);
        putMetric('bandit-selection-error');
        return;
    }

    return highestMeanVariantData;
}
