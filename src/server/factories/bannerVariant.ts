import { BannerVariant } from '../../shared/types';
import { Factory } from 'fishery';

export default Factory.define<BannerVariant>(() => ({
    name: 'Example Banner Variant',
    template: {
        designName: 'TEST_DESIGN',
    },
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
}));
