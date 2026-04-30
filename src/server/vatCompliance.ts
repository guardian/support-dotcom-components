import { isProd } from './lib/env';
import { logError } from './utils/logging';
import type { ValueReloader } from './utils/valueReloader';
import { buildReloader } from './utils/valueReloader';

export type VatComplianceConfig = {
    countries: string[];
};

const getVatComplianceConfig = (): Promise<VatComplianceConfig> => {
    const domain = isProd
        ? 'https://support.theguardian.com'
        : 'https://support.code.dev-theguardian.com';
    return fetch(`${domain}/vat-compliance-config`)
        .then((response) => response.json())
        .then((data) => data as VatComplianceConfig)
        .catch((error: Error) => {
            logError(`Failed to fetch VAT compliance config: ${error.message}`);
            return Promise.reject(error);
        });
};

const buildVatComplianceReloader = (): Promise<ValueReloader<VatComplianceConfig>> =>
    buildReloader(getVatComplianceConfig, 60);

export { buildVatComplianceReloader };
