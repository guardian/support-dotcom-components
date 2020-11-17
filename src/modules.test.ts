import { getDefaultModuleInfo, ModuleInfo } from './modules';

describe('getDefaultModuleInfo', () => {
    it('should create the expected paths', () => {
        const name = 'my-banner';
        const path = 'banners/myBanner/MyBanner';
        const expectedModuleInfo: ModuleInfo = {
            name: 'my-banner',
            srcPath: 'src/components/modules/banners/myBanner/MyBanner.tsx',
            distPath: 'dist/modules/banners/myBanner/MyBanner.js',
            endpointPath: 'my-banner.js',
            devServerPath: '/../dist/modules/banners/myBanner/MyBanner.js',
            prodServerPath: '/modules/banners/myBanner/MyBanner.js',
        };

        const moduleInfo = getDefaultModuleInfo(name, path);

        expect(moduleInfo.name).toEqual(expectedModuleInfo.name);
        expect(moduleInfo.srcPath).toEqual(expectedModuleInfo.srcPath);
        expect(moduleInfo.distPath).toEqual(expectedModuleInfo.distPath);
        expect(moduleInfo.endpointPath).toEqual(expectedModuleInfo.endpointPath);
        expect(moduleInfo.devServerPath).toEqual(expectedModuleInfo.devServerPath);
        expect(moduleInfo.prodServerPath).toEqual(expectedModuleInfo.prodServerPath);
    });
});
