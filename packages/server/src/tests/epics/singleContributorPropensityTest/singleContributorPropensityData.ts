import { isProd } from '../../../lib/env';
import { streamS3DataByLine } from '../../../utils/S3';
import { logger } from '../../../utils/logging';

const singleContributorPropensityIds: Set<string> = new Set<string>();

const fetchSingleContributorPropensityIds = (): void => {
    logger.info('Loading singleContributorPropensityIds...');
    streamS3DataByLine(
        'support-admin-console',
        `${isProd ? 'PROD' : 'CODE'}/single-contributor-propensity-test/ids.txt`,
        line => singleContributorPropensityIds.add(line),
        () =>
            logger.info(
                `Loaded ${singleContributorPropensityIds.size} singleContributorPropensityIds`,
            ),
    );
};

fetchSingleContributorPropensityIds();

export const inSingleContributorPropensityTest = (id: string): boolean =>
    singleContributorPropensityIds.has(id);
