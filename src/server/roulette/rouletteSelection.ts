
import { Test, Variant } from '../../shared/types';
import { BanditData } from '../bandit/banditData';
import { selectRandomVariant } from '../bandit/banditSelection';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';


export function calculateWeightsFromMeans(banditData: BanditData): { variants: string[], weights: number[] } {

    const variants = banditData.bestVariants.map(variant => variant.variantName);
    const means = banditData.bestVariants.map(variant => variant.mean);

    // Calculate the total mean.
    const totalMean = means.reduce((sum, mean) => sum + mean, 0);

    // Calculate weights proportional to the means.
    const weights: number[] = means.map(mean => Math.floor((mean / totalMean) * 100));
    return { variants, weights };
}

export function getCumulativeValues(numbers: number[]): number[] {

    const cumulativeValues: number[] = [];
    let sum = 0;
    for (const number of numbers) {
        sum += number;
        cumulativeValues.push(sum);
    }

    return cumulativeValues;
}


export function selectVariantUsingRoulette<V extends Variant, T extends Test<V>>(
    banditData: BanditData[],
    test: T,
): V | undefined {
    const testBanditData = banditData.find((bandit) => bandit.testName === test.name);
    console.log("banditData", banditData)
    console.log("Test", test);

    if (!testBanditData) {
        // We don't yet have roulette bandit data for this test, select a random variant
        console.log("RandomVariant", selectRandomVariant(test))
        return selectRandomVariant(test);
    }

    const  { variants, weights } = calculateWeightsFromMeans(testBanditData)
    console.log("Weights", weights)

    const totalWeight = weights.reduce((sum, weight) => sum + weight, 0);
    console.log("Total Weight",totalWeight)

    const cumulativeWeights= getCumulativeValues(weights);
    console.log("getCumulativeWeights",cumulativeWeights)

    const randomNumber = Math.floor(Math.random() * Math.max(...cumulativeWeights)) + 1;

    for (let i = 0; i < weights.length; i++) {
        if (randomNumber <= cumulativeWeights[i]){
          return variants[i] 
          }
        }


    return undefined;
}
