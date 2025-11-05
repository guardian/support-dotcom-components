import type { AmountsTests } from '../shared/types';
import { stage } from './lib/env';
import { fetchS3Data } from './utils/S3';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

const getChoiceCardAmounts = (): Promise<AmountsTests> =>
    fetchS3Data('support-admin-console', `${stage}/configured-amounts-v3.json`).then(JSON.parse);

const buildChoiceCardAmountsReloader = (): Promise<ValueReloader<AmountsTests>> =>
    buildReloader(getChoiceCardAmounts, 60);

export { buildChoiceCardAmountsReloader };
