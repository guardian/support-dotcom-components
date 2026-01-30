import type { GetObjectCommandOutput } from '@aws-sdk/client-s3';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { credentials, region } from './aws';

const s3Client = new S3Client({
    credentials: credentials(),
    region,
});

export const fetchS3Data = (bucket: string, key: string): Promise<string> => {
    return s3Client
        .send(
            new GetObjectCommand({
                Bucket: bucket,
                Key: key,
            }),
        )
        .then((result: GetObjectCommandOutput) => {
            if (result.Body) {
                return Promise.resolve(result.Body.transformToString());
            } else {
                return Promise.reject(
                    new Error(`Missing Body in S3 response for ${bucket}/${key}`),
                );
            }
        })
        .catch((err) =>
            Promise.reject(Error(`Failed to fetch S3 object ${bucket}/${key}: ${err}`)),
        );
};
