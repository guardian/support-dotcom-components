export const MODULES_VERSION = 'v3'; // The latest version of the modules

export interface ModuleInfo {
    name: string;
    srcPath: string; // where the source lives
    distPath: string; // where to put the built module
    endpointPathBuilder: (version?: string) => string; // path used by the client
    devServerPath: string; // local path of the modules, so we can serve them when running locally
}

export const getDefaultModuleInfo = (name: string, path: string): ModuleInfo => ({
    name: name,
    srcPath: `src/modules/${path}.tsx`,
    distPath: `dist/modules/${MODULES_VERSION}/${path}.js`,
    endpointPathBuilder: (version: string = MODULES_VERSION) => `modules/${version}/${path}.js`,
    devServerPath: `/../../modules/dist/modules/${MODULES_VERSION}/${path}.js`,
});

export const header: ModuleInfo = getDefaultModuleInfo('header', 'headers/Header');

export const signInPromptHeader: ModuleInfo = getDefaultModuleInfo(
    'sign-in-prompt-header',
    'headers/SignInPromptHeader',
);

export const moduleInfos: ModuleInfo[] = [header, signInPromptHeader];
