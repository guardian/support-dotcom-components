import { Test, Variant } from './variants';

const maxMvt = 1000000;

/**
 * If controlProportion is set then we use this to define the range of mvt values for the control variant.
 * Otherwise we evenly distribute all variants across maxMvt.
 *
 * If controlProportion is set then the start of the mvt range for the control is derived using a hash of the test name.
 * This is to avoid always putting the same users in the control for each test.
 *
 * So:
 * controlProportion is in [0, 1]
 * seed is in [0, maxMvt]
 * controlRange is [seed, (seed + (maxMvt * controlProportion)) % maxMvt]
 */

export const getSeed = (name: string): number => {
    let hash = 0;
    if (name.length == 0) {
        return hash;
    }
    for (let i = 0; i < name.length; i++) {
        const char = name.charCodeAt(i);
        hash = (hash << 5) - hash + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash) % maxMvt;
};

export const selectVariant = (test: Test, mvtId: number): Variant => {
    const control = test.variants.find(v => v.name.toLowerCase() === 'control');
    if (test.controlProportion && control) {
        const seed = getSeed(test.name);
        if (mvtId >= seed && mvtId < (seed + maxMvt * test.controlProportion) % maxMvt) {
            return control;
        } else {
            const otherVariants = test.variants.filter(v => v.name.toLowerCase() !== 'control');
            return otherVariants[mvtId % otherVariants.length];
        }
    }

    return test.variants[mvtId % test.variants.length];
};
