export const memoiseAsync = <T>(fn: () => Promise<T>): [() => void, () => Promise<T>] => {
    let res: T | undefined;

    const retFn = async () => {
        if (res !== undefined) {
            return res;
        }

        res = await fn();
        return res;
    };

    const resetFn = () => (res = undefined);

    return [resetFn, retFn];
};
