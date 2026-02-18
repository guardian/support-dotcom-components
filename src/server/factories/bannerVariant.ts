import type { BannerVariant } from '../../shared/types';

export default (overrides?: Partial<BannerVariant>): BannerVariant => ({
    name: 'Example Banner Variant',
    template: {
        designName: 'TEST_DESIGN',
    },
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    ...overrides,
});
