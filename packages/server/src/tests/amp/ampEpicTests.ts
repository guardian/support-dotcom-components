import { getTests } from '../testsStore';
import { AmpEpicTest } from './ampEpicModels';
import { buildReloader, ValueReloader } from '../../utils/valueReloader';

export const buildAmpEpicTestsReloader = (): Promise<ValueReloader<AmpEpicTest[]>> =>
    buildReloader(() => getTests<AmpEpicTest>('EpicAMP'), 60);
