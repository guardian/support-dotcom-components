import { isProd } from '../../../lib/env';
import { streamS3DataByLine } from '../../../utils/S3';
import { logInfo } from '../../../utils/logging';

const singleContributorPropensityIds: Set<string> = new Set<string>();

const fetchSingleContributorPropensityIds = (): void => {
    logInfo('Loading singleContributorPropensityIds...');
    logInfo(`MEMORY1: ${process.memoryUsage().heapUsed / 1024 / 1024}`);
    streamS3DataByLine(
        'support-admin-console',
        `${isProd ? 'PROD' : 'CODE'}/single-contributor-propensity-test/ids.txt`,
        line => {
            if (singleContributorPropensityIds.size % 10000 === 0) {
                logInfo(
                    `...got ${singleContributorPropensityIds.size} singleContributorPropensityIds`,
                );
            }
            singleContributorPropensityIds.add(line);
        },
        () => {
            logInfo(`Loaded ${singleContributorPropensityIds.size} singleContributorPropensityIds`);
            logInfo(`MEMORY2: ${process.memoryUsage().heapUsed / 1024 / 1024}`);
        },
    );
};

fetchSingleContributorPropensityIds();

export const inSingleContributorPropensityTest = (id: string): boolean =>
    singleContributorPropensityIds.has(id);
