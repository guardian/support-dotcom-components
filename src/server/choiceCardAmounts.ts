import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import { buildReloader, ValueReloader } from './utils/valueReloader';
import { AmountsTests } from '../shared/types';

const getChoiceCardAmounts = (): Promise<AmountsTests> =>
    fetchS3Data(
        'support-admin-console',
        `${isProd ? 'PROD' : 'CODE'}/configured-amounts-v3.json`,
    ).then(JSON.parse);

const buildChoiceCardAmountsReloader = (): Promise<ValueReloader<AmountsTests>> =>
    buildReloader(getChoiceCardAmounts, 60);

export { buildChoiceCardAmountsReloader };
