import { logger } from '../utils/logging';

type Cache = Record<string, unknown>;
const cache: Cache = {};

const retryIntervalMs = 20 * 1000;

/**
 * A cache that refreshes after ttlSec seconds.
 * If there are cache reads after a value has expired but before the value has been refreshed then
 * the stale data will be returned.
 *
 * If a refresh attempt fails then it will be retried after retryIntervalMs, and stale data will be returned until this
 * completes.
 *
 * @param fn        the async function for generating the data to be cached
 * @param ttlSec    time to live in seconds
 * @param key       unique cache key
 * @param warm      if true then immediately run fn
 */
export const cacheAsync = <T>(
	fn: () => Promise<T>,
	ttlSec: number,
	key: string,
	warm = false,
): [() => void, () => Promise<T>] => {
	const getValue = async (): Promise<T> => {
		if (cache[key] !== undefined) {
			return Promise.resolve(cache[key] as T);
		} else {
			// First read attempt on this key. Fetch an initial value and setup the refresh scheduler
			try {
				const result: T = await fn();
				cache[key] = result;
				return Promise.resolve(result);
			} catch (err) {
				logger.warn(
					`Failed to make initial request for ${key}: ${err}`,
				);
				return Promise.reject(
					new Error(
						`Failed to make initial request for ${key}: ${err}`,
					),
				);
			} finally {
				const scheduleRefresh = (ms: number): void => {
					setTimeout(async () => {
						try {
							cache[key] = await fn();
							scheduleRefresh(ttlSec * 1000);
						} catch (err) {
							logger.warn(
								`Error refreshing cached value for key ${key}: ${err}`,
							);
							scheduleRefresh(retryIntervalMs);
						}
					}, ms);
				};

				scheduleRefresh(ttlSec * 1000);
			}
		}
	};

	const reset = (): void => {
		cache[key] = undefined;
	};

	if (warm) {
		// Warm the cache now
		getValue();
	}

	return [reset, getValue];
};
