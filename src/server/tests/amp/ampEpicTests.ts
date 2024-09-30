import { getTests } from '../store';
import { AmpEpicTest, ampEpicTestSchema } from './ampEpicModels';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

export const buildAmpEpicTestsReloader = (): Promise<ValueReloader<AmpEpicTest[]>> =>
    buildReloader(() => getTests<AmpEpicTest>('EpicAMP', ampEpicTestSchema), 60);
