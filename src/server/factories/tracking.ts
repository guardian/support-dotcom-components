import { TestTracking, Tracking } from '../../shared/types';
import { Factory } from 'fishery';

export const testTracking = Factory.define<TestTracking>(() => ({
    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
    campaignId: 'remote_epic_test',
    abTestName: 'remote_epic_test',
    abTestVariant: 'api',
    componentType: 'ACQUISITIONS_EPIC',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
}));

export const tracking = Factory.define<Tracking>(({ factories }) => ({
    ...factories.testTracking.build(),
}));
