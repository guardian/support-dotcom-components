import { register } from 'fishery';
import targeting from './targeting';
import test from './test';
import { pageTracking, testTracking, tracking } from './tracking';
import epicVariant from './epicVariant';

export const factories = register({
    pageTracking,
    targeting,
    test,
    testTracking,
    tracking,
    epicVariant,
});
