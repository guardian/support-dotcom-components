import { cacheAsync } from '../../lib/cache';
import { BannerTest } from '../../types/BannerTypes';
import { getTests } from './bannerTests';

const [, getCachedTests] = cacheAsync<BannerTest[]>(getTests, 60, 'bannerTests');

export { getCachedTests };
