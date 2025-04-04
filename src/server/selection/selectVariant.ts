import type { Methodology, Test, Variant } from '../../shared/types';
import { selectVariantUsingMVT } from './ab';
import type { BanditData } from './banditData';
import { selectVariantUsingEpsilonGreedy } from './epsilonGreedySelection';
import { getRandomNumber } from './helpers';
import { selectVariantUsingRoulette } from './rouletteSelection';

const getBanditDataForTest = (banditData: BanditData[], testName: string): BanditData | undefined =>
    banditData.find((bandit) => bandit.testName === testName);

const selectVariantWithMethodology = <V extends Variant, T extends Test<V>>(
    test: T,
    mvtId: number,
    banditData: BanditData[],
    methodology: Methodology,
): V | undefined => {
    if (methodology.name === 'EpsilonGreedyBandit') {
        return selectVariantUsingEpsilonGreedy(
            test,
            methodology.epsilon,
            getBanditDataForTest(banditData, test.name),
        );
    }
    if (methodology.name === 'Roulette') {
        return selectVariantUsingRoulette(test, getBanditDataForTest(banditData, test.name));
    }
    return selectVariantUsingMVT<V, T>(test, mvtId);
};

/**
 * Selects a variant from the test based on any configured methodologies.
 * Defaults to an AB test.
 */
export const selectVariant = <V extends Variant, T extends Test<V>>(
    test: T,
    mvtId: number,
    banditData: BanditData[],
): { test: T; variant: V } | undefined => {
    if (test.methodologies && test.methodologies.length > 0) {
        const pickMethodology = (methodologies: Methodology[]) => {
            if (methodologies.length === 1) {
                return methodologies[0];
            } else {
                // More than one methodology, pick one of them using the mvt value
                return methodologies[getRandomNumber(test.name, mvtId) % methodologies.length];
            }
        };
        const methodology = pickMethodology(test.methodologies);

        // if the methodology should be tracked with a different name then use that
        const testWithNameExtension = {
            ...test,
            name: methodology.testName ?? test.name,
        };
        const variant = selectVariantWithMethodology<V, T>(
            testWithNameExtension,
            mvtId,
            banditData,
            methodology,
        );
        if (variant) {
            return {
                test: testWithNameExtension,
                variant,
            };
        }
    } else {
        // No configured methodology, default to AB test
        const variant = selectVariantUsingMVT<V, T>(test, mvtId);
        if (variant) {
            return {
                test,
                variant,
            };
        }
    }
    return;
};
