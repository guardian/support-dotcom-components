import { containsArticleCountPlaceholder } from '@sdc/shared/lib';
import { EpicTest, EpicTestProcessed, EpicTestSchema, EpicVariant } from '@sdc/shared/types';
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

const fetchConfiguredEpicTests = (channel: ChannelTypes) => (): Promise<EpicTestProcessed[]> => {
    return getTests<EpicTest>(channel, EpicTestSchema).then((tests) => {
        return tests.map((test: EpicTest) => {
            const hasArticleCountInCopy = test.variants.some(variantHasArticleCountCopy);

            return {
                ...test,
                hasArticleCountInCopy,
            };
        });
    });
};

export const buildEpicTestsReloader = (): Promise<ValueReloader<EpicTestProcessed[]>> =>
    buildReloader(fetchConfiguredEpicTests('Epic'), 60);

export const buildEpicLiveblogTestsReloader = (): Promise<ValueReloader<EpicTestProcessed[]>> =>
    buildReloader(fetchConfiguredEpicTests('EpicLiveblog'), 60);
