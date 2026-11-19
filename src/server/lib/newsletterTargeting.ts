import type { BannerTest } from '../../shared/types';
import type { NewslettersByIdentityName } from './newsletters';
import { getNewsletterForTestName } from './newsletters';

export const matchNewsletterTargeting = (
    test: Pick<BannerTest, 'name'>,
    newsletters: NewslettersByIdentityName,
): boolean => {
    if (!test.name.startsWith('NEWSLETTER_')) {
        return true;
    }

    const newsletter = getNewsletterForTestName(test.name, newsletters);
    if (!newsletter) {
        return false;
    }
    return true;
};
