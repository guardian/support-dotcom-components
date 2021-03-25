import { getDefaultModuleInfo } from './modules';

describe('getDefaultModuleInfo', () => {
    it('should create the expected paths', () => {
        const name = 'my-banner';
        const path = 'banners/myBanner/MyBanner';
        const expectedModuleInfo = {
            name: 'my-banner',
            srcPath: 'src/components/modules/banners/myBanner/MyBanner.tsx',
            distPath: 'dist/modules/v1/banners/myBanner/MyBanner.js',
            endpointPath: 'modules/v1/banners/myBanner/MyBanner.js',
            devServerPath: '/../dist/modules/v1/banners/myBanner/MyBanner.js',
        };

        const moduleInfo = getDefaultModuleInfo(name, path);

        expect(moduleInfo.name).toEqual(expectedModuleInfo.name);
        expect(moduleInfo.srcPath).toEqual(expectedModuleInfo.srcPath);
        expect(moduleInfo.distPath).toEqual(expectedModuleInfo.distPath);
        expect(moduleInfo.endpointPath('v1')).toEqual(expectedModuleInfo.endpointPath);
        expect(moduleInfo.devServerPath).toEqual(expectedModuleInfo.devServerPath);
    });
});
