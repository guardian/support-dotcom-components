import type { BannerTargeting, BannerTest } from '../../shared/types';
import { newsletterBannerOverrides } from '../newsletterBannerOverrides';

export const matchNewsletterTargeting = (
    test: Pick<BannerTest, 'name'>,
    targeting: Pick<BannerTargeting, 'countryCode' | 'isSignedIn' | 'userSubscriptions'>,
): boolean => {
    if (!test.name.startsWith('NEWSLETTER_')) {
        return true;
    }

    const listId = newsletterBannerOverrides.promotedNewsletter?.listId;
    const isSubscribed =
        targeting.isSignedIn &&
        listId !== undefined &&
        targeting.userSubscriptions?.includes(listId);

    return targeting.countryCode === 'US' && !isSubscribed;
};
