import { isProd } from './lib/env';
import { logError } from './utils/logging';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

export type ContributionsOnlyCountriesConfig = {
    contributionsOnlyCountries: string[];
};

const CONTRIBUTIONS_ONLY_COUNTRIES_PATH = '.support.guardianapis.com/contributions-only-countries';

const getContributionsOnlyCountriesConfig = (): Promise<ContributionsOnlyCountriesConfig> => {
    const url = isProd
        ? `https://contributions-only-countries-api${CONTRIBUTIONS_ONLY_COUNTRIES_PATH}`
        : `https://contributions-only-countries-api-code${CONTRIBUTIONS_ONLY_COUNTRIES_PATH}`;
    return fetch(url)
        .then((response) => response.json())
        .then((data) => data as ContributionsOnlyCountriesConfig)
        .catch((error: Error) => {
            logError(`Failed to fetch contributions only countries config: ${error.message}`);
            return Promise.reject(error);
        });
};

const buildContributionsOnlyCountriesReloader = (): Promise<
    ValueReloader<ContributionsOnlyCountriesConfig>
> => buildReloader(getContributionsOnlyCountriesConfig, 60 * 60); // Refresh every hour

export { buildContributionsOnlyCountriesReloader };
