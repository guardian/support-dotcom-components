import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import getGlobalNewYearBanner from './components/getGlobalNewYearBanner';

const GlobalNewYearBanner = getGlobalNewYearBanner();

const unvalidated = bannerWrapper(GlobalNewYearBanner, 'global-new-year-banner');
const validated = validatedBannerWrapper(GlobalNewYearBanner, 'global-new-year-banner');

export { validated as GlobalNewYearBanner, unvalidated as GlobalNewYearBannerUnvalidated };
