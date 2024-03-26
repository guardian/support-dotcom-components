import {
    buildCampaignCode,
    addTrackingParams,
    addRegionIdAndTrackingParamsToSupportUrl,
    addTrackingParamsToProfileUrl,
    addTrackingParamsToBodyLinks,
    addLabelToTracking,
    addChoiceCardsParams,
} from './tracking';
import { factories } from '../factories/';

describe('addTrackingParams', () => {
    it('should return a correctly formatted URL', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            targetingAbTest: {
                testName: 'my-tracking-test',
                variantName: 'control',
            },
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl = 'https://support.theguardian.com/contribute/climate-pledge-2019';

        const numArticles = 88;

        const got = addTrackingParams(buttonBaseUrl, trackingData, numArticles);

        const want =
            'https://support.theguardian.com/contribute/climate-pledge-2019?REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%2C%7B%22name%22%3A%22my-tracking-test%22%2C%22variant%22%3A%22control%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%7D&numArticles=88';

        expect(got).toEqual(want);
    });
    it('should return a correctly formatted URL when the base URL already has a query string', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl =
            'https://support.theguardian.com/contribute/climate-pledge-2019?foo=bar';

        const numArticles = 88;

        const got = addTrackingParams(buttonBaseUrl, trackingData, numArticles);

        const want =
            'https://support.theguardian.com/contribute/climate-pledge-2019?foo=bar&REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%7D&numArticles=88';
        expect(got).toEqual(want);
    });
});

describe('addRegionIdAndTrackingParamsToSupportUrl', () => {
    it('should return the base URL for non support URLs', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl = 'https://theguardian.com/contribute/climate-pledge-2019';

        const got = addRegionIdAndTrackingParamsToSupportUrl(buttonBaseUrl, trackingData);

        const want = 'https://theguardian.com/contribute/climate-pledge-2019';
        expect(got).toEqual(want);
    });
    it('should return a correctly formatted URL for a support URL', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const buttonBaseUrl = 'https://support.theguardian.com/contribute/climate-pledge-2019';
        const numArticles = 88;
        const countryCode = 'GB';

        const got = addRegionIdAndTrackingParamsToSupportUrl(
            buttonBaseUrl,
            trackingData,
            numArticles,
            countryCode,
        );

        const want =
            'https://support.theguardian.com/uk/contribute/climate-pledge-2019?REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%7D&numArticles=88';
        expect(got).toEqual(want);
    });
});

describe('addTrackingParamsToProfileUrl', () => {
    const trackingData = factories.tracking.build();

    it('should return the base URL for non profile URLs', () => {
        const buttonBaseUrl = 'https://support.theguardian.com/contribute';
        const got = addTrackingParamsToProfileUrl(buttonBaseUrl, trackingData);
        const want = 'https://support.theguardian.com/contribute';
        expect(got).toEqual(want);
    });
    it('should return a correctly formatted URL for a profile URL', () => {
        const buttonBaseUrl = 'https://profile.theguardian.com/register';
        const got = addTrackingParamsToProfileUrl(buttonBaseUrl, trackingData);
        const want =
            'https://profile.theguardian.com/register?componentEventParams=componentType%3DACQUISITIONS_EPIC%26componentId%3Dgdnwb_copts_memco_remote_epic_test_api%26abTestName%3Dremote_epic_test%26abTestVariant%3Dapi%26viewId%3Dk5nxn0mxg7ytwpkxuwms&returnUrl=http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit';
        expect(got).toEqual(want);
    });
    it('should return a correctly formatted URL when the base URL already has a query string', () => {
        const buttonBaseUrl = 'https://profile.theguardian.com/register?foo=bar';
        const got = addTrackingParamsToProfileUrl(buttonBaseUrl, trackingData);
        const want =
            'https://profile.theguardian.com/register?foo=bar&componentEventParams=componentType%3DACQUISITIONS_EPIC%26componentId%3Dgdnwb_copts_memco_remote_epic_test_api%26abTestName%3Dremote_epic_test%26abTestVariant%3Dapi%26viewId%3Dk5nxn0mxg7ytwpkxuwms&returnUrl=http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit';
        expect(got).toEqual(want);
    });
});

describe('buildCampaignCode', () => {
    it('returns the correct campaign code for the test and variant', () => {
        const test = factories.test.build({
            name: 'enviro_fossil_fuel_r2_Epic__no_article_count',
        });
        const variant = factories.epicVariant.build({ name: 'Control' });

        const campaignCode = buildCampaignCode(test, variant);

        expect(campaignCode).toEqual(
            'gdnwb_copts_memco_enviro_fossil_fuel_r2_Epic__no_article_count_Control',
        );
    });
});

describe('addTrackingParamsToBodyLinks', () => {
    it('adds tracking params to HTML links to the support site in the passed text', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const numArticles = 88;
        const countryCode = 'GB';
        const text =
            'Visit <a href="https://support.theguardian.com/uk/contribute/climate-pledge-2019">our support site</a> to support the Guardian';

        const textWithTracking = addTrackingParamsToBodyLinks(
            text,
            trackingData,
            numArticles,
            countryCode,
        );

        const expected =
            'Visit <a href="https://support.theguardian.com/uk/contribute/climate-pledge-2019?REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%2C%22labels%22%3A%5B%22body-link%22%5D%7D&numArticles=88">our support site</a> to support the Guardian';
        expect(textWithTracking).toEqual(expected);
    });

    it('does not add tracking params to non support site URLs', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const numArticles = 88;
        const countryCode = 'GB';
        const text = 'Visit <a href="https://example.com/example">an example site</a> over here';

        const textWithTracking = addTrackingParamsToBodyLinks(
            text,
            trackingData,
            numArticles,
            countryCode,
        );

        expect(textWithTracking).toEqual(text);
    });

    it('adds tracking params to multiple HTML links', () => {
        const trackingData = factories.tracking.build({
            ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
            campaignCode:
                'gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet',
            campaignId: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestName: '2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron',
            abTestVariant: 'v2_stay_quiet',
            referrerUrl:
                'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
        });
        const numArticles = 88;
        const countryCode = 'GB';
        const text =
            'Visit <a href="https://support.theguardian.com/one">our support site</a> to <a href="https://support.theguardian.com/two">support the Guardian</a><a href="https://example.com">No tracking</a>';

        const textWithTracking = addTrackingParamsToBodyLinks(
            text,
            trackingData,
            numArticles,
            countryCode,
        );

        const expectedTrackingParams =
            'REFPVID=k5nxn0mxg7ytwpkxuwms&INTCMP=gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet&acquisitionData=%7B%22source%22%3A%22GUARDIAN_WEB%22%2C%22componentId%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22componentType%22%3A%22ACQUISITIONS_EPIC%22%2C%22campaignCode%22%3A%22gdnwb_copts_memco_2019-10-14_moment_climate_pledge__multi_UKUS_nonenviron_v2_stay_quiet%22%2C%22abTests%22%3A%5B%7B%22name%22%3A%222019-10-14_moment_climate_pledge__multi_UKUS_nonenviron%22%2C%22variant%22%3A%22v2_stay_quiet%22%7D%5D%2C%22referrerPageviewId%22%3A%22k5nxn0mxg7ytwpkxuwms%22%2C%22referrerUrl%22%3A%22http%3A%2F%2Flocalhost%3A3000%2Fpolitics%2F2020%2Fjan%2F17%2Fuk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit%22%2C%22isRemote%22%3Atrue%2C%22labels%22%3A%5B%22body-link%22%5D%7D&numArticles=88';
        const expected = `Visit <a href="https://support.theguardian.com/one?${expectedTrackingParams}">our support site</a> to <a href="https://support.theguardian.com/two?${expectedTrackingParams}">support the Guardian</a><a href="https://example.com">No tracking</a>`;
        expect(textWithTracking).toEqual(expected);
    });
});

describe('addLabelToTracking', () => {
    it('adds a label to tracking data', () => {
        const trackingData = factories.tracking.build();

        const label = 'example-label';
        const newTrackingData = addLabelToTracking(trackingData, label);

        expect(newTrackingData.labels).toEqual([label]);
    });

    it('adds a label to tracking data, appending to the list if there are already labels', () => {
        const originalLabel = 'original-label';
        const trackingData = factories.tracking.build({
            labels: [originalLabel],
        });

        const newLabel = 'new-label';
        const newTrackingData = addLabelToTracking(trackingData, newLabel);

        expect(newTrackingData.labels).toEqual([originalLabel, newLabel]);
    });
});

describe('addChoiceCardsParams', () => {
    it('adds choice cards params to url without existing querystring', () => {
        const result = addChoiceCardsParams(
            'https://support.theguardian.com/contribute',
            'ONE_OFF',
            5,
        );
        expect(result).toEqual(
            'https://support.theguardian.com/contribute?selected-contribution-type=ONE_OFF&selected-amount=5',
        );
    });

    it('adds choice cards params to url with existing querystring', () => {
        const result = addChoiceCardsParams(
            'https://support.theguardian.com/contribute?test=test',
            'ONE_OFF',
            5,
        );
        expect(result).toEqual(
            'https://support.theguardian.com/contribute?test=test&selected-contribution-type=ONE_OFF&selected-amount=5',
        );
    });
});
