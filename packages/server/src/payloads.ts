import {
    epic as epicModule,
    header,
    liveblogEpic as liveblogEpicModule,
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
import { fetchConfiguredEpicTests } from './api/contributionsApi';
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
import { selectHeaderTest } from './tests/header/headerSelection';
import { logWarn } from './utils/logging';
import { cachedChoiceCardAmounts } from './choiceCardAmounts';

interface EpicDataResponse {
    data?: {
        module: {
            url: string;
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

const [, fetchConfiguredArticleEpicTestsCached] = cacheAsync(
    () => fetchConfiguredEpicTests('ARTICLE'),
    60,
    `fetchConfiguredEpicTests_ARTICLE`,
);

const [, fetchConfiguredArticleEpicHoldbackTestsCached] = cacheAsync(
    () => fetchConfiguredEpicTests('ARTICLE_HOLDBACK'),
    60,
    `fetchConfiguredEpicTests_ARTICLE_HOLDBACK`,
);

const [, fetchConfiguredLiveblogEpicTestsCached] = cacheAsync(
    () => fetchConfiguredEpicTests('LIVEBLOG'),
    60,
    `fetchConfiguredEpicTests_LIVEBLOG`,
);

const [, fetchSuperModeArticlesCached] = cacheAsync(
    fetchSuperModeArticles,
    60,
    'fetchSuperModeArticles',
);

const hardcodedEpicTests: EpicTest[] = [];

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
        : findTestAndVariant(tests, targeting, superModeArticles, type, params.debug);

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
    const showReminderFields = getReminderFields(variant, targeting.countryCode);

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

    const modulePathBuilder: (version?: string) => string =
        propsVariant.modulePathBuilder ||
        (type === 'ARTICLE'
            ? epicModule.endpointPathBuilder
            : liveblogEpicModule.endpointPathBuilder);

    return {
        data: {
            variant: propsVariant,
            meta: testTracking,
            module: {
                url: `${baseUrl}/${modulePathBuilder(targeting.modulesVersion)}`,
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
    const { enableBanners } = await cachedChannelSwitches();
    if (!enableBanners) {
        return {};
    }

    const selectedTest = await selectBannerTest(
        targeting,
        pageTracking,
        baseUrl(req),
        getCachedTests,
        bannerDeployCaches,
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
): Promise<HeaderDataResponse> => {
    const testSelection = await selectHeaderTest(targeting);
    if (testSelection) {
        const { test, variant } = testSelection;
        const testTracking: TestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: `header_support_${test.name}_${variant.name}`,
            componentType: 'ACQUISITIONS_HEADER',
        };
        return {
            data: {
                module: {
                    url: `${baseUrl}/${variant.modulePathBuilder(targeting.modulesVersion)}`,
                    name: header.name,
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
