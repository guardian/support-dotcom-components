// import { cacheAsync } from './lib/cache';
// import { isProd } from './lib/env';
// import { fetchS3Data } from './utils/S3';
// import { ChoiceCardAmounts } from '@sdc/shared/types';

// const getChoiceCardAmounts = (): Promise<ChoiceCardAmounts> =>
//     fetchS3Data(
//         'support-admin-console',
//         `${isProd ? 'PROD' : 'CODE'}/configured-amounts.json`,
//     ).then(JSON.parse);

// const cachedChoiceCardAmounts = cacheAsync<ChoiceCardAmounts>(getChoiceCardAmounts, {
//     ttlSec: 60,
//     warm: true,
// });

// export { cachedChoiceCardAmounts };

import { cacheAsync } from './lib/cache';
import { fetchSupportFrontendData } from './utils/supportFrontend';
import { Prices } from '@sdc/shared/types';

const getProductPrices = (): Promise<Prices> => fetchSupportFrontendData('prices').then(JSON.parse);

const cachedProductPrices = cacheAsync<Prices>(getProductPrices, {
    ttlSec: 60,
    warm: true,
});

export { cachedProductPrices };
