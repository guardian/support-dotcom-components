import { isProd } from './lib/env';
import { fetchS3Data } from './utils/S3';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

export interface ChannelSwitches {
    enableEpics: boolean;
    enableBanners: boolean;
    enableHeaders: boolean;
    enableSuperMode: boolean;
    enableHardcodedEpicTests: boolean;
    enableHardcodedBannerTests: boolean;
    enableScheduledBannerDeploys: boolean;
    enableGutterLiveblogs: boolean;
}

const getSwitches = (): Promise<ChannelSwitches> =>
    fetchS3Data('support-admin-console', `${isProd ? 'PROD' : 'CODE'}/channel-switches.json`)
        .then(JSON.parse);

const buildChannelSwitchesReloader = (): Promise<ValueReloader<ChannelSwitches>> =>
    buildReloader(getSwitches, 60);

export { buildChannelSwitchesReloader };
