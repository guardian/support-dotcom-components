import type { HeaderTestFromTool } from '../../../shared/types';
import { headerTestFromToolSchema } from '../../../shared/types';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { getTests } from '../store';

const buildHeaderTestsReloader = (): Promise<ValueReloader<HeaderTestFromTool[]>> =>
    buildReloader(() => getTests<HeaderTestFromTool>('Header', headerTestFromToolSchema), 60);

export { buildHeaderTestsReloader };
