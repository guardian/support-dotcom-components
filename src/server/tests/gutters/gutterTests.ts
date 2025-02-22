import { gutterTestFromToolSchema, GutterTestFromTool } from '../../../shared/types';
import { getTests } from '../store';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

const buildGutterLiveblogTestsReloader = (): Promise<ValueReloader<GutterTestFromTool[]>> =>
    buildReloader(
        () => getTests<GutterTestFromTool>('GutterLiveblog', gutterTestFromToolSchema),
        60,
    );

export { buildGutterLiveblogTestsReloader };
