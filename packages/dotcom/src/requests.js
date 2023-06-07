/**
 * @typedef {import("../../shared/src/types/targeting").BannerPayload} BannerPayload
 * @typedef {import("../../shared/src/types/targeting").EpicPayload} EpicPayload
 * @typedef {import("../../shared/src/types/targeting").HeaderPayload} HeaderPayload
 * @typedef {import("../../shared/src/types/abTests/shared").TestTracking} TestTracking
 */

/**
 * @typedef {Object} ModuleData
 * @property {string} url
 * @property {string} name
 * @property {Record<string, unknown>} props - the client doesn't need to know about the module props
 */

/**
 * @typedef {Object} ModuleDataResponse
 * @property {Object} [data] - The optional data object.
 * @property {ModuleData} data.module - The module data.
 * @property {TestTracking} data.meta - The meta information for test tracking.
 */

/**
 * @typedef {'epic' | 'liveblog-epic' | 'banner' | 'puzzles' | 'header'} ModuleType
 */

/**
 * @param {ModuleType} type
 * @returns {string | null}
 */
const getForcedVariant = type => {
    if (URLSearchParams) {
        const params = new URLSearchParams(window.location.search);
        const value = params.get(`force-${type}`);
        if (value) {
            return value;
        }
    }

    return null;
};

/**
 * @typedef { EpicPayload | BannerPayload | HeaderPayload } Payload
 */

/**
 * @param {ModuleType} type
 * @param {string} baseUrl
 * @param {Payload} payload
 * @returns {Promise<ModuleDataResponse>}
 */
const getModuleData = (type, baseUrl, payload) => {
    const forcedVariant = getForcedVariant(type);
    const queryString = forcedVariant ? `?force=${forcedVariant}` : '';
    const url = `${baseUrl}/${type}${queryString}`;

    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then(response => {
            if (!response.ok) {
                throw Error(
                    response.statusText ||
                        `Supporter Revenue ${type} | Api call returned HTTP status ${response.status}`,
                );
            }
            return response;
        })
        .then(response => response.json());
};

/**
 * @param {string} baseUrl
 * @param {EpicPayload} payload
 * @returns {Promise<ModuleDataResponse>}
 */
export const getEpic = (baseUrl, payload) => getModuleData('epic', baseUrl, payload);

/**
 * @param {string} baseUrl
 * @param {EpicPayload} payload
 * @returns {Promise<ModuleDataResponse}
 */
export const getLiveblogEpic = (baseUrl, payload) =>
    getModuleData('liveblog-epic', baseUrl, payload);

/**
 * @param {string} baseUrl
 * @param {BannerPayload} payload
 * @returns {Promise<ModuleDataResponse}
 */
export const getBanner = (baseUrl, payload) => getModuleData('banner', baseUrl, payload);

/**
 * @param {string} baseUrl
 * @param {BannerPayload} payload
 * @returns {Promise<ModuleDataResponse}
 */
export const getPuzzlesBanner = (baseUrl, payload) => getModuleData('puzzles', baseUrl, payload);

/**
 * @param {string} baseUrl
 * @param {HeaderPayload} payload
 * @returns {Promise<ModuleDataResponse}
 */
export const getHeader = (baseUrl, payload) => getModuleData('header', baseUrl, payload);
