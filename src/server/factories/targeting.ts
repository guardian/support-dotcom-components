import { EpicTargeting } from '../../shared/types';
import { Factory } from 'fishery';

export default Factory.define<EpicTargeting>(() => ({
    contentType: 'Article',
    sectionId: 'culture',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    isRecurringContributor: false,
    tags: [],
    showSupportMessaging: true,
    hasOptedOutOfArticleCount: false,
}));
