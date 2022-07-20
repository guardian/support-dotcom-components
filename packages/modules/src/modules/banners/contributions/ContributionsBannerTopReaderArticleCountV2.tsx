import { brandAlt } from '@guardian/src-foundations';
import {
    bannerWrapper,
    TopReaderArticleCountTestVariant,
    validatedBannerWrapper,
} from '../common/BannerWrapper';
import { getContributionsBanner } from './ContributionsBanner';

const ContributionsBanner = getContributionsBanner(brandAlt[400]);

const unvalidated = bannerWrapper(
    ContributionsBanner,
    'contributions-banner',
    TopReaderArticleCountTestVariant.V2_CONGRATS_LEAD,
);
const validated = validatedBannerWrapper(
    ContributionsBanner,
    'contributions-banner',
    TopReaderArticleCountTestVariant.V2_CONGRATS_LEAD,
);

export { validated as ContributionsBanner, unvalidated as ContributionsBannerUnvalidated };
