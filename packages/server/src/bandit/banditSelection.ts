import { EpicTest, EpicVariant } from '@sdc/shared/dist/types';
import { BanditData } from './banditData';
import { Result } from '../tests/epics/epicSelection';

/**
 * Select at random with probability epsilon.
 * https://en.wikipedia.org/wiki/Multi-armed_bandit#Semi-uniform_strategies
 */
const EPSILON = 0.1;

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

function selectRandomVariant(variants: EpicVariant[]): EpicVariant | undefined {
    const randomVariantIndex = Math.floor(Math.random() * variants.length);
    return variants[randomVariantIndex];
}

export function selectVariantUsingEpsilonGreedy(banditData: BanditData[], test: EpicTest): Result {
    const testBanditData = banditData.find((bandit) => bandit.testName === test.name);

    if (!testBanditData) {
        // TODO: what do we do if the bandit data isn't there for the test?
        return {};
    }

    // Choose at random with probability epsilon
    const random = Math.random();

    if (EPSILON > random) {
        const randomVariantData = selectRandomVariant(test.variants);

        if (!randomVariantData) {
            // TODO: what do we do if the random variant data is undefined?
            return {};
        }

        return {
            result: { test, variant: randomVariantData },
        };
    }

    const highestMeanVariantData = selectVariantWithHighestMean(testBanditData, test);

    if (!highestMeanVariantData) {
        // TODO: what do we do if the chosen variant data is undefined?
        return {};
    }

    return {
        result: {
            test,
            variant: highestMeanVariantData,
        },
    };
}
