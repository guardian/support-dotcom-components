import { CloudWatchClient, PutMetricDataCommand } from '@aws-sdk/client-cloudwatch';
import { StandardUnit } from '@aws-sdk/client-cloudwatch';
import throttle from 'lodash.throttle';
import { isProd } from '../lib/env';
import { credentials, region } from './aws';
import { logError } from './logging';

const cloudwatch = new CloudWatchClient({ region, credentials: credentials() });

const stage = isProd ? 'PROD' : 'CODE';
const namespace = `support-dotcom-components-${stage}`;

const ALL_METRICS = [
    'super-mode-error',
    'channel-tests-error',
    'banner-designs-load-error',
    'bandit-data-load-error',
    'bandit-selection-error',
    'promotions-fetch-error',
] as const;
type Metric = (typeof ALL_METRICS)[number];
type MetricCache = Record<Metric, number>;

const buildNewCache = (): MetricCache => {
    const result: Partial<MetricCache> = {};
    ALL_METRICS.forEach((metric) => {
        result[metric] = 0;
    });
    return result as MetricCache;
};
// Throttle cloudwatch requests to avoid high costs
let metricCache: MetricCache = buildNewCache();
const THROTTLE_SECONDS = 10;

const throttledPutAllMetrics = throttle(
    (): void => {
        const metricCacheCopy = { ...metricCache };
        // clear the cache
        metricCache = buildNewCache();

        const metricData = Object.entries(metricCacheCopy)
            .filter(([, count]) => count > 0) // ignore any with 0 instances
            .map(([metricName, count]) => ({
                MetricName: metricName,
                Value: count,
                Unit: StandardUnit.Count,
                Dimensions: [],
            }));

        if (metricData.length > 0) {
            cloudwatch
                .send(
                    new PutMetricDataCommand({
                        Namespace: namespace,
                        MetricData: metricData,
                    }),
                ).catch((error) => {
                logError(`Error putting cloudwatch metric: ${String(error)}`);
                // Assume it failed to send metrics, add them back onto metricCache
                // @ts-expect-error - Object.keys is untyped
                Object.keys(metricCacheCopy).forEach((metric: Metric) => {
                    metricCache[metric] = metricCacheCopy[metric] + metricCache[metric];
                });
            });
        }
    },
    THROTTLE_SECONDS * 1000,
    { leading: false, trailing: true },
);

export const putMetric = (metricName: Metric): void => {
    metricCache[metricName]++;
    throttledPutAllMetrics();
};
