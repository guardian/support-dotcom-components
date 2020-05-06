import { Factory } from 'fishery';
import {
    EpicTestTracking,
    EpicPageTracking,
    EpicTracking,
} from '../components/ContributionsEpicTypes';

export const pageTracking = Factory.define<EpicPageTracking>(() => ({
    ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
    ophanComponentId: 'ACQUISITIONS_EPIC',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl:
        'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
}));

export const testTracking = Factory.define<EpicTestTracking>(() => ({
    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
    campaignId: 'remote_epic_test',
    abTestName: 'remote_epic_test',
    abTestVariant: 'api',
}));

export const tracking = Factory.define<EpicTracking>(({ factories }) => ({
    ...factories.pageTracking.build(),
    ...factories.testTracking.build(),
}));
