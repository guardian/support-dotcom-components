import express, { Router } from 'express';
import { ModuleInfo, moduleInfos } from '@sdc/shared/dist/config';
import fs from 'fs';

// ES module endpoints
export const buildModulesRouter = (): Router => {
    const router = Router();

    const createEndpointForModule = (moduleInfo: ModuleInfo): void => {
        router.get(
            `/${moduleInfo.endpointPathBuilder()}`,
            async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                try {
                    const module = await fs.promises.readFile(__dirname + moduleInfo.devServerPath);

                    res.type('js');
                    res.send(module);
                } catch (error) {
                    next(error);
                }
            },
        );
    };

    moduleInfos.forEach(createEndpointForModule);

    return router;
};
