import { fetchS3Data } from '../../utils/S3';
import {
    buildBannerDeployTimesReloader,
    defaultVariantBannerDeploySchedule,
} from './bannerDeployTimes';

jest.mock('../../utils/S3', () => ({ fetchS3Data: jest.fn() }));
jest.mock('../../utils/logging', () => ({ logError: jest.fn(), logInfo: jest.fn() }));

const fetchS3DataMock = jest.mocked(fetchS3Data);
const fiveMinutesInMilliseconds = 5 * 60 * 1000;

const manualDeployTimesJson = JSON.stringify({
    UnitedKingdom: { timestamp: 0 },
    UnitedStates: { timestamp: 0 },
    Australia: { timestamp: 0 },
    RestOfWorld: { timestamp: 0 },
    EuropeanUnion: { timestamp: 0 },
});

const scheduleJson = (
    daysOfWeek: unknown,
    lastManualRedeployTimestamp?: number,
    manualRedeploysByRegion?: unknown,
): string =>
    JSON.stringify({
        daysOfWeek,
        ...(lastManualRedeployTimestamp === undefined ? {} : { lastManualRedeployTimestamp }),
        ...(manualRedeploysByRegion === undefined ? {} : { manualRedeploysByRegion }),
    });

const flushMicrotasks = async (): Promise<void> => {
    for (let i = 0; i < 5; i += 1) {
        await Promise.resolve();
    }
};

describe('BannerDeployTimesProvider Variant schedule cache', () => {
    beforeEach(() => {
        jest.useFakeTimers();
        fetchS3DataMock.mockReset();
        fetchS3DataMock.mockImplementation((_bucket, key) =>
            Promise.resolve(
                key.endsWith('variant-schedule.json')
                    ? scheduleJson([0, 1, 2, 3, 4, 5, 6])
                    : manualDeployTimesJson,
            ),
        );
    });

    afterEach(() => {
        jest.clearAllTimers();
        jest.useRealTimers();
    });

    it('loads selected weekdays and accepts an empty schedule', async () => {
        fetchS3DataMock.mockImplementation((_bucket, key) =>
            Promise.resolve(
                key.endsWith('variant-schedule.json') ? scheduleJson([]) : manualDeployTimesJson,
            ),
        );

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();

        expect(provider.getVariantSchedule()).toEqual({ daysOfWeek: [] });
    });

    it('uses the all-days fallback and retries after a cold-start read failure', async () => {
        let variantReads = 0;
        fetchS3DataMock.mockImplementation((_bucket, key) => {
            if (key.endsWith('variant-schedule.json')) {
                variantReads += 1;
                return variantReads === 1
                    ? Promise.reject(new Error('missing schedule'))
                    : Promise.resolve(scheduleJson([2, 4]));
            }
            return Promise.resolve(manualDeployTimesJson);
        });

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();

        expect(provider.getVariantSchedule()).toEqual(defaultVariantBannerDeploySchedule);
        expect(variantReads).toBe(1);

        await jest.advanceTimersByTimeAsync(fiveMinutesInMilliseconds);

        expect(provider.getVariantSchedule()).toEqual({ daysOfWeek: [2, 4] });
        expect(variantReads).toBe(2);
    });

    it('applies a changed schedule within five minutes and keeps the last good value on a failed refresh', async () => {
        let variantReads = 0;
        fetchS3DataMock.mockImplementation((_bucket, key) => {
            if (key.endsWith('variant-schedule.json')) {
                variantReads += 1;
                if (variantReads === 1) {
                    return Promise.resolve(scheduleJson([1]));
                }
                if (variantReads === 2) {
                    return Promise.resolve(
                        scheduleJson([1, 3, 5], undefined, {
                            Australia: {
                                timestamp: 1_800_000_000_000,
                                email: 'operator@example.com',
                            },
                        }),
                    );
                }
                return Promise.reject(new Error('temporary schedule read failure'));
            }
            return Promise.resolve(manualDeployTimesJson);
        });

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();
        expect(provider.getVariantSchedule()).toEqual({ daysOfWeek: [1] });

        await jest.advanceTimersByTimeAsync(fiveMinutesInMilliseconds);
        expect(provider.getVariantSchedule()).toEqual({
            daysOfWeek: [1, 3, 5],
            manualRedeploysByRegion: {
                Australia: {
                    timestamp: 1_800_000_000_000,
                    email: 'operator@example.com',
                },
            },
        });

        await jest.advanceTimersByTimeAsync(fiveMinutesInMilliseconds);
        expect(provider.getVariantSchedule()).toEqual({
            daysOfWeek: [1, 3, 5],
            manualRedeploysByRegion: {
                Australia: {
                    timestamp: 1_800_000_000_000,
                    email: 'operator@example.com',
                },
            },
        });
    });

    it('rejects invalid persisted values and keeps the default schedule', async () => {
        fetchS3DataMock.mockImplementation((_bucket, key) =>
            Promise.resolve(
                key.endsWith('variant-schedule.json')
                    ? scheduleJson([1, 7])
                    : manualDeployTimesJson,
            ),
        );

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();

        expect(provider.getVariantSchedule()).toEqual(defaultVariantBannerDeploySchedule);
    });

    it('loads a Variant-specific manual redeploy timestamp', async () => {
        fetchS3DataMock.mockImplementation((_bucket, key) =>
            Promise.resolve(
                key.endsWith('variant-schedule.json')
                    ? scheduleJson([1, 2], 1_800_000_000_000)
                    : manualDeployTimesJson,
            ),
        );

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();

        expect(provider.getVariantSchedule()).toEqual({
            daysOfWeek: [1, 2],
            lastManualRedeployTimestamp: 1_800_000_000_000,
        });
    });

    it('loads Variant-specific redeploy history by region', async () => {
        const manualRedeploysByRegion = {
            Australia: { timestamp: 1_800_000_000_000, email: 'operator@example.com' },
        };
        fetchS3DataMock.mockImplementation((_bucket, key) =>
            Promise.resolve(
                key.endsWith('variant-schedule.json')
                    ? scheduleJson([1, 2], undefined, manualRedeploysByRegion)
                    : manualDeployTimesJson,
            ),
        );

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();

        expect(provider.getVariantSchedule()).toEqual({
            daysOfWeek: [1, 2],
            manualRedeploysByRegion,
        });
    });

    it('rejects a negative Variant-specific manual redeploy timestamp', async () => {
        fetchS3DataMock.mockImplementation((_bucket, key) =>
            Promise.resolve(
                key.endsWith('variant-schedule.json')
                    ? scheduleJson([1], -1)
                    : manualDeployTimesJson,
            ),
        );

        const provider = await buildBannerDeployTimesReloader();
        await flushMicrotasks();

        expect(provider.getVariantSchedule()).toEqual(defaultVariantBannerDeploySchedule);
    });

    it('rejects invalid region names and negative regional redeploy timestamps', async () => {
        for (const manualRedeploysByRegion of [
            { InvalidRegion: { timestamp: 1, email: 'operator@example.com' } },
            { Australia: { timestamp: -1, email: 'operator@example.com' } },
        ]) {
            fetchS3DataMock.mockImplementation((_bucket, key) =>
                Promise.resolve(
                    key.endsWith('variant-schedule.json')
                        ? scheduleJson([1], undefined, manualRedeploysByRegion)
                        : manualDeployTimesJson,
                ),
            );

            const provider = await buildBannerDeployTimesReloader();
            await flushMicrotasks();

            expect(provider.getVariantSchedule()).toEqual(defaultVariantBannerDeploySchedule);
            jest.clearAllTimers();
        }
    });
});
