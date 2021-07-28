import { isProd } from '../lib/env';
import { fetchS3Data } from '../utils/S3';
import { EpicTest, EpicVariant } from '@sdc/shared/types';
import { containsArticleCountPlaceholder } from '@sdc/shared/lib';

type EpicTestList = 'ARTICLE' | 'ARTICLE_HOLDBACK' | 'LIVEBLOG';

type EpicTestListTestFileLookup = {
    [e in EpicTestList]: string;
};

const EPIC_TEST_LIST_FILE_LOOKUP: EpicTestListTestFileLookup = {
    ARTICLE: 'epic-tests.json',
    ARTICLE_HOLDBACK: 'epic-holdback-tests.json',
    LIVEBLOG: 'liveblog-epic-tests.json',
};

export const variantHasArticleCountCopy = (variant: EpicVariant): boolean => {
    const { paragraphs, heading, highlightedText } = variant;
    return (
        (!!heading && containsArticleCountPlaceholder(heading)) ||
        paragraphs.some(containsArticleCountPlaceholder) ||
        (!!highlightedText && containsArticleCountPlaceholder(highlightedText))
    );
};

export const fetchConfiguredEpicTests = async (testList: EpicTestList): Promise<EpicTest[]> => {
    const file = EPIC_TEST_LIST_FILE_LOOKUP[testList];
    const key = `epic/${isProd ? 'PROD' : 'CODE'}/${file}`;

    return fetchS3Data('gu-contributions-public', key)
        .then(JSON.parse)
        .then(json => {
            const { tests } = json;
            if (Array.isArray(tests)) {
                return tests.map((test: EpicTest) => {
                    const hasArticleCountInCopy = test.variants.some(variantHasArticleCountCopy);

                    return {
                        ...test,
                        hasArticleCountInCopy,
                    };
                });
            }

            return [];
        });
};
