import { EpicPayload } from '../components/ContributionsEpicTypes';
import { Validator } from 'jsonschema';
import * as path from 'path';
import * as fs from 'fs';

const validator = new Validator(); // reuse as expensive to initialise
const schemaPath = path.join(__dirname, '../schemas', 'epicPayload.schema.json');
const epicPayloadSchema = JSON.parse(fs.readFileSync(schemaPath, 'utf8'));
console.log('Loaded epic payload JSON schema');

export class ValidationError extends Error {}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const validatePayload = (body: any): EpicPayload => {
    const validation = validator.validate(body, epicPayloadSchema);

    if (!validation.valid) {
        throw new ValidationError(validation.toString());
    }

    return body as EpicPayload;
};
