import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import getUsEoyMomentBanner from './components/getUsEoyMomentBanner';

const UsEoyMomentBanner = getUsEoyMomentBanner(false);

const unvalidated = bannerWrapper(UsEoyMomentBanner, 'us-eoy-moment-banner');
const validated = validatedBannerWrapper(UsEoyMomentBanner, 'us-eoy-moment-banner');

export { validated as UsEoyMomentBanner, unvalidated as UsEoyMomentBannerUnvalidated };
