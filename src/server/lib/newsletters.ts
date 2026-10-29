import type {
    NewsletterApiData,
    NewslettersApiAllNewslettersResponse,
} from '@guardian/newsletter-types';
import type { ValueReloader } from '../utils/valueReloader';
import { buildReloader } from '../utils/valueReloader';

export type NewsletterData = NewsletterApiData & {
    illustrationSquare?: string | null;
};

const newsletterApiUrl = 'https://newsletters.guardianapis.com/api/newsletters';

const newsletterListIdsByTestName = new Map<string, number>([
    ['NEWSLETTER_STAKES', 6069],
    ['NEWSLETTER_NAZA', 4149],
]);

export const fetchNewsletters = async (): Promise<NewsletterData[]> => {
    const response = await fetch(newsletterApiUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch newsletters: ${response.status}`);
    }

    const newslettersResponse = (await response.json()) as NewslettersApiAllNewslettersResponse;
    if (!newslettersResponse.ok) {
        throw new Error(newslettersResponse.message ?? 'Newsletter API returned an error');
    }
    return newslettersResponse.data;
};

export const buildNewslettersReloader = (): Promise<ValueReloader<NewsletterData[]>> =>
    buildReloader(fetchNewsletters, 5 * 60);

export const getNewsletterForTestName = <T extends Pick<NewsletterData, 'listId'>>(
    testName: string,
    newsletters: T[],
): T | undefined => {
    const listId = newsletterListIdsByTestName.get(testName);

    return listId === undefined
        ? undefined
        : newsletters.find((newsletter) => newsletter.listId === listId);
};

export const getPromotedNewsletterForTest = (testName: string, newsletters: NewsletterData[]) => {
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
        illustrationSquare: newsletter.illustrationSquare,
    };
};
