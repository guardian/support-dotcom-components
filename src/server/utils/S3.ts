import AWS from 'aws-sdk';
import { GetObjectOutput } from 'aws-sdk/clients/s3';
import { isDev } from '../lib/env';
import readline from 'readline';
import { logError } from './logging';

const getS3 = () => {
    if (isDev) {
        AWS.config.credentials = new AWS.SharedIniFileCredentials({
            profile: 'membership',
        });
    }
    return new AWS.S3();
};

export const fetchS3Data = (bucket: string, key: string): Promise<string> => {
    return getS3()
        .getObject({
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
        .catch((err) => Promise.reject(`Failed to fetch S3 object ${bucket}/${key}: ${err}`));
};

interface S3StreamConfig {
    bucket: string;
    key: string;
    onLine: (line: string) => void;
    onComplete?: () => void;
}
export const streamS3DataByLine = ({ bucket, key, onLine, onComplete }: S3StreamConfig): void => {
    const input = getS3()
        .getObject({
            Bucket: bucket,
            Key: key,
        })
        .createReadStream();

    const stream = readline.createInterface({
        input,
        terminal: false,
    });

    stream.on('line', onLine);
    if (onComplete) {
        stream.on('close', onComplete);
    }
    stream.on('error', (error) =>
        logError(`Error streaming from S3 for ${bucket}/${key}: ${error}`),
    );
};
