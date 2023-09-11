import { containsArticleCountPlaceholder } from '@sdc/shared/lib';
import { EpicTest, EpicVariant } from '@sdc/shared/types';
import { ChannelTypes, getTests } from '../store';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

export const variantHasArticleCountCopy = (variant: EpicVariant): boolean => {
    const { paragraphs, heading, highlightedText } = variant;
    return (
        (!!heading && containsArticleCountPlaceholder(heading)) ||
        paragraphs.some(containsArticleCountPlaceholder) ||
        (!!highlightedText && containsArticleCountPlaceholder(highlightedText))
    );
};

const fetchConfiguredEpicTests = (channel: ChannelTypes) => (): Promise<EpicTest[]> => {
    return getTests<EpicTest>(channel).then(tests => {
        return tests.map((test: EpicTest) => {
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
