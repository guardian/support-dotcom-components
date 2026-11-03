import type { Inline1TestFromTool } from '../../../shared/types';
import { inline1TestFromToolSchema } from '../../../shared/types';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { getTests } from '../store';

export const buildInline1TestsReloader = (): Promise<ValueReloader<Inline1TestFromTool[]>> =>
    buildReloader(() => getTests<Inline1TestFromTool>('Inline1', inline1TestFromToolSchema), 60);
