export interface ModuleInfo {
    name: string;
    endpoint: string;
    path: string;
}

export const getSrcPath: (moduleInfo: ModuleInfo) => string;
export const getDistPath: (moduleInfo: ModuleInfo) => string;

export const getDevServerPath: (moduleInfo: ModuleInfo) => string;
export const getProdServerPath: (moduleInfo: ModuleInfo) => string;

export const getEndpointPath: (moduleInfo: ModuleInfo) => string;

export const moduleInfos: ModuleInfo[];
