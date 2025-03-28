import type { EpicVariant } from '../../../shared/types';
import { variantHasArticleCountCopy } from './epicTests';

const baseVariant: EpicVariant = {
    name: 'v1',
    paragraphs: ['para 1', 'para 2'],
    heading: 'heading',
    highlightedText: 'highlightedText',
};

describe('variantHasArticleCountCopy', () => {
    it('should return false if no article count', () => {
        expect(variantHasArticleCountCopy(baseVariant)).toEqual(false);
    });

    it('should return true if article count in heading', () => {
        const variant = {
            ...baseVariant,
            heading: `You've read %%ARTICLE_COUNT%% articles`,
        };
        expect(variantHasArticleCountCopy(variant)).toEqual(true);
    });

    it('should return true if article count in highlightedText', () => {
        const variant = {
            ...baseVariant,
            highlightedText: `You've read %%ARTICLE_COUNT%% articles`,
        };
        expect(variantHasArticleCountCopy(variant)).toEqual(true);
    });

    it('should return true if article count in paragraphs', () => {
        const variant = {
            ...baseVariant,
            paragraphs: baseVariant.paragraphs.concat(`You've read %%ARTICLE_COUNT%% articles`),
        };
        expect(variantHasArticleCountCopy(variant)).toEqual(true);
    });
});
