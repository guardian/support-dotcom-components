import { cacheAsync } from './lib/cache';
import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import { ChoiceCardAmounts } from '@sdc/shared/types';

const getChoiceCardAmounts = (): Promise<ChoiceCardAmounts> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/amounts.json`).then(
        JSON.parse,
    );

const [, cachedChoiceCardAmounts] = cacheAsync<ChoiceCardAmounts>(
    getChoiceCardAmounts,
    60,
    'choiceCardAmounts',
    true,
);

export { cachedChoiceCardAmounts };
