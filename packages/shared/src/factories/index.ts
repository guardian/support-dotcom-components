import { register } from 'fishery';
import targeting from './targeting';
import test from './test';
import { pageTracking, testTracking, tracking } from './tracking';
import variant from './variant';

export const factories = register({
	pageTracking,
	targeting,
	test,
	testTracking,
	tracking,
	variant,
});
