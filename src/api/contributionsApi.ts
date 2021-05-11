import { isProd } from '../lib/env';
import { fetchS3Data } from '../utils/S3';
import { EpicTests } from '../types/EpicTypes';

type EpicTestList = 'ARTICLE' | 'ARTICLE_HOLDBACK' | 'LIVEBLOG';

type EpicTestListTestFileLookup = {
    [e in EpicTestList]: string;
};

const EPIC_TEST_LIST_FILE_LOOKUP: EpicTestListTestFileLookup = {
    ARTICLE: 'epic-tests.json',
    ARTICLE_HOLDBACK: 'epic-holdback-tests.json',
    LIVEBLOG: 'liveblog-epic-tests.json',
};

export const fetchConfiguredEpicTests = async (testList: EpicTestList): Promise<EpicTests> => {
    const file = EPIC_TEST_LIST_FILE_LOOKUP[testList];
    const key = `epic/${isProd ? 'PROD' : 'CODE'}/${file}`;

    return fetchS3Data('gu-contributions-public', key).then(JSON.parse);
};
