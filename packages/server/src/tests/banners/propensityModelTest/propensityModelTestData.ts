import { logInfo } from '../../../utils/logging';
import { streamS3DataByLine } from '../../../utils/S3';
import { isProd } from '../../../lib/env';

const guardianWeeklyHighPropensityIds: Set<string> = new Set<string>();
export const fetchHighPropensityIds = (): void => {
    logInfo('Loading guardianWeeklyHighPropensityIds...');
    streamS3DataByLine({
        bucket: 'support-admin-console',
        key: `${isProd ? 'PROD' : 'CODE'}/guardian-weekly-propensity-test/ids.txt`,
        onLine: line => guardianWeeklyHighPropensityIds.add(line),
        onComplete: () => {
            logInfo(
                `Loaded ${guardianWeeklyHighPropensityIds.size} guardianWeeklyHighPropensityIds`,
            );
        },
    });
};

export const isInPropensityTest = (browserId: string): boolean =>
    guardianWeeklyHighPropensityIds.has(browserId);
