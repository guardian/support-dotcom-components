import { isProd } from '../lib/env';
import fetch from 'node-fetch';

export const fetchSupportFrontendData = (endpoint: string): Promise<string> => {
    return new Promise((resolve, reject) => {
        if (!endpoint) {
            reject('{"error": "No endpoint value supplied"}');
        }

        const supportUrl = isProd
            ? 'https://support.theguardian.com'
            : 'https://support.code.dev-theguardian.com';

        const apiUrl = `${supportUrl}/${endpoint}`;

        fetch(apiUrl)
            .then((packet) => {
                if (!packet.ok) {
                    reject(`{"error": "HTTP error! Status: ${packet.status}"}`);
                }
                return packet.text();
            })
            .then((res) => resolve(res))
            .catch((err) => reject(`{"error": "Data fetch error: ${err.message}"}`));
    });
};
