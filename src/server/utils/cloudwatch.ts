import * as AWS from 'aws-sdk';
import { isProd } from '../lib/env';
import { logError } from './logging';

const cloudwatch = new AWS.CloudWatch({ region: 'eu-west-1' });

const stage = isProd ? 'PROD' : 'CODE';
const namespace = `support-dotcom-components-${stage}`;

type Metric =
    | 'super-mode-error'
    | 'channel-tests-error'
    | 'banner-designs-load-error'
    | 'bandit-data-load-error'
    | 'bandit-selection-error';

// Sends a single metric to cloudwatch.
// Avoid doing this per-request, to avoid high costs. This should instead be called from within a cacheAsync
export const putMetric = (
    metricName: Metric,
    dimensions: AWS.CloudWatch.Dimension[] = [],
): void => {
    cloudwatch
        .putMetricData({
            Namespace: namespace,
            MetricData: [
                {
                    MetricName: metricName,
                    Value: 1,
                    Unit: 'Count',
                    Dimensions: dimensions,
                },
            ],
        })
        .promise()
        .catch((error) => logError(`Error putting cloudwatch metric: ${error}`));
};
