import type { BanditData } from '../server/selection/banditData';
import { selectVariantUsingEpsilonGreedy } from '../server/selection/epsilonGreedySelection';
import { selectVariantUsingRoulette } from '../server/selection/rouletteSelection';
import type { Test, Variant } from '../shared/types';
import type { Simulation } from './models';
import {sample} from "./oracle";

const run = <V extends Variant, T extends Test<V>>(simulation: Simulation<V, T>) => {
    for (const algorithm of simulation.algorithms) {
        const banditData: BanditData = {
            testName: test.name,
            variants: [],
            bestVariants: [],
        };
        for (let run = 0; run < simulation.runs; run++) {
            for (let timestep = 0; timestep < simulation.timesteps; timestep++) {
                // initialise impressions data
                const variantImpressions: Record<string,number> = simulation.test.variants.reduce((acc, v) => (
                    {
                        ...acc,
                        [v.name]: 0,
                    }
                ), {});
                // assign impressions
                for (
                    let impression = 0;
                    impression < simulation.impressionsPerTimestep;
                    impression++
                ) {
                    // pick a variant for this impression
                    const variant = algorithm.run(simulation.test, banditData);
                    if (variant) {
                        variantImpressions[variant.name]++;
                    }
                }
                // update banditData by sampling using each variantModel
                for (const variant of simulation.variantsScenario) {
                    const value = sample(variant, timestep);
                    // TODO - update the mean in banditData
                    // TODO - output impressions/revenue
                }
            }
        }
    }
};

// TODO - load the config from somewhere
run<Variant, Test<Variant>>({
    test: {
        channel: 'Epic',
        name: 'my-test',
        status: 'Live',
        priority: 1,
        variants: [{ name: 'v1' }, { name: 'v2' }],
    },
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
    timesteps: 1,
    impressionsPerTimestep: 1,
    runs: 1,
});
