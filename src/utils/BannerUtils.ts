import { countryCodeToCountryGroupId, CountryGroupId } from '../lib/geolocation';

export const flattenArray = <T>(array: T[][]): T[] => ([] as T[]).concat(...array);

export const isValidLocation = (countryCode: string, validLocations: CountryGroupId[]): boolean => {
    if (!validLocations || validLocations.length < 1) {
        return true;
    }

    return validLocations.includes(countryCodeToCountryGroupId(countryCode));
};
