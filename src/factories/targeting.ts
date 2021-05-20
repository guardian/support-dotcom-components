import { Factory } from 'fishery';
import { EpicTargeting } from '../types/EpicTypes';

export default Factory.define<EpicTargeting>(() => ({
    contentType: 'Article',
    sectionName: 'culture',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    isRecurringContributor: false,
    tags: [],
    showSupportMessaging: true,
    hasOptedOutOfArticleCount: false,
}));
