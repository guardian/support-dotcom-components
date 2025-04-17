import type { BanditData } from '../server/selection/banditData';
import { selectVariantUsingEpsilonGreedy } from '../server/selection/epsilonGreedySelection';
import { selectVariantUsingRoulette } from '../server/selection/rouletteSelection';
import type { Test, Variant } from '../shared/types';
import type { Simulation } from './models';
import {sample} from "./oracle";

const run = (simulation: Simulation) => {
    const test: Test<Variant> = {
        channel: 'Epic',
        name: 'simulated-test',
        status: 'Live',
        priority: 1,
        variants: simulation.variantsScenario.map(v => ({name: v.name})),
    };

    for (const algorithm of simulation.algorithms) {
        // initialise variant means to 0 at the start of the "test"
        const banditData: BanditData = {
            testName: test.name,
            sortedVariants: test.variants.map(v => ({variantName: v.name, mean: 0})),
        };
        for (let run = 0; run < simulation.runs; run++) {
            for (let timestep = 0; timestep < simulation.timesteps; timestep++) {
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
                    const value = sample(variant, timestep);
                    console.log({name: variant.name, value})
                    // TODO - update the mean in banditData
                    // TODO - output impressions/revenue
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
            name: 'epsilon-greedy',
            run: (test, testBanditData) =>
                selectVariantUsingEpsilonGreedy(test, 0.5, testBanditData),
        },
    ],
    variantsScenario: [
        {
            name: 'v1',
            mean: (timestep) => 1 * timestep,
            standardDeviation: (timestep) => 0.1,
        },
        {
            name: 'v2',
            mean: (timestep) => 2 * timestep,
            standardDeviation: (timestep) => 0.1,
        },
    ],
    timesteps: 10,
    impressionsPerTimestep: 100,
    runs: 1,
});
