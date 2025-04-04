import type { TargetingAbTest, Test, Variant } from '../../shared/types';
import { selectVariantUsingMVT } from '../selection/ab';
import type { ScheduledBannerDeploys } from '../tests/banners/bannerDeploySchedule';

type TargetingTestDecision = {
    canShow: boolean;
    deploySchedule?: ScheduledBannerDeploys;
    test: TargetingAbTest;
};

interface TargetingTestVariant<T> extends Variant {
    name: string;
    canShow: (targeting: T) => boolean; // Can a message be shown?
    deploySchedule?: ScheduledBannerDeploys; // Overrides default deploy schedule
}

/**
 * A targeting test seeks to understand the impact of changes to targeting rules.
 * A user is assigned to a variant in a targeting test in the usual way.
 * But the variant then determines if the user should see a message at all, based on the user's targeting data.
 * Each variant in a TargetingTest has a `canShow` function. This decides if the user can be put into a message test.
 */
export interface TargetingTest<T> extends Test<TargetingTestVariant<T>> {
    name: string;
    variants: Array<TargetingTestVariant<T>>;
    canInclude: (targeting: T) => boolean; // Can browser be included in this targeting test?
}

export const selectTargetingTest = <T>(
    mvtId: number,
    targeting: T,
    targetingTests: Array<TargetingTest<T>>,
): TargetingTestDecision | null => {
    const test: TargetingTest<T> | undefined = targetingTests.find((test) =>
        test.canInclude(targeting),
    );

    if (test) {
        const variant: TargetingTestVariant<T> = selectVariantUsingMVT(test, mvtId);
        return {
            canShow: variant.canShow(targeting),
            deploySchedule: variant.deploySchedule,
            test: {
                testName: test.name,
                variantName: variant.name,
            },
        };
    } else {
        return null;
    }
};
