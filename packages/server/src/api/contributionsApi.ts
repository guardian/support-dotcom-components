import { containsArticleCountPlaceholder } from '@sdc/shared/lib';
import { EpicTest, EpicVariant } from '@sdc/shared/types';
import { ChannelTypes, getTests } from '../tests/testsStore';

export const variantHasArticleCountCopy = (variant: EpicVariant): boolean => {
    const { paragraphs, heading, highlightedText } = variant;
    return (
        (!!heading && containsArticleCountPlaceholder(heading)) ||
        paragraphs.some(containsArticleCountPlaceholder) ||
        (!!highlightedText && containsArticleCountPlaceholder(highlightedText))
    );
};

export const fetchConfiguredEpicTests = async (channel: ChannelTypes): Promise<EpicTest[]> => {
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
