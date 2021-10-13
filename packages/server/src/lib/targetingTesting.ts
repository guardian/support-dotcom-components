import { SecondaryAbTest, Test, Variant } from '@sdc/shared/types';
import { selectVariant } from './ab';

type TargetingTestDecision = SecondaryAbTest & {
    canShow: boolean;
};

interface TargetingTestVariant<T> extends Variant {
    name: string;
    canShow: (targeting: T) => boolean; // Can a message be shown?
}

export interface TargetingTest<T> extends Test<TargetingTestVariant<T>> {
    name: string;
    variants: TargetingTestVariant<T>[];
    canInclude: (targeting: T) => boolean; // Can browser be included in this targeting test?
}

export const selectTargetingTest = <T>(
    mvtId: number,
    targeting: T,
    targetingTests: TargetingTest<T>[],
): TargetingTestDecision | null => {
    const test: TargetingTest<T> | undefined = targetingTests.find(test =>
        test.canInclude(targeting),
    );

    if (test) {
        const variant: TargetingTestVariant<T> = selectVariant(test, mvtId);
        return {
            canShow: variant.canShow(targeting),
            testName: test.name,
            variantName: variant.name,
        };
    } else {
        return null;
    }
};
