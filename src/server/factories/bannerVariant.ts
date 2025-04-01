import { Factory } from 'fishery';
import type { BannerVariant } from '../../shared/types';

export default Factory.define<BannerVariant>(() => ({
    name: 'Example Banner Variant',
    template: {
        designName: 'TEST_DESIGN',
    },
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
}));
