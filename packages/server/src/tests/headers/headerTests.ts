import { HeaderTest } from '@sdc/shared/types';
import { getTests } from '../store';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

const buildHeaderTestsReloader = (): Promise<ValueReloader<HeaderTest[]>> =>
    buildReloader(() => getTests<HeaderTest>('Header'), 60);

export { buildHeaderTestsReloader };
