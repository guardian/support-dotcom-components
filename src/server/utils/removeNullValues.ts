/*
 * Removes fields with null values from an object, recursively.
 * This is because DynamoDb can have null values for optional fields, which does not match our Typescript models, where optional fields should be undefined.
 */
export function removeNullValues(obj: object): object {
    return Object.entries(obj)
        .filter(([, v]) => v !== null)
        .reduce((acc, [k, v]) => {
            if (Array.isArray(v)) {
                return {
                    ...acc,
                    [k]: v
                        .filter((item) => item !== null)
                        .map((item) => {
                            if (item === Object(item)) {
                                return removeNullValues(item);
                            } else {
                                return item;
                            }
                        }),
                };
            } else if (v === Object(v)) {
                return {
                    ...acc,
                    [k]: removeNullValues(v),
                };
            }
            return {
                ...acc,
                [k]: v,
            };
        }, {});
}
