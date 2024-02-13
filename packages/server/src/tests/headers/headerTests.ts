import { HeaderTestDB } from '@sdc/shared/types';
import { getTests } from '../store';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';
import { headerTestDBSchema } from '@sdc/shared/dist/types';

const buildHeaderTestsReloader = (): Promise<ValueReloader<HeaderTestDB[]>> =>
    buildReloader(() => getTests<HeaderTestDB>('Header', headerTestDBSchema), 60);

export { buildHeaderTestsReloader };
