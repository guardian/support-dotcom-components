import { Test } from '../lib/variants';
import { askFourEarningHardcodedTest } from '../tests/askFourEarning';

export const getAllHardcodedTests = async (): Promise<Test[]> => {
    const askFourEarning: Test = await askFourEarningHardcodedTest();
    return [askFourEarning];
};
