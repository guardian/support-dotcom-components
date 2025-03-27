import { Test, Variant } from '../../shared/types';
import { BanditData } from '../bandit/banditData';
import { selectRandomVariant } from '../bandit/banditSelection';

const calculateWeight = (min: number, mean: number, variantCount: number, sumOfMeans: number) =>
    min + (1 - variantCount * min) * (mean / sumOfMeans);

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
            weight: calculateWeight(minWeight, mean, testBanditData.variants.length, sumOfMeans),
        }))
        .sort((a, b) => a.weight - b.weight);

    for (let i = 0, acc = 0; i < variantsWithWeights.length; i++) {
        const variant = variantsWithWeights[i];
        if (rand < variant.weight + acc) {
            return test.variants.find((v) => v.name === variant.variantName);
        }
        acc += variant.weight;
    }
}
