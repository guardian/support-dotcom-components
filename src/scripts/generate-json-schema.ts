import * as TJS from 'typescript-json-schema';
import * as fs from 'fs';
import * as path from 'path';

const basePath = './src';

const settings = {
    required: true,
};

const compilerOptions = {
    strictNullChecks: true,
};

const program = TJS.getProgramFromFiles(
    [path.resolve('./src/types/EpicTypes.ts')],
    compilerOptions,
    basePath,
);

const schema = TJS.generateSchema(program, 'EpicPayload', settings);

const schemaPath = path.join(__dirname, '../schemas/epicPayload.schema.json');

fs.writeFile(schemaPath, JSON.stringify(schema, null, 4), 'utf8', err => {
    if (err) {
        console.log(err);
    }
});
