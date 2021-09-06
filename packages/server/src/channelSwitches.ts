import { cacheAsync } from './lib/cache';
import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';

interface ChannelSwitches {
    enableEpics: boolean;
    enableBanners: boolean;
    enableSuperMode: boolean;
    enableHardcodedEpicTests: boolean;
}

const getSwitches = (): Promise<ChannelSwitches> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/channel-switches.json`).then(
        JSON.parse,
    );

const [, cachedChannelSwitches] = cacheAsync<ChannelSwitches>(
    getSwitches,
    60,
    'channelSwitches',
    true,
);

export { cachedChannelSwitches };
