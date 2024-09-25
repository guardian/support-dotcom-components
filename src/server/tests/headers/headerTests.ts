import { headerTestFromToolSchema, HeaderTestFromTool } from '../../../shared/types';
import { getTests } from '../store';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

const buildHeaderTestsReloader = (): Promise<ValueReloader<HeaderTestFromTool[]>> =>
    buildReloader(() => getTests<HeaderTestFromTool>('Header', headerTestFromToolSchema), 60);

export { buildHeaderTestsReloader };
