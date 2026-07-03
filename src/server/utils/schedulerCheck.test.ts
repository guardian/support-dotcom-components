import { isWithinScheduler } from './schedulerCheck';

const date = (iso: string) => new Date(iso);

describe('isWithinScheduler', () => {
    it('returns true when neither start nor end is set', () => {
        expect(isWithinScheduler({}, date('2026-06-15T12:00:00Z'))).toBe(true);
    });

    it('returns true when now equals start (inclusive)', () => {
        expect(isWithinScheduler({ start: '2026-06-15T12:00' }, date('2026-06-15T12:00:00Z'))).toBe(true);
    });

    it('returns false when now is before start', () => {
        expect(isWithinScheduler({ start: '2026-06-15T12:00' }, date('2026-06-15T11:59:00Z'))).toBe(false);
    });

    it('returns true when now equals end (inclusive)', () => {
        expect(isWithinScheduler({ end: '2026-06-15T12:00' }, date('2026-06-15T12:00:00Z'))).toBe(true);
    });

    it('returns false when now is after end', () => {
        expect(isWithinScheduler({ end: '2026-06-15T12:00' }, date('2026-06-15T12:01:00Z'))).toBe(false);
    });

    it('returns true when now is within start and end', () => {
        expect(
            isWithinScheduler({ start: '2026-06-01T00:00', end: '2026-06-30T23:59' }, date('2026-06-15T12:00:00Z')),
        ).toBe(true);
    });

    it('returns false when now is before start (with both set)', () => {
        expect(
            isWithinScheduler({ start: '2026-06-20T00:00', end: '2026-06-30T23:59' }, date('2026-06-15T12:00:00Z')),
        ).toBe(false);
    });

    it('returns false when now is after end (with both set)', () => {
        expect(
            isWithinScheduler({ start: '2026-06-01T00:00', end: '2026-06-10T23:59' }, date('2026-06-15T12:00:00Z')),
        ).toBe(false);
    });

    it('returns true when only start is set and now is after start', () => {
        expect(isWithinScheduler({ start: '2026-06-01T00:00' }, date('2026-06-15T12:00:00Z'))).toBe(true);
    });

    it('returns true when only end is set and now is before end', () => {
        expect(isWithinScheduler({ end: '2026-06-30T23:59' }, date('2026-06-15T12:00:00Z'))).toBe(true);
    });
});
