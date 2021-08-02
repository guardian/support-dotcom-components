export interface TestVariant {
    testName: string;
    variantName: string;
}

export interface Params {
    debug?: boolean;
    force?: TestVariant;
}

export const getQueryParams = (query: qs.ParsedQs): Params => {
    const { debug, force } = query;
    const debugNonEmpty = debug !== undefined;
    let parsedForce: TestVariant | undefined;

    if (force && typeof force === 'string') {
        const [testName, variantName] = force.split(':');
        if (testName && variantName) {
            parsedForce = { testName, variantName };
        }
    }

    return {
        force: parsedForce,
        debug: debugNonEmpty,
    };
};
