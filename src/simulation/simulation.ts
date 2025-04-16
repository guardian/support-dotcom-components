import type {BanditData} from "../server/selection/banditData";
import {selectVariantUsingEpsilonGreedy} from "../server/selection/epsilonGreedySelection";
import {selectVariantUsingRoulette} from "../server/selection/rouletteSelection";
import type {Test, Variant} from "../shared/types";
import gaussian from 'gaussian';

interface SelectionAlgorithm {
    name: string;
    run: <V extends Variant, T extends Test<V>>(test: T, testBanditData?: BanditData) => V | undefined;
}

interface VariantModel {
    mean: (timestep: number) => number;
    standardDeviation: (timestep: number) => number;
}

interface Simulation<V extends Variant, T extends Test<V>> {
    test: T;
    algorithms: SelectionAlgorithm[];
    variantsScenario: VariantModel[];
    timesteps: number;
    impressionsPerTimestep: number;
    runs: number;
}

const run = <V extends Variant, T extends Test<V>>(simulation: Simulation<V,T>) => {
    for (const algorithm of simulation.algorithms) {
        let banditData: BanditData = {
            testName: test.name,
            variants: [],
            bestVariants: [],
        }
        for (let run = 0; run < simulation.runs; run++) {
            for (let timestep = 0; timestep < simulation.timesteps; timestep++) {
                for (let impression = 0; impression < simulation.impressionsPerTimestep; impression++) {
                    // pick a variant for this impression
                    const variant = algorithm.run(simulation.test, banditData);
                }
                // update banditData by sampling using each variantModel
                for (const variant of simulation.variantsScenario) {
                    const mean = variant.mean(timestep);
                    const sd = variant.standardDeviation(timestep);
                    const value = gaussian(mean, sd*sd).ppf(Math.random());
                }
            }
        }
    }
}

run<Variant,Test<Variant>>({
    test: {
        channel: 'Epic',
        name: 'my-test',
        status: 'Live',
        priority: 1,
        variants: [
            { name: 'v1' },
            { name: 'v2' },
        ],
    },
    algorithms: [
        {
            name: 'roulette',
            run: selectVariantUsingRoulette,
        },
        {
            name: 'epsilon-greedy',
            run: (test, testBanditData) => selectVariantUsingEpsilonGreedy(
                test,
                0.5,
                testBanditData
            ),
        }
    ],
    variantsScenario: [
        {
            mean: (timestep) => 1*timestep,
            standardDeviation: (timestep) => 0.1,
        },
        {
            mean: (timestep) => 2*timestep,
            standardDeviation: (timestep) => 0.1,
        },
    ],
    timesteps: 1,
    impressionsPerTimestep: 1,
    runs: 1,
});
