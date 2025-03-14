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

    const minWeight = 0.1; // Ensure no variant gets less than 10%
    const variantsWithWeights: { weight: number; variantName: string }[] = testBanditData.variants
        .map(({ variantName, mean }) => ({
            variantName,
            weight: Math.max(mean / sumOfMeans, minWeight),
        }))
        .sort((a, b) => a.weight - b.weight);

    // The sum of the weights may be greater than 1, so we now need to normalise them
    const sumOfWeights = variantsWithWeights.reduce((sum, v) => sum + v.weight, 0);
    const normalisedWeights = variantsWithWeights.map(({ variantName, weight }) => ({
        variantName,
        weight: weight / sumOfWeights,
    }));

    for (let i = 0, acc = 0; i < normalisedWeights.length; i++) {
        const variant = normalisedWeights[i];
        if (rand < variant.weight + acc) {
            return test.variants.find((v) => v.name === variant.variantName);
        }
        acc += variant.weight;
    }
}
