import {
    BannerPayload,
    BannerProps,
    EpicPayload,
    EpicProps,
    HeaderPayload,
    HeaderProps,
} from '../shared/types';
import { TestTracking } from '../shared/types/abTests/shared';

export interface ModuleData<T> {
    name: string;
    props: T;
}

export interface ModuleDataResponse<T> {
    data?: {
        module: ModuleData<T>;
        meta: TestTracking;
    };
}

type ModuleType = 'epic' | 'liveblog-epic' | 'banner' | 'header';

const getForcedVariant = (type: ModuleType): string | null => {
    if (URLSearchParams) {
        const params = new URLSearchParams(window.location.search);
        const value = params.get(`force-${type}`);
        if (value) {
            return value;
        }
    }

    return null;
};

type Payload = EpicPayload | BannerPayload | HeaderPayload;

const getModuleData = <T>(
    type: ModuleType,
    baseUrl: string,
    payload: Payload,
): Promise<ModuleDataResponse<T>> => {
    const forcedVariant = getForcedVariant(type);
    const queryString = forcedVariant ? `?force=${forcedVariant}` : '';
    const url = `${baseUrl}/${type}${queryString}`;

    return fetch(url, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
    })
        .then((response: Response) => {
            if (!response.ok) {
                throw Error(
                    response.statusText ||
                        `Supporter Revenue ${type} | Api call returned HTTP status ${response.status}`,
                );
            }
            return response;
        })
        .then((response) => response.json());
};

export const getEpic = (
    baseUrl: string,
    payload: EpicPayload,
): Promise<ModuleDataResponse<EpicProps>> => getModuleData('epic', baseUrl, payload);

export const getLiveblogEpic = (
    baseUrl: string,
    payload: EpicPayload,
): Promise<ModuleDataResponse<EpicProps>> => getModuleData('liveblog-epic', baseUrl, payload);

export const getBanner = (
    baseUrl: string,
    payload: BannerPayload,
): Promise<ModuleDataResponse<BannerProps>> => getModuleData('banner', baseUrl, payload);

export const getHeader = (
    baseUrl: string,
    payload: HeaderPayload,
): Promise<ModuleDataResponse<HeaderProps>> => getModuleData('header', baseUrl, payload);
