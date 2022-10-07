import { cacheAsync } from './lib/cache';
import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';

interface ChannelSwitches {
    enableEpics: boolean;
    enableBanners: boolean;
    enableHeaders: boolean;
    enableSuperMode: boolean;
    enableHardcodedEpicTests: boolean;
    enableHardcodedBannerTests: boolean;
    enableScheduledBannerDeploys: boolean;
}

const getSwitches = (): Promise<ChannelSwitches> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/channel-switches.json`)
        .then(JSON.parse)
        .then(switches => ({
            enableScheduledBannerDeploys: false,
            ...switches,
        }));

const cachedChannelSwitches = cacheAsync<ChannelSwitches>(getSwitches, { ttlSec: 60, warm: true });

export { cachedChannelSwitches };
