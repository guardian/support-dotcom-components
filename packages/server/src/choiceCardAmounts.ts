import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import { AmountsTests } from '@sdc/shared/types';
import { buildReloader, ValueReloader } from './utils/valueReloader';

const getChoiceCardAmounts = (): Promise<AmountsTests> =>
    fetchS3Data(
        'support-admin-console',
        `${isProd ? 'PROD' : 'CODE'}/configured-amounts-v2.json`,
    ).then(JSON.parse);

const buildChoiceCardAmountsReloader = (): Promise<ValueReloader<AmountsTests>> =>
    buildReloader(getChoiceCardAmounts, 60);

export { buildChoiceCardAmountsReloader };
