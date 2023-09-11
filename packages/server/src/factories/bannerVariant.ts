import { BannerTemplate, BannerVariant } from '@sdc/shared/types';
import { Factory } from 'fishery';

export default Factory.define<BannerVariant>(() => ({
    name: 'Example Banner Variant',
    modulePathBuilder: version => `/version/${version}/`,
    template: BannerTemplate.ContributionsBanner,
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
}));
