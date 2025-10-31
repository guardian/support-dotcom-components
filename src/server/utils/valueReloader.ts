import { logError } from './logging';

export interface ValueProvider<T> {
    get(): T;
}

/**
 * Reloads the value every ttlSec seconds using the given async load function.
 * Must have an initial value.
 * If reload fails then get() returns the old value until it next succeeds.
 */
export class ValueReloader<T> implements ValueProvider<T> {
    value: T;
    ttlSec: number;
    load: () => Promise<T>;

    constructor(initial: T, load: () => Promise<T>, ttlSec: number) {
        this.value = initial;
        this.load = load;
        this.ttlSec = ttlSec;

        this.refresh();
    }

    get(): T {
        return this.value;
    }

    refresh(): void {
        this.load()
            .then((result) => (this.value = result))
            .catch((err: unknown) => {
                logError(`ValueReloader: failed to reload value: ${String(err)}`);
            })
            .finally(() => {
                setTimeout(() => {
                    this.refresh();
                }, this.ttlSec * 1000);
            });
    }
}
// Builds a ValueReloader with an initial value preloaded, for use on startup where there is no fallback value
export const buildReloader = <T>(
    load: () => Promise<T>,
    ttlSec: number,
): Promise<ValueReloader<T>> =>
    load().then((initialValue) => new ValueReloader(initialValue, load, ttlSec));
