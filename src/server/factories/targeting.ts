import type { EpicTargeting } from '../../shared/types';

export default (overrides?: Partial<EpicTargeting>): EpicTargeting => ({
    contentType: 'Article',
    sectionId: 'culture',
    shouldHideReaderRevenue: false,
    isMinuteArticle: false,
    isPaidContent: false,
    tags: [],
    showSupportMessaging: true,
    hasOptedOutOfArticleCount: false,
    ...overrides,
});
