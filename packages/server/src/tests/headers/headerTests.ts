import { HeaderTestFromTool } from '@sdc/shared/types';
import { getTests } from '../store';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';
import { headerTestFromToolSchema } from '@sdc/shared/dist/types';

const buildHeaderTestsReloader = (): Promise<ValueReloader<HeaderTestFromTool[]>> =>
    buildReloader(() => getTests<HeaderTestFromTool>('Header', headerTestFromToolSchema), 60);

export { buildHeaderTestsReloader };
