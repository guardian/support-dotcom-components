import {
    buildChannelSwitchesReloader,
    type ChannelSwitches,
    getAuxiaBannerRolloutPercentage,
} from './channelSwitches';
import { fetchS3Data } from './utils/S3';

jest.mock('./utils/S3', () => ({ fetchS3Data: jest.fn() }));
jest.mock('./utils/logging', () => ({ logError: jest.fn() }));

const mockFetchS3Data = jest.mocked(fetchS3Data);

describe('getAuxiaBannerRolloutPercentage', () => {
    it.each([0, 10, 50, 100])('returns configured percentage %i', (percentage) => {
        expect(
            getAuxiaBannerRolloutPercentage({
                enableAuxiaForBanners: true,
                auxiaBannerRolloutPercentage: percentage,
            } as ChannelSwitches),
        ).toBe(percentage);
    });

    it('treats an absent percentage as the legacy 100% rollout', () => {
        expect(
            getAuxiaBannerRolloutPercentage({
                enableAuxiaForBanners: true,
            } as ChannelSwitches),
        ).toBe(100);
    });

    it('returns zero when banner Auxia is disabled', () => {
        expect(
            getAuxiaBannerRolloutPercentage({
                enableAuxiaForBanners: false,
                auxiaBannerRolloutPercentage: 50,
            } as ChannelSwitches),
        ).toBe(0);
    });

    it.each([-1, 101, 10.5])('fails closed for invalid percentage %i', (percentage) => {
        expect(
            getAuxiaBannerRolloutPercentage({
                enableAuxiaForBanners: true,
                auxiaBannerRolloutPercentage: percentage,
            } as ChannelSwitches),
        ).toBe(0);
    });

    it('refreshes the effective percentage from configuration every 60 seconds', async () => {
        jest.useFakeTimers();
        const initialConfig = JSON.stringify({
            enableAuxiaForBanners: true,
            auxiaBannerRolloutPercentage: 10,
        });
        const updatedConfig = JSON.stringify({
            enableAuxiaForBanners: true,
            auxiaBannerRolloutPercentage: 50,
        });
        mockFetchS3Data
            .mockResolvedValueOnce(initialConfig)
            .mockResolvedValueOnce(initialConfig)
            .mockResolvedValueOnce(updatedConfig);

        try {
            const provider = await buildChannelSwitchesReloader();
            expect(getAuxiaBannerRolloutPercentage(provider.get())).toBe(10);

            await jest.advanceTimersByTimeAsync(59_999);
            expect(mockFetchS3Data).toHaveBeenCalledTimes(2);
            expect(getAuxiaBannerRolloutPercentage(provider.get())).toBe(10);

            await jest.advanceTimersByTimeAsync(1);
            expect(mockFetchS3Data).toHaveBeenCalledTimes(3);
            expect(getAuxiaBannerRolloutPercentage(provider.get())).toBe(50);
        } finally {
            jest.clearAllTimers();
            jest.useRealTimers();
        }
    });
});
