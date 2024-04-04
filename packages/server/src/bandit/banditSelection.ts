import { EpicTest, EpicVariant } from '@sdc/shared/dist/types';
import { BanditData } from './banditData';
import { Result } from '../tests/epics/epicSelection';

function selectVariantWithHighestMean(
    testBanditData: BanditData,
    test: EpicTest,
): EpicVariant | undefined {
    const highestMeanVariant = testBanditData.variants.sort((a, b) => b.mean - a.mean)[0];

    if (!highestMeanVariant) {
        return undefined;
    }

    return test.variants.find((v) => v.name === highestMeanVariant.variantName);
}

function selectRandomVariant(testBanditData: BanditData, test: EpicTest): EpicVariant | undefined {
    const randomVariantIndex = Math.floor(Math.random() * testBanditData.variants.length);
    const chosenVariant = testBanditData.variants[randomVariantIndex];

    if (!chosenVariant) {
        return undefined;
    }

    return test.variants.find((v) => v.name === chosenVariant.variantName);
}

export function selectVariantUsingEpsilonGreedy(banditData: BanditData[], test: EpicTest): Result {
    const testBanditData = banditData.find((bandit) => bandit.testName === test.name);

    if (!testBanditData) {
        // TODO: what do we do if the bandit data isn't there for the test?
        return {};
    }

    // Choose at random with probability epsilon
    const epsilon = 0.1;
    const random = Math.random();

    if (epsilon > random) {
        const randomVariantData = selectRandomVariant(testBanditData, test);

        if (!randomVariantData) {
            // TODO: what do we do if the random variant data is undefined?
            return {};
        }

        return {
            result: { test, variant: randomVariantData },
        };
    }

    const highestMeanVariantData = selectVariantWithHighestMean(testBanditData, test);

    if (!highestMeanVariantData) {
        // TODO: what do we do if the chosen variant data is undefined?
        return {};
    }

    return {
        result: {
            test,
            variant: highestMeanVariantData,
        },
    };
}
