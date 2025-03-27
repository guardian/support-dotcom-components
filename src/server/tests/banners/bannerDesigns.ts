import type { BannerDesignFromTool } from '../../../shared/types';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { getBannerDesigns } from '../store';

const buildBannerDesignsReloader = (): Promise<ValueReloader<BannerDesignFromTool[]>> =>
    buildReloader(getBannerDesigns, 60);

export { buildBannerDesignsReloader };
