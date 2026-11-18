import type {
    NewsletterApiData,
    NewslettersApiAllNewslettersResponse,
} from '@guardian/newsletter-types';
import { ValueReloader } from '../utils/valueReloader';

export type NewsletterData = NewsletterApiData & {
    illustrationSquare?: string | null;
};

export type NewslettersByIdentityName = Map<string, NewsletterData>;

const newsletterApiUrl = 'https://newsletters.guardianapis.com/api/newsletters';

const newsletterIdentityNameByTestName = new Map<string, string>([
    ['NEWSLETTER_STAKES', 'the-stakes-2026'],
    ['NEWSLETTER_NAZA', 'documentaries'],
]);

export const fetchNewsletters = async (): Promise<NewslettersByIdentityName> => {
    const response = await fetch(newsletterApiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch newsletters: ${response.status}`);
    }

    const newslettersResponse = (await response.json()) as NewslettersApiAllNewslettersResponse;
    if (!newslettersResponse.ok) {
        throw new Error(newslettersResponse.message ?? 'Newsletter API returned an error');
    }

    const newsletters: NewslettersByIdentityName = new Map();
    newslettersResponse.data.forEach((newsletter) => {
        newsletters.set(newsletter.identityName, newsletter);
    });
    return newsletters;
};

export const buildNewslettersReloader = (): Promise<ValueReloader<NewslettersByIdentityName>> =>
    Promise.resolve(new ValueReloader(new Map(), fetchNewsletters, 5 * 60));

export const getNewsletterForTestName = (
    testName: string,
    newsletters: NewslettersByIdentityName,
): NewsletterData | undefined => {
    const identityName = newsletterIdentityNameByTestName.get(testName);

    if (identityName) {
        return newsletters.get(identityName);
    }
};

export const getPromotedNewsletterForTest = (
    testName: string,
    newsletters: NewslettersByIdentityName,
) => {
    const newsletter = getNewsletterForTestName(testName, newsletters);
    if (!newsletter) {
        return undefined;
    }

    return {
        listId: newsletter.listId,
        identityName: newsletter.identityName,
        name: newsletter.name,
        status: newsletter.status,
        frequency: newsletter.frequency,
        signUpDescription: newsletter.signUpDescription,
        illustrationCard: newsletter.illustrationCard,
        illustrationSquare:
            testName === 'NEWSLETTER_STAKES'
                ? 'https://uploads.guim.co.uk/2026/10/30/The_Stakes_image_Mobile.png'
                : newsletter.illustrationSquare,
    };
};
