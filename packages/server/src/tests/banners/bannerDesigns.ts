import { BannerDesignFromTool } from '@sdc/shared/src/types';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';
import { getBannerDesigns } from '../store';

const buildBannerDesignsReloader = (): Promise<ValueReloader<BannerDesignFromTool[]>> =>
    buildReloader(getBannerDesigns, 60);

export { buildBannerDesignsReloader };
