import * as fs from 'fs';
import type {
    BanditData,
    VariantSample
} from '../server/selection/banditData';
import {
    calculateOverallMeanForVariant
} from '../server/selection/banditData';
import { selectVariantUsingEpsilonGreedy } from '../server/selection/epsilonGreedySelection';
import { selectVariantUsingRoulette } from '../server/selection/rouletteSelection';
import type { Test, Variant } from '../shared/types';
import type { Simulation } from './models';
import {sample} from "./oracle";

const outputFilePath = './simulation_results.csv';


const run = (simulation: Simulation) => {
    // TODO - output cumulative AV
    /**
     * - cumulativeSampledMean, based on all samples so far
     * - impressions - for this timestep
     * - averageValueInGBPPerView - average sampled value for this timestep
     * - totalValueInGBP - total £ value for this timestep
     * - cumulativeValueInGBP - total £ value over all previous timesteps
     */
    fs.writeFileSync(outputFilePath, 'algorithm,run,timestep,variant,cumulativeSampledMean,impressions,averageValueInGBPPerView,totalValueInGBP,cumulativeValueInGBP\n', 'utf8');

    const test: Test<Variant> = {
        channel: 'Epic',
        name: 'simulated-test',
        status: 'Live',
        priority: 1,
        variants: simulation.variantsScenario.map(v => ({name: v.name})),
    };

    for (const algorithm of simulation.algorithms) {
        // initialise variant means to 0 at the start of the "test"
        const samples: Record<string, VariantSample[]> = {};
        const cumulativeValueInGBP: Record<string, number> = {};
        for (const variant of simulation.variantsScenario) {
            samples[variant.name] = [];
            cumulativeValueInGBP[variant.name] = 0;
        }

        for (let run = 0; run < simulation.runs; run++) {
            for (let timestep = 0; timestep < simulation.timesteps; timestep++) {
                // Calculate the means for each variant using all of the samples so far
                const banditData: BanditData = {
                    testName: test.name,
                    sortedVariants: [],
                };
                for (const variant of test.variants) {
                    const mean = calculateOverallMeanForVariant(samples[variant.name]);
                    banditData.sortedVariants.push({
                        variantName: variant.name,
                        mean,
                    });
                }
                banditData.sortedVariants = banditData.sortedVariants.sort((a, b) => b.mean - a.mean);

                // initialise impression counts for each variant to 0
                const variantImpressions: Record<string,number> = test.variants.reduce((acc, v) => (
                    {
                        ...acc,
                        [v.name]: 0,
                    }
                ), {});
                // assign impressions to variants using the algorithm
                for (
                    let impression = 0;
                    impression < simulation.impressionsPerTimestep;
                    impression++
                ) {
                    // pick a variant for this impression
                    const variant = algorithm.run(test, banditData);
                    if (variant) {
                        variantImpressions[variant.name]++;
                    }
                }
                console.log({timestep, algo: algorithm.name})
                console.log({variantImpressions})
                // update banditData by sampling using each variantModel
                for (const variant of simulation.variantsScenario) {
                    let sum = 0;
                    for (let batch = 0; batch < variantImpressions[variant.name]; batch++) {
                        const value = sample(variant, timestep, simulation.timesteps);
                        sum += value;
                    }
                    const meanValue = sum / variantImpressions[variant.name];
                    console.log({name: variant.name, meanValue})

                    const variantSample: VariantSample = {
                        variantName: variant.name,
                        views: variantImpressions[variant.name],
                        annualisedValueInGBP: meanValue * variantImpressions[variant.name],
                        annualisedValueInGBPPerView: meanValue,
                    };
                    samples[variant.name].push(variantSample);

                    cumulativeValueInGBP[variant.name] += variantSample.annualisedValueInGBP;

                    const cumulativeSampledMean = banditData.sortedVariants.find(v => v.variantName === variant.name)?.mean;
                    const row = `${algorithm.name},${run},${timestep},${variant.name},${cumulativeSampledMean},${variantSample.views},${variantSample.annualisedValueInGBPPerView},${variantSample.annualisedValueInGBP},${cumulativeValueInGBP[variant.name]}\n`;
                    fs.appendFileSync(outputFilePath, row, 'utf8');
                }
            }
        }
    }
};

// TODO - load the config from somewhere
run({
    algorithms: [
        {
            name: 'roulette',
            run: selectVariantUsingRoulette,
        },
        {
            name: 'epsilon-greedy-1',
            run: (test, testBanditData) =>
                selectVariantUsingEpsilonGreedy(test, 1, testBanditData),
        },
        {
            name: 'epsilon-greedy-0.5',
            run: (test, testBanditData) =>
                selectVariantUsingEpsilonGreedy(test, 0.5, testBanditData),
        },
    ],
    variantsScenario: [
        {
            name: 'v1',
            mean: () => 25,
            standardDeviation: (timestep) => 0.1,
        },
        {
            name: 'v2',
            mean: (timestep, totalTimesteps) => (100 * (timestep+1)) / totalTimesteps,
            standardDeviation: (timestep) => 0.1,
        },
        {
            name: 'v3',
            mean: (timestep) => Math.sin((timestep)/32)*100,
            standardDeviation: (timestep) => 0.1,
        },
    ],
    timesteps: 100,
    impressionsPerTimestep: 100,
    runs: 1,
});
