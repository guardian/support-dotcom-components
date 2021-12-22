import { HeaderTest } from '@sdc/shared/types';
import { cacheAsync } from '../../lib/cache';
import { isProd } from '../../lib/env';
import { fetchS3Data } from '../../utils/S3';

const fetchConfiguredHeaderTests = (): Promise<HeaderTest[] | []> => {
    const env = isProd ? 'PROD' : 'CODE';

    const key = `header/${env}/header-tests.json`;

    // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
    return fetchS3Data('gu-contributions-public', key)
        .then(JSON.parse)
        .then(json => json['tests'])
        .catch(() => []);
};

const [, fetchConfiguredHeaderTestsCached] = cacheAsync(
    () => fetchConfiguredHeaderTests(),
    60,
    `fetchConfiguredHeaderTests`,
);

export { fetchConfiguredHeaderTestsCached };
