import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import getElectionAuMomentBanner from './components/getElectionAuMomentBanner';

const ElectionAuMomentBanner = getElectionAuMomentBanner();

const unvalidated = bannerWrapper(ElectionAuMomentBanner, 'election-au-moment-banner');
const validated = validatedBannerWrapper(ElectionAuMomentBanner, 'election-au-moment-banner');

export { validated as ElectionAuMomentBanner, unvalidated as ElectionAuMomentBannerUnvalidated };
