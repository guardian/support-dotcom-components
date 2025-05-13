import AWS from 'aws-sdk';
import { isDev } from '../lib/env';

export const getInstanceId = (): Promise<string> =>
    new Promise((resolve, reject) => {
        if (isDev) {
            resolve('local');
        }

        const service = new AWS.MetadataService();
        service.request('/latest/meta-data/instance-id', function (err, data) {
            // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- this is how you check for error
            if (err) {
                reject(err);
            }
            resolve(data);
        });
    });
