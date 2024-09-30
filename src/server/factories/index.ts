import { register } from 'fishery';
import targeting from './targeting';
import test from './test';
import { pageTracking, testTracking, tracking } from './tracking';
import epicVariant from './epicVariant';
import bannerVariant from './bannerVariant';
import bannerDesign from './bannerDesign';

export const factories = register({
    pageTracking,
    targeting,
    test,
    testTracking,
    tracking,
    epicVariant,
    bannerVariant,
    bannerDesign,
});
