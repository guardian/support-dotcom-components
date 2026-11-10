import type { Inline1Variant } from '../../shared/types';
import { logWarn } from '../utils/logging';
import type { NewsletterData } from './newsletters';

export const getInline1Variant = (
    variant: Inline1Variant,
    newsletters: ReadonlyArray<
        Pick<
            NewsletterData,
            'identityName' | 'name' | 'listId' | 'frequency' | 'illustrationSquare'
        >
    >,
): Inline1Variant => {
    const { message } = variant;
    if (message.type !== 'Inline1NewsletterMessage') {
        return variant;
    }

    const newsletter = newsletters.find(
        ({ identityName }) => identityName === message.newsletterId,
    );
    if (!newsletter) {
        logWarn(`No cached newsletter found for Inline1 newsletterId: ${message.newsletterId}`);
        return variant;
    }

    return {
        ...variant,
        message: {
            ...message,
            newsletterName: newsletter.name,
            newsletterListId: newsletter.listId,
            frequency: newsletter.frequency,
            imageUrl: newsletter.illustrationSquare ?? message.imageUrl,
        },
    };
};
