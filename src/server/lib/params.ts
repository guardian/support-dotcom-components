export interface TestVariant {
    testName: string;
    variantName: string;
}

export interface Params {
    debug?: boolean;
    force?: TestVariant;
    deviceClass?: 'tablet';
}

export const getQueryParams = (query: qs.ParsedQs): Params => {
    const { debug, force, deviceClass } = query;
    const debugNonEmpty = debug !== undefined;
    let parsedForce: TestVariant | undefined;

    if (force && typeof force === 'string') {
        const [testName, variantName] = force.split(':');
        if (testName && variantName) {
            parsedForce = { testName, variantName };
        }
    }

    // Parse deviceClass parameter - only accept 'tablet' as valid value
    const parsedDeviceClass = deviceClass === 'tablet' ? 'tablet' : undefined;

    return {
        force: parsedForce,
        debug: debugNonEmpty,
        deviceClass: parsedDeviceClass,
    };
};
