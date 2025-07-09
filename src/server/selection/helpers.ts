import seedrandom from 'seedrandom';
import type { Test, Variant } from '../../shared/types';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';
import type { BanditVariantData } from './banditData';

export function selectRandomVariant<V extends Variant, T extends Test<V>>(test: T): V | undefined {
    const randomVariantIndex = Math.floor(Math.random() * test.variants.length);
    const randomVariantData = test.variants[randomVariantIndex];

    if (!randomVariantData) {
        logError(`Failed to select random variant for bandit test: ${test.name}`);
        putMetric('bandit-selection-error');
        return;
    }

    return randomVariantData;
}

export const getRandomNumber = (seed: string, mvtId: number | string = ''): number => {
    const rng = seedrandom(mvtId + seed);
    return Math.abs(rng.int32());
};

/**
 * It's possible for the variants in the bandit data to temporarily not match the variants in a test configuration.
 * This can happen if a variant is deleted in the RRCP, and the cached bandit data still references the deleted variant.
 * This function filters out any invalid variants.
 */
export const filterValidVariants = <V extends Variant, T extends Test<V>>(
    sortedVariantsData: BanditVariantData[],
    test: T,
): BanditVariantData[] => {
    const validVariantNames = new Set(test.variants.map((v) => v.name));
    return sortedVariantsData.filter((v) => validVariantNames.has(v.variantName));
};
