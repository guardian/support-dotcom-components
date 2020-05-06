import { register } from 'fishery';
import variant from './variant';
import test from './test';
import targeting from './targeting';
import { pageTracking, testTracking, tracking } from './tracking';

export const factories = register({
    pageTracking,
    targeting,
    test,
    testTracking,
    tracking,
    variant,
});
