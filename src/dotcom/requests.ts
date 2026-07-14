import type {
    BannerPayload,
    BannerProps,
    EpicPayload,
    EpicProps,
    GutterPayload,
    GutterProps,
    HeaderPayload,
    HeaderProps,
} from '../shared/types';
import type { TestTracking } from '../shared/types/abTests/shared';

export interface ModuleData<PROPS> {
    name: string;
    props: PROPS;
}

export interface ModuleDataResponse<PROPS> {
    data?: {
        module: ModuleData<PROPS>;
        meta: TestTracking;
    };
}

type ModuleType = 'epic' | 'liveblog-epic' | 'banner' | 'header' | 'gutter-liveblog';

const getForcedVariant = (type: ModuleType): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get(`force-${type}`);
};

const getPreviewVariant = (type: ModuleType): string | null => {
    const params = new URLSearchParams(window.location.search);
    return params.get(`preview-${type}`);
};

type Payload = EpicPayload | BannerPayload | HeaderPayload | GutterPayload;

const getModuleData = <PROPS>(
    type: ModuleType,
    baseUrl: string,
    payload: Payload,
    headers?: HeadersInit,
): Promise<ModuleDataResponse<PROPS>> => {
    const forcedVariant = getForcedVariant(type);
    const previewVariant = getPreviewVariant(type);

    const queryParams = new URLSearchParams();
    if (forcedVariant) {
        queryParams.set('force', forcedVariant);
    } else if (previewVariant) {
        queryParams.set('preview', previewVariant);
    }

    const queryString = queryParams.toString();
    const url = queryString ? `${baseUrl}/${type}?${queryString}` : `${baseUrl}/${type}`;

    return fetch(url, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            ...headers,
        },
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
    headers?: HeadersInit,
): Promise<ModuleDataResponse<EpicProps>> => getModuleData('epic', baseUrl, payload, headers);

export const getLiveblogEpic = (
    baseUrl: string,
    payload: EpicPayload,
): Promise<ModuleDataResponse<EpicProps>> => getModuleData('liveblog-epic', baseUrl, payload);

export const getBanner = (
    baseUrl: string,
    payload: BannerPayload,
): Promise<ModuleDataResponse<BannerProps>> => getModuleData('banner', baseUrl, payload);

export const getGutterLiveblog = (
    baseUrl: string,
    payload: GutterPayload,
): Promise<ModuleDataResponse<GutterProps>> => getModuleData('gutter-liveblog', baseUrl, payload);

export const getHeader = (
    baseUrl: string,
    payload: HeaderPayload,
): Promise<ModuleDataResponse<HeaderProps>> => getModuleData('header', baseUrl, payload);
