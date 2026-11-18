import type { BannerTargeting, BannerTest } from '../../shared/types';
import type { NewslettersByIdentityName } from './newsletters';
import { getNewsletterForTestName } from './newsletters';

export const matchNewsletterTargeting = (
    test: Pick<BannerTest, 'name'>,
    targeting: Pick<BannerTargeting, 'countryCode' | 'isSignedIn' | 'userSubscriptions'>,
    newsletters: NewslettersByIdentityName,
): boolean => {
    if (!test.name.startsWith('NEWSLETTER_')) {
        return true;
    }

    const newsletter = getNewsletterForTestName(test.name, newsletters);
    if (!newsletter) {
        return false;
    }

    const isSubscribed =
        targeting.isSignedIn && targeting.userSubscriptions?.includes(newsletter.listId);

    return targeting.countryCode === 'US' && !isSubscribed;
};
