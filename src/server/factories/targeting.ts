import type { EpicTargeting } from '../../shared/types';

export default (overrides?: Partial<EpicTargeting>): EpicTargeting => ({
    sectionId: 'culture',
    shouldHideReaderRevenue: false,
    isPaidContent: false,
    tags: [],
    showSupportMessaging: true,
    hasOptedOutOfArticleCount: false,
    isSensitive: false,
    ...overrides,
});
