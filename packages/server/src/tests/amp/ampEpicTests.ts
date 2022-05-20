import { cacheAsync } from '../../lib/cache';
import { getTests } from '../testsStore';
import { AmpEpicTest } from './ampEpicModels';

/**
 * Fetches AMP epic tests configuration from the tool.
 * Everything is a 'test' in the tool, even though we do not currently support A/B testing for AMP.
 * So each test will have a single variant.
 */

export const getCachedAmpEpicTests = cacheAsync<AmpEpicTest[]>(() => getTests<AmpEpicTest>('EpicAMP'), {
    ttlSec: 60,
    warm: true,
});
