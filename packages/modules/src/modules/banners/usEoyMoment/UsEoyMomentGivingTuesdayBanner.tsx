import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import getUsEoyMomentBanner from './components/getUsEoyMomentBanner';

const UsEoyMomentGivingTuesdayBanner = getUsEoyMomentBanner(true);

const unvalidated = bannerWrapper(
    UsEoyMomentGivingTuesdayBanner,
    'us-eoy-giving-tuesday-moment-banner',
);
const validated = validatedBannerWrapper(
    UsEoyMomentGivingTuesdayBanner,
    'us-eoy-giving-tuesday-moment-banner',
);

export {
    validated as UsEoyMomentGivingTuesdayBanner,
    unvalidated as UsEoyMomentGivingTuesdayBannerUnvalidated,
};
