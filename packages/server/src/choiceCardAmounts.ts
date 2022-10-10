import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import { ChoiceCardAmounts } from '@sdc/shared/types';
import { buildReloader, ValueReloader } from './utils/valueReloader';

const getChoiceCardAmounts = (): Promise<ChoiceCardAmounts> =>
    fetchS3Data(
        'support-admin-console',
        `${isProd ? 'PROD' : 'CODE'}/configured-amounts.json`,
    ).then(JSON.parse);

const buildChoiceCardAmountsReloader = (): Promise<ValueReloader<ChoiceCardAmounts>> =>
    buildReloader(getChoiceCardAmounts, 60);

export { buildChoiceCardAmountsReloader };
