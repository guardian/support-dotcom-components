import type { BanditData } from '../server/selection/banditData';
import type { Test, Variant } from '../shared/types';

export interface SelectionAlgorithm {
    name: string;
    run: <V extends Variant, T extends Test<V>>(
        test: T,
        testBanditData?: BanditData,
    ) => V | undefined;
}

export interface VariantModel {
    name: string;
    // TODO - make total timesteps available
    mean: (timestep: number, totalTimesteps: number) => number;
    standardDeviation: (timestep: number) => number;
}

export interface Simulation {
    algorithms: SelectionAlgorithm[];
    variantsScenario: VariantModel[];
    timesteps: number;
    impressionsPerTimestep: number;
    runs: number;
}
