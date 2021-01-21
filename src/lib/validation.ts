import { EpicPayload } from '../components/modules/epics/ContributionsEpicTypes';
import { Validator } from 'jsonschema';
import * as path from 'path';
import * as fs from 'fs';
import { BannerDataRequestPayload } from '../types/BannerTypes';

const validator = new Validator(); // reuse as expensive to initialise
const epicSchemaPath = path.join(__dirname, '../schemas', 'epicPayload.schema.json');
const epicPayloadSchema = JSON.parse(fs.readFileSync(epicSchemaPath, 'utf8'));
console.log('Loaded epic payload JSON schema');

const bannerSchemaPath = path.join(__dirname, '../schemas', 'bannerPayload.schema.json');
const bannerPayloadSchema = JSON.parse(fs.readFileSync(bannerSchemaPath, 'utf8'));
console.log('Loaded banner payload JSON schema');

export class ValidationError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const validatePayload = <T>(body: any, schema: any): T => {
    const validation = validator.validate(body, schema);

    if (!validation.valid) {
        throw new ValidationError(validation.toString());
    }

    return body as T;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const validateEpicPayload = (body: any): EpicPayload =>
    validatePayload<EpicPayload>(body, epicPayloadSchema);

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/explicit-module-boundary-types
export const validateBannerPayload = (body: any): BannerDataRequestPayload =>
    validatePayload<BannerDataRequestPayload>(body, bannerPayloadSchema);
