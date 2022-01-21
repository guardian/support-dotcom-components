import { logInfo } from '../../utils/logging';
import { streamS3DataByLine } from '../../utils/S3';
import { isProd } from '../../lib/env';

const guardianWeeklyHighPropensityIds: Set<string> = new Set<string>();

const fetchHighPropensityIds = (): void => {
    logInfo('Loading guardianWeeklyHighPropensityIds...');
    streamS3DataByLine(
        'support-admin-console',
        `${isProd ? 'PROD' : 'CODE'}/guardian-weekly-propensity-test/ids.txt`,
        line => guardianWeeklyHighPropensityIds.add(line),
        () => {
            logInfo(
                `Loaded ${guardianWeeklyHighPropensityIds.size} guardianWeeklyHighPropensityIds`,
            );
        },
    );
};

fetchHighPropensityIds();

export const isGuardianWeeklyHighPropensity = (browserId: string): boolean =>
    guardianWeeklyHighPropensityIds.has(browserId);
