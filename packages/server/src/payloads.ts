import {
    epic as epicModule,
    liveblogEpic as liveblogEpicModule,
    ModuleInfo,
    puzzlesBanner,
} from '@sdc/shared/config';
import { buildBannerCampaignCode, buildCampaignCode, getReminderFields } from '@sdc/shared/lib';
import {
    BannerProps,
    BannerTargeting,
    EpicProps,
    EpicTargeting,
    EpicTest,
    EpicType,
    EpicVariant,
    HeaderProps,
    HeaderTargeting,
    PageTracking,
    PuzzlesBannerProps,
    TestTracking,
} from '@sdc/shared/types';
import express from 'express';
import { fetchConfiguredEpicTests } from './tests/epics/epicTests';
import { cachedChannelSwitches } from './channelSwitches';
import { cacheAsync } from './lib/cache';
import { baseUrl } from './lib/env';
import { addTickerDataToSettings, getTickerSettings } from './lib/fetchTickerData';
import { getArticleViewCountForWeeks, getArticleViewCounts } from './lib/history';
import { Params } from './lib/params';
import { fetchSuperModeArticles } from './lib/superMode';
import { bannerDeployCaches } from './tests/banners/bannerDeployCache';
import { selectBannerTest } from './tests/banners/bannerSelection';
import { getCachedTests } from './tests/banners/bannerTests';
import { Debug, findForcedTestAndVariant, findTestAndVariant } from './tests/epics/epicSelection';
import { fallbackEpicTest } from './tests/epics/fallback';
import { selectHeaderTest } from './tests/headers/headerSelection';
import { logWarn } from './utils/logging';
import { cachedChoiceCardAmounts } from './choiceCardAmounts';
import { epicProfileWithImageTest_US } from './tests/epics/epicProfileWithImageTest_us';
import { epicProfileWithImageTest_EUROW } from './tests/epics/epicProfileWithImageTest_eu-row';
import { epicProfileWithImageTest_UKAUS } from './tests/epics/epicProfileWithImageTest_uk-aus';
import { epicLenoreWithImageTest_AUS } from './tests/epics/epicLenoreWithImageTest_aus';
import { cachedProductPrices } from './productPrices';
import { newsletterEpicTest } from './tests/epics/newsletterEpicTest';
import { usTopReaderCopyTest } from './tests/epics/usTopReaderCopy';

interface EpicDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: EpicProps;
        };
        variant: EpicVariant;
        meta: TestTracking;
    };
    debug?: Debug;
}

interface BannerDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: BannerProps;
        };
        meta: TestTracking;
    };
    debug?: Debug;
}

interface PuzzlesDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: PuzzlesBannerProps;
        };
        meta: Record<string, unknown>;
    };
    debug?: Debug;
}

interface HeaderDataResponse {
    data?: {
        module: {
            url: string;
            name: string;
            props: HeaderProps;
        };
        meta: TestTracking;
    };
}

const isIOS = (ua: string) => /(iPad|iPhone|iPod touch)/i.test(ua);
const isAndroid = (ua: string) => /Android/i.test(ua);
const isMobile = (req: express.Request): boolean => {
    const ua = req.get('User-Agent');
    return !!ua && (isIOS(ua) || isAndroid(ua));
};

const fetchConfiguredArticleEpicTestsCached = cacheAsync(() => fetchConfiguredEpicTests('Epic'), {
    ttlSec: 60,
});

const fetchConfiguredArticleEpicHoldbackTestsCached = cacheAsync(
    () => fetchConfiguredEpicTests('EpicHoldback'),
    { ttlSec: 60 },
);

const fetchConfiguredLiveblogEpicTestsCached = cacheAsync(
    () => fetchConfiguredEpicTests('EpicLiveblog'),
    { ttlSec: 60 },
);

const fetchSuperModeArticlesCached = cacheAsync(fetchSuperModeArticles, { ttlSec: 60 });

// Any hardcoded epic tests should go here. They will take priority over any tests from the epic tool.
const hardcodedEpicTests: EpicTest[] = [
    newsletterEpicTest,
    usTopReaderCopyTest,
    epicLenoreWithImageTest_AUS,
    epicProfileWithImageTest_UKAUS,
    epicProfileWithImageTest_US,
    epicProfileWithImageTest_EUROW,
];

const getArticleEpicTests = async (
    mvtId: number,
    isForcingTest: boolean,
    enableHardcodedEpicTests: boolean,
): Promise<EpicTest[]> => {
    try {
        const [regular, holdback] = await Promise.all([
            fetchConfiguredArticleEpicTestsCached(),
            fetchConfiguredArticleEpicHoldbackTestsCached(),
        ]);

        const hardcodedTests = enableHardcodedEpicTests ? hardcodedEpicTests : [];

        if (isForcingTest) {
            return [...hardcodedTests, ...regular, ...holdback, fallbackEpicTest];
        }

        const shouldHoldBack = mvtId % 100 === 0; // holdback 1% of the audience
        if (shouldHoldBack) {
            return [...holdback];
        }

        return [...hardcodedTests, ...regular, fallbackEpicTest];
    } catch (err) {
        logWarn(`Error getting article epic tests: ${err}`);

        return [fallbackEpicTest];
    }
};

const getLiveblogEpicTests = async (): Promise<EpicTest[]> => {
    return await fetchConfiguredLiveblogEpicTestsCached();
};

export const buildEpicData = async (
    pageTracking: PageTracking,
    targeting: EpicTargeting,
    type: EpicType,
    params: Params,
    baseUrl: string,
    req: express.Request,
): Promise<EpicDataResponse> => {
    const {
        enableEpics,
        enableSuperMode,
        enableHardcodedEpicTests,
    } = await cachedChannelSwitches();
    if (!enableEpics) {
        return {};
    }

    const tests = await (type === 'ARTICLE'
        ? getArticleEpicTests(targeting.mvtId || 1, !!params.force, enableHardcodedEpicTests)
        : getLiveblogEpicTests());

    const superModeArticles = enableSuperMode ? await fetchSuperModeArticlesCached() : [];

    const result = params.force
        ? findForcedTestAndVariant(tests, params.force)
        : findTestAndVariant(tests, targeting, isMobile(req), superModeArticles, params.debug);

    if (process.env.log_targeting === 'true') {
        console.log(
            `Renders Epic ${result ? 'true' : 'false'} for targeting: ${JSON.stringify(targeting)}`,
        );
    }

    if (!result.result) {
        return { data: undefined, debug: result.debug };
    }

    const { test, variant } = result.result;

    const choiceCardAmounts = await cachedChoiceCardAmounts();
    const tickerSettings = await getTickerSettings(variant);
    const showReminderFields = getReminderFields(variant);

    const propsVariant = {
        ...variant,
        tickerSettings,
        showReminderFields,
        choiceCardAmounts,
    };

    const testTracking: TestTracking = {
        abTestName: test.name,
        abTestVariant: variant.name,
        campaignCode: buildCampaignCode(test, variant),
        campaignId: `epic_${test.campaignId || test.name}`,
        componentType: 'ACQUISITIONS_EPIC',
        products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
        labels: test.isSuperMode ? ['SUPER_MODE'] : undefined,
    };

    const props: EpicProps = {
        variant: propsVariant,
        tracking: { ...pageTracking, ...testTracking },
        articleCounts: getArticleViewCounts(
            targeting.weeklyArticleHistory,
            test.articlesViewedByTagSettings,
            test.articlesViewedSettings?.periodInWeeks,
        ),
        countryCode: targeting.countryCode,
    };

    const module: ModuleInfo = type === 'ARTICLE' ? epicModule : liveblogEpicModule;

    const modulePathBuilder: (version?: string) => string =
        propsVariant.modulePathBuilder || module.endpointPathBuilder;

    return {
        data: {
            variant: propsVariant,
            meta: testTracking,
            module: {
                url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
                name: type === 'ARTICLE' ? 'ContributionsEpic' : 'ContributionsLiveblogEpic',
                props,
            },
        },
        debug: result.debug,
    };
};

export const buildBannerData = async (
    pageTracking: PageTracking,
    targeting: BannerTargeting,
    params: Params,
    req: express.Request,
): Promise<BannerDataResponse> => {
    const { enableBanners, enableHardcodedBannerTests } = await cachedChannelSwitches();
    if (!enableBanners) {
        return {};
    }

    const productPrices = await cachedProductPrices();

    const selectedTest = await selectBannerTest(
        targeting,
        pageTracking,
        isMobile(req),
        baseUrl(req),
        getCachedTests,
        bannerDeployCaches,
        enableHardcodedBannerTests,
        params.force,
    );

    if (selectedTest) {
        const { test, variant, moduleUrl, moduleName, targetingAbTest } = selectedTest;

        const testTracking: TestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: buildBannerCampaignCode(test, variant),
            componentType: variant.componentType,
            targetingAbTest,
            ...(variant.products && { products: variant.products }),
        };

        const tickerSettings = variant.tickerSettings
            ? await addTickerDataToSettings(variant.tickerSettings)
            : undefined;

        const props: BannerProps = {
            tracking: { ...pageTracking, ...testTracking },
            bannerChannel: test.bannerChannel,
            isSupporter: !targeting.showSupportMessaging,
            countryCode: targeting.countryCode,
            content: variant.bannerContent,
            mobileContent: variant.mobileBannerContent,
            numArticles: getArticleViewCountForWeeks(
                targeting.weeklyArticleHistory,
                test.articlesViewedSettings?.periodInWeeks,
            ),
            hasOptedOutOfArticleCount: targeting.hasOptedOutOfArticleCount,
            tickerSettings,
            separateArticleCount: variant.separateArticleCount,
            prices: productPrices,
        };

        return {
            data: {
                module: {
                    url: moduleUrl,
                    name: moduleName,
                    props: props,
                },
                meta: testTracking,
            },
        };
    } else {
        // No banner
        return { data: undefined };
    }
};

export const buildPuzzlesData = async (
    pageTracking: PageTracking,
    targeting: BannerTargeting,
    params: Params,
    req: express.Request,
): Promise<PuzzlesDataResponse> => {
    const { enableBanners } = await cachedChannelSwitches();
    if (!enableBanners) {
        return {};
    }
    if (targeting.showSupportMessaging) {
        return {
            data: {
                module: {
                    url: `${baseUrl(req)}/${puzzlesBanner.endpointPathBuilder(
                        targeting ? targeting.modulesVersion : targeting,
                    )}`,
                    name: 'PuzzlesBanner',
                    props: {
                        tracking: {
                            ...pageTracking,
                            abTestName: 'default',
                            abTestVariant: 'control',
                            campaignCode: 'PUZZLES_BANNER',
                            componentType: 'ACQUISITIONS_OTHER',
                        },
                    },
                },
                meta: {},
            },
        };
    }
    return {};
};

export const buildHeaderData = async (
    pageTracking: PageTracking,
    targeting: HeaderTargeting,
    baseUrl: string,
    params: Params,
    req: express.Request,
): Promise<HeaderDataResponse> => {
    const { enableHeaders } = await cachedChannelSwitches();
    if (!enableHeaders) {
        return {};
    }
    const testSelection = await selectHeaderTest(targeting, isMobile(req), params.force);
    if (testSelection) {
        const { test, variant, modulePathBuilder, moduleName } = testSelection;
        const testTracking: TestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: `header_support_${test.name}_${variant.name}`,
            componentType: 'ACQUISITIONS_HEADER',
        };

        return {
            data: {
                module: {
                    url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
                    name: moduleName,
                    props: {
                        content: variant.content,
                        mobileContent: variant.mobileContent,
                        tracking: { ...pageTracking, ...testTracking },
                        countryCode: targeting.countryCode,
                        numArticles: targeting.numArticles,
                    },
                },
                meta: testTracking,
            },
        };
    }
    return { data: undefined };
};
