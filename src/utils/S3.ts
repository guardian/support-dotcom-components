import { GetObjectOutput } from 'aws-sdk/clients/s3';
import AWS from 'aws-sdk';

if (process.env.NODE_ENV === 'development') {
    AWS.config.credentials = new AWS.SharedIniFileCredentials({profile: 'membership'});
}
const S3 = new AWS.S3();

export const fetchS3Data = (bucket: string, key: string): Promise<string> => {
    return S3.getObject({
        Bucket: bucket,
        Key: key,
    })
        .promise()
        .then((result: GetObjectOutput) => {
            if (result.Body) {
                return Promise.resolve(result.Body.toString('utf-8'));
            } else {
                return Promise.reject(
                    new Error(`Missing Body in S3 response for ${bucket}/${key}`),
                );
            }
        })
        .catch(err => Promise.reject(`Failed to fetch S3 object ${bucket}/${key}: ${err}`));
};
