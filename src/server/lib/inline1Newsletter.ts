import type { Inline1Variant } from '../../shared/types';
import { logError } from '../utils/logging';
import type { NewsletterData } from './newsletters';

export const getInline1Variant = (
    variant: Inline1Variant,
    newsletters: NewsletterData[],
): Inline1Variant | null => {
    const { message } = variant;
    if (message.type !== 'Inline1NewsletterMessage') {
        return variant;
    }

    const newsletter = newsletters.find(
        ({ identityName }) => identityName === message.newsletterId,
    );
    if (!newsletter) {
        logError(`No cached newsletter found for Inline1 newsletterId: ${message.newsletterId}`);
        return null;
    }

    return {
        ...variant,
        message: {
            ...message,
            newsletterName: newsletter.name,
            newsletterListId: newsletter.listId,
            frequency: newsletter.frequency,
            imageUrl: newsletter.illustrationSquare ?? newsletter.illustrationCard,
        },
    };
};
