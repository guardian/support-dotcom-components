import { register } from 'fishery';
import bannerDesign from './bannerDesign';
import bannerVariant from './bannerVariant';
import epicVariant from './epicVariant';
import targeting from './targeting';
import test from './test';

export const factories = register({
    targeting,
    test,
    epicVariant,
    bannerVariant,
    bannerDesign,
});
