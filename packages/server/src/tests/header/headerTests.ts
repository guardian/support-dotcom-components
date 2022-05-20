import { HeaderTest } from '@sdc/shared/types';
import { cacheAsync } from '../../lib/cache';
import { isProd } from '../../lib/env';
import { fetchS3Data } from '../../utils/S3';
import { getTests } from '../testsStore';

const fetchConfiguredHeaderTests = (): Promise<HeaderTest[] | []> => {
    const env = isProd ? 'PROD' : 'CODE';

    const key = `header/${env}/header-tests.json`;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return fetchS3Data('gu-contributions-public', key)
        .then(JSON.parse)
        .then(json => json['tests'])
        .catch(() => []);
};

const fetchConfiguredHeaderTestsCached = cacheAsync(() => getTests<HeaderTest>('Header'), {
    ttlSec: 60,
});

export { fetchConfiguredHeaderTestsCached };
