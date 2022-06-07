import { HeaderTest } from '@sdc/shared/types';
import { cacheAsync } from '../../lib/cache';
import { getTests } from '../testsStore';

const fetchConfiguredHeaderTestsCached = cacheAsync(() => getTests<HeaderTest>('Header'), {
    ttlSec: 60,
});

export { fetchConfiguredHeaderTestsCached };
