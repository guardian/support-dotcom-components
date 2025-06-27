import type { Dimension } from '@aws-sdk/client-cloudwatch';
import { PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { CloudWatchClient } from '@aws-sdk/client-cloudwatch';
import { isProd } from '../lib/env';
import { credentials, region } from './aws';
import { logError } from './logging';

const cloudwatch = new CloudWatchClient({ region, credentials: credentials() });

const stage = isProd ? 'PROD' : 'CODE';
const namespace = `support-dotcom-components-${stage}`;

type Metric =
    | 'super-mode-error'
    | 'channel-tests-error'
    | 'banner-designs-load-error'
    | 'bandit-data-load-error'
    | 'bandit-selection-error'
    | 'promotions-fetch-error';

// Sends a single metric to cloudwatch.
// Avoid doing this per-request, to avoid high costs. This should instead be called from within a ValueReloader
export const putMetric = (metricName: Metric, dimensions: Dimension[] = []): void => {
    cloudwatch
        .send(
            new PutMetricDataCommand({
                Namespace: namespace,
                MetricData: [
                    {
                        MetricName: metricName,
                        Value: 1,
                        Unit: 'Count',
                        Dimensions: dimensions,
                    },
                ],
            }),
        )
        .catch((error) => logError(`Error putting cloudwatch metric: ${error}`));
};
