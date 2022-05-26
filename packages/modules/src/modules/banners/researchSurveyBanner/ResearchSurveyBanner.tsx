import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getContributionsBanner } from '../contributions/ContributionsBanner';

const ResearchSurveyBanner = getContributionsBanner('#feeef7');

const unvalidated = bannerWrapper(ResearchSurveyBanner, 'research-survey-banner');
const validated = validatedBannerWrapper(ResearchSurveyBanner, 'research-survey-banner');

export { validated as ResearchSurveyBanner, unvalidated as ResearchSurveyBannerUnvalidated };
