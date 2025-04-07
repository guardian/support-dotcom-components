import seedrandom from 'seedrandom';
import type { Test, Variant } from '../../shared/types';
import { putMetric } from '../utils/cloudwatch';
import { logError } from '../utils/logging';

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
