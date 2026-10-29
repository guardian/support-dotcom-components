import type { BannerTargeting, BannerTest } from '../../shared/types';
import type { NewsletterData } from './newsletters';
import { getNewsletterForTestName } from './newsletters';

export const matchNewsletterTargeting = (
    test: Pick<BannerTest, 'name'>,
    targeting: Pick<BannerTargeting, 'countryCode' | 'isSignedIn' | 'userSubscriptions'>,
    newsletters: Array<Pick<NewsletterData, 'listId'>> = [],
): boolean => {
    if (!test.name.startsWith('NEWSLETTER_')) {
        return true;
    }

    const listId = getNewsletterForTestName(test.name, newsletters)?.listId;
    const isSubscribed =
        targeting.isSignedIn &&
        listId !== undefined &&
        targeting.userSubscriptions?.includes(listId);

    return targeting.countryCode === 'US' && !isSubscribed;
};
