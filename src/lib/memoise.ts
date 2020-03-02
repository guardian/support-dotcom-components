export const memoise = <T>(fn: () => Promise<T>): [() => void, () => Promise<T>] => {
    let resp: T | undefined;

    const retFn = async () => {
        if (resp) {
            return resp;
        }

        resp = await fn();
        return resp;
    };

    const resetFn = () => (resp = undefined);

    return [resetFn, retFn];
};
