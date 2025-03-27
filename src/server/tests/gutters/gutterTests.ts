import type { GutterTestFromTool } from '../../../shared/types';
import { gutterTestFromToolSchema } from '../../../shared/types';
import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { getTests } from '../store';

const buildGutterLiveblogTestsReloader = (): Promise<ValueReloader<GutterTestFromTool[]>> =>
    buildReloader(
        () => getTests<GutterTestFromTool>('GutterLiveblog', gutterTestFromToolSchema),
        60,
    );

export { buildGutterLiveblogTestsReloader };
