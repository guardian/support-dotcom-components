import type { BannerTest } from '../../shared/types/abTests/banner';
import type { EpicTest } from '../../shared/types/abTests/epic';
import type { GutterTest } from '../../shared/types/abTests/gutter';
import type { HeaderTest } from '../../shared/types/abTests/header';

type Test = BannerTest | EpicTest | GutterTest | HeaderTest;

export const isHoldbackTest = (test: Test): boolean => {
    return test.name.includes('HOLDBACK');
};

export const matchesHoldbackRequirement = (
    test: Test,
    inHoldbackGroup: boolean | undefined,
): boolean => {
    const testIsHoldback = isHoldbackTest(test);
    // If test is a holdback test, only show it to users in the holdback group
    // If test is not a holdback test, show it to users not in the holdback group
    return testIsHoldback === (inHoldbackGroup === true);
};
