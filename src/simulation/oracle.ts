import gaussian from "gaussian";
import type {VariantModel} from "./models";

// An "oracle" that returns the current score for a variant at the given timestep by sampling a normal distribution
export const sample = (variantModel: VariantModel, timestep: number): number => {
    const mean = variantModel.mean(timestep);
    const sd = variantModel.standardDeviation(timestep);
    return gaussian(mean, sd * sd).ppf(Math.random());
}
