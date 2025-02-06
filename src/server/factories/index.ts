import { register } from 'fishery';
import targeting from './targeting';
import test from './test';
import epicVariant from './epicVariant';
import bannerVariant from './bannerVariant';
import bannerDesign from './bannerDesign';

export const factories = register({
    targeting,
    test,
    epicVariant,
    bannerVariant,
    bannerDesign,
});
