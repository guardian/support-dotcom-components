import { cacheAsync } from '../../lib/cache';
import { isProd } from '../../lib/env';
import { fetchS3Data } from '../../utils/S3';
import { AmpEpicTest } from './ampEpicModels';

/**
 * Fetches AMP epic tests configuration from the tool.
 * Everything is a 'test' in the tool, even though we do not currently support A/B testing for AMP.
 * So each test will have a single variant.
 */

const fetchAmpEpicTests = (): Promise<AmpEpicTest[]> =>
    fetchS3Data('gu-contributions-public', `epic/${isProd ? 'PROD' : 'CODE'}/amp-epic-tests.json`)
        .then(JSON.parse)
        .then(data => {
            return data.tests;
        });

export const getCachedAmpEpicTests = cacheAsync<AmpEpicTest[]>(fetchAmpEpicTests, {
    ttlSec: 60,
    warm: true,
});
