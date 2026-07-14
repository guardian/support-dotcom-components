export interface TestVariant {
    testName: string;
    variantName: string;
}

export interface Params {
    debug?: boolean;
    force?: TestVariant;
    preview?: TestVariant;
    deviceClass?: 'tablet';
}

const parseTestVariant = (value: unknown): TestVariant | undefined => {
    if (value && typeof value === 'string') {
        const [testName, variantName] = value.split(':');
        if (testName && variantName) {
            return { testName, variantName };
        }
    }
    return undefined;
};

export const getQueryParams = (query: qs.ParsedQs): Params => {
    const { debug, force, preview, deviceClass } = query;
    const debugNonEmpty = debug !== undefined;

    // Parse deviceClass parameter - only accept 'tablet' as valid value
    const parsedDeviceClass = deviceClass === 'tablet' ? 'tablet' : undefined;

    return {
        force: parseTestVariant(force),
        preview: parseTestVariant(preview),
        debug: debugNonEmpty,
        deviceClass: parsedDeviceClass,
    };
};
