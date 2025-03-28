import type { ValueReloader } from '../../utils/valueReloader';
import { buildReloader } from '../../utils/valueReloader';
import { getTests } from '../store';
import type { AmpEpicTest} from './ampEpicModels';
import { ampEpicTestSchema } from './ampEpicModels';

export const buildAmpEpicTestsReloader = (): Promise<ValueReloader<AmpEpicTest[]>> =>
    buildReloader(() => getTests<AmpEpicTest>('EpicAMP', ampEpicTestSchema), 60);
