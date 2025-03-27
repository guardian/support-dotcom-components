import { Test, Variant } from '../../shared/types';
import { BanditData } from '../bandit/banditData';
import { selectRandomVariant } from '../bandit/banditSelection';

export function selectVariantUsingRoulette<V extends Variant, T extends Test<V>>(
    banditData: BanditData[],
    test: T,
    rand: number = Math.random(),
): V | undefined {
    const testBanditData = banditData.find((bandit) => bandit.testName === test.name);
    if (!testBanditData) {
        return selectRandomVariant(test);
    }

    const sumOfMeans = testBanditData.variants.reduce((sum, v) => sum + v.mean, 0);

    if (sumOfMeans <= 0) {
        return selectRandomVariant(test);
    }

    // Ensure no variant gets less than 10%
    const minWeight = 0.1;
    if (testBanditData.variants.length > 9) {
        return selectRandomVariant(test);
    }

    // First set weights only for variants that would fall below 10%
    let sumOfNonReservedMeans = 0;
    const minimumWeights = testBanditData.variants.map(({ variantName, mean }) => {
        const weight = mean / sumOfMeans;
        if (weight >= minWeight) {
            sumOfNonReservedMeans += mean;
        }
        return {
            variantName,
            weight: weight < minWeight ? minWeight : 0,
            mean,
        };
    });

    // Now set the weights for the other variants
    const remainder = 1 - minimumWeights.reduce((sum, v) => sum + v.weight, 0);
    const weights: { weight: number; variantName: string }[] = minimumWeights
        .map(({ variantName, weight, mean }) => ({
            variantName,
            weight: weight === 0 ? remainder * (mean / sumOfNonReservedMeans) : weight,
        }))
        .sort((a, b) => a.weight - b.weight);

    for (let i = 0, acc = 0; i < weights.length; i++) {
        const variant = weights[i];
        if (rand < variant.weight + acc) {
            return test.variants.find((v) => v.name === variant.variantName);
        }
        acc += variant.weight;
    }
}
