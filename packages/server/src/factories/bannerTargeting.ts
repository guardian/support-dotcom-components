import { BannerTargeting } from '@sdc/shared/types';
import { Factory } from 'fishery';

export default Factory.define<BannerTargeting>(() => ({
    shouldHideReaderRevenue: false,
    isPaidContent: false,
    showSupportMessaging: true,
    mvtId: 3,
    countryCode: 'AU',
    hasOptedOutOfArticleCount: false,
    contentType: 'Article',
    isSignedIn: false,
    hasConsented: true,
}));
