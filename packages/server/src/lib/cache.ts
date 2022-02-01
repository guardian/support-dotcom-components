import memoize from 'memoizee';

type CacheableFunc<T> = () => Promise<T>;
type CachedFunc<T> = CacheableFunc<T> & { clear: () => void };

interface CacheOptions {
    ttlSec: number;
    warm?: boolean;
}

export const cacheAsync = <T>(
    fn: CacheableFunc<T>,
    { ttlSec, warm }: CacheOptions,
): CachedFunc<T> => {
    const cached = memoize(fn, { promise: true, maxAge: ttlSec * 1000, preFetch: true });

    if (warm) {
        cached();
    }

    return cached;
};
