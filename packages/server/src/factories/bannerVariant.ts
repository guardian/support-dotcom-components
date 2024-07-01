import { BannerVariant } from '@sdc/shared/types';
import { Factory } from 'fishery';

export default Factory.define<BannerVariant>(() => ({
    name: 'Example Banner Variant',
    modulePathBuilder: (version) => `/version/${version}/`,
    template: {
        designName: 'TEST_DESIGN',
    },
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
}));
