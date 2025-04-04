import { containsArticleCountPlaceholder } from '../../../shared/lib';
import type { Channel, EpicTest, EpicTestFromTool, EpicVariant } from '../../../shared/types';
import { epicTestFromToolSchema } from '../../../shared/types';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { getTests } from '../store';

export const variantHasArticleCountCopy = (variant: EpicVariant): boolean => {
    const { paragraphs, heading, highlightedText } = variant;
    return (
        (!!heading && containsArticleCountPlaceholder(heading)) ||
        paragraphs.some(containsArticleCountPlaceholder) ||
        (!!highlightedText && containsArticleCountPlaceholder(highlightedText))
    );
};

const fetchConfiguredEpicTests = (channel: Channel) => (): Promise<EpicTest[]> => {
    return getTests<EpicTestFromTool>(channel, epicTestFromToolSchema).then((tests) => {
        return tests.map((test: EpicTestFromTool) => {
            const hasArticleCountInCopy = test.variants.some(variantHasArticleCountCopy);

            return {
                ...test,
                hasArticleCountInCopy,
            };
        });
    });
};

export const buildEpicTestsReloader = (): Promise<ValueReloader<EpicTest[]>> =>
    buildReloader(fetchConfiguredEpicTests('Epic'), 60);

export const buildEpicLiveblogTestsReloader = (): Promise<ValueReloader<EpicTest[]>> =>
    buildReloader(fetchConfiguredEpicTests('EpicLiveblog'), 60);
