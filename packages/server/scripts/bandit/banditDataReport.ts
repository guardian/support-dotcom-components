import { EpicTest, EpicTestFromTool, epicTestFromToolSchema } from '@sdc/shared/dist/types';
import fs from 'fs';
import { getHourlyBanditDataForTest } from '../../src/bandit/banditData';
import { getTests } from '../../src/tests/store';

const testName = process.env.TEST_NAME;
if (!testName) {
    console.log('Usage: TEST_NAME=<test_name> yarn server bandit-data-report');
    process.exit(1);
}

const writeStream = fs.createWriteStream(`../../${testName}.csv`);
writeStream.write('hour,variant,mean\n');

async function run() {
    const tests = (await getTests<EpicTestFromTool>('Epic', epicTestFromToolSchema)) as EpicTest[];
    const test = tests.find((test) => test.name === testName);
    if (test) {
        const banditData = await getHourlyBanditDataForTest(test);
        banditData.forEach((data) =>
            data.variants.forEach((variant) => {
                writeStream.write(`${data.hour},${variant.variantName},${variant.mean}\n`);
            }),
        );
    }
}

run()
    .then(() => {
        console.log(`Output to ${testName}.csv`);
        writeStream.close();
    })
    .catch((error) => {
        console.log('Error getting bandit data:', error);
        writeStream.close();
    });
