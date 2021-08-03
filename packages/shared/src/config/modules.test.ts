import { getDefaultModuleInfo, MODULES_VERSION } from './modules';

describe('getDefaultModuleInfo', () => {
    it('should create the expected paths', () => {
        const name = 'my-banner';
        const path = 'banners/myBanner/MyBanner';
        const expectedModuleInfo = {
            name: 'my-banner',
            srcPath: 'src/modules/banners/myBanner/MyBanner.tsx',
            distPath: `dist/modules/${MODULES_VERSION}/banners/myBanner/MyBanner.js`,
            endpointPath: `modules/${MODULES_VERSION}/banners/myBanner/MyBanner.js`,
            devServerPath: `/../../modules/dist/modules/${MODULES_VERSION}/banners/myBanner/MyBanner.js`,
        };

        const moduleInfo = getDefaultModuleInfo(name, path);

        expect(moduleInfo.name).toEqual(expectedModuleInfo.name);
        expect(moduleInfo.srcPath).toEqual(expectedModuleInfo.srcPath);
        expect(moduleInfo.distPath).toEqual(expectedModuleInfo.distPath);
        expect(moduleInfo.endpointPathBuilder(MODULES_VERSION)).toEqual(
            expectedModuleInfo.endpointPath,
        );
        expect(moduleInfo.devServerPath).toEqual(expectedModuleInfo.devServerPath);
    });
});
