import { isProd } from '../lib/env';

export const fetchSupportFrontendData = (endpoint: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!endpoint) {
            reject(new Error('No endpoint value supplied'));
        }

        const supportUrl = isProd
            ? 'https://support.theguardian.com'
            : 'https://support.code.dev-theguardian.com';

        const apiUrl = `${supportUrl}/${endpoint}`;

        fetch(apiUrl)
            .then((packet) => {
                if (!packet.ok) {
                    reject(new Error(`HTTP error! Status: ${packet.status}`));
                }
                return packet.text();
            })
            .then((res) => resolve(res))
            .catch((err) => reject(new Error(`Data fetch error: ${String(err)}`)));
    });
};
