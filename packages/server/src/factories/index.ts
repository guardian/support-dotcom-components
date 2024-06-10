import { register } from 'fishery';
import epicTargeting from './epicTargeting';
import test from './test';
import { pageTracking, testTracking, tracking } from './tracking';
import epicVariant from './epicVariant';
import bannerVariant from './bannerVariant';
import bannerDesign from './bannerDesign';
import bannerTargeting from './bannerTargeting';

export const factories = register({
    pageTracking,
    bannerTargeting,
    epicTargeting,
    test,
    testTracking,
    tracking,
    epicVariant,
    bannerVariant,
    bannerDesign,
});
