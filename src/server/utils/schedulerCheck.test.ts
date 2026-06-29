import { isWithinScheduler } from './schedulerCheck';

const date = (iso: string) => new Date(iso);

describe('isWithinScheduler', () => {
    it('returns true when neither start nor end is set', () => {
        expect(isWithinScheduler({}, date('2026-06-15'))).toBe(true);
    });

    it('returns true when today equals start (inclusive)', () => {
        expect(isWithinScheduler({ start: '2026-06-15' }, date('2026-06-15'))).toBe(true);
    });

    it('returns false when today is before start', () => {
        expect(isWithinScheduler({ start: '2026-06-20' }, date('2026-06-15'))).toBe(false);
    });

    it('returns true when today equals end (inclusive)', () => {
        expect(isWithinScheduler({ end: '2026-06-15' }, date('2026-06-15'))).toBe(true);
    });

    it('returns false when today is after end', () => {
        expect(isWithinScheduler({ end: '2026-06-10' }, date('2026-06-15'))).toBe(false);
    });

    it('returns true when today is within start and end', () => {
        expect(
            isWithinScheduler({ start: '2026-06-01', end: '2026-06-30' }, date('2026-06-15')),
        ).toBe(true);
    });

    it('returns false when today is before start (with both set)', () => {
        expect(
            isWithinScheduler({ start: '2026-06-20', end: '2026-06-30' }, date('2026-06-15')),
        ).toBe(false);
    });

    it('returns false when today is after end (with both set)', () => {
        expect(
            isWithinScheduler({ start: '2026-06-01', end: '2026-06-10' }, date('2026-06-15')),
        ).toBe(false);
    });

    it('returns true when only start is set and today is after start', () => {
        expect(isWithinScheduler({ start: '2026-06-01' }, date('2026-06-15'))).toBe(true);
    });

    it('returns true when only end is set and today is before end', () => {
        expect(isWithinScheduler({ end: '2026-06-30' }, date('2026-06-15'))).toBe(true);
    });
});
