import { Factory } from 'fishery';
import type { EpicTargeting } from '../../shared/types';

export default Factory.define<EpicTargeting>(() => ({
    contentType: 'Article',
    sectionId: 'culture',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [],
    showSupportMessaging: true,
    hasOptedOutOfArticleCount: false,
}));
