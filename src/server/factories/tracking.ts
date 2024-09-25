import { PageTracking, TestTracking, Tracking } from '../../shared/types';
import { Factory } from 'fishery';

export const pageTracking = Factory.define<PageTracking>(() => ({
    ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl:
        'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
}));

export const testTracking = Factory.define<TestTracking>(() => ({
    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
    campaignId: 'remote_epic_test',
    abTestName: 'remote_epic_test',
    abTestVariant: 'api',
    componentType: 'ACQUISITIONS_EPIC',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
}));

export const tracking = Factory.define<Tracking>(({ factories }) => ({
    ...factories.pageTracking.build(),
    ...factories.testTracking.build(),
}));
