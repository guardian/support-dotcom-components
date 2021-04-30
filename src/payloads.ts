import express from 'express';
import { fetchConfiguredEpicTests } from './api/contributionsApi';
import { cacheAsync } from './lib/cache';
import {
    EpicPageTracking,
    EpicProps,
    EpicTargeting,
    EpicTestTracking,
    EpicType,
} from './components/modules/epics/ContributionsEpicTypes';
import { Debug, findTestAndVariant, findForcedTestAndVariant, Variant, Test } from './lib/variants';
import { getArticleViewCountForWeeks } from './lib/history';
import { buildBannerCampaignCode, buildCampaignCode } from './lib/tracking';

import { getAllHardcodedTests } from './tests';
import { Params } from './lib/params';
import { baseUrl } from './lib/env';
import { addTickerDataToSettings, getTickerSettings } from './lib/fetchTickerData';
import {
    BannerPageTracking,
    BannerProps,
    BannerTargeting,
    BannerTestTracking,
    PuzzlesBannerProps,
} from './types/BannerTypes';
import { selectBannerTest } from './tests/banners/bannerSelection';
import { getCachedTests } from './tests/banners/bannerTests';
import { bannerDeployCaches } from './tests/banners/bannerDeployCache';
import {
    HeaderPageTracking,
    HeaderProps,
    HeaderTargeting,
    HeaderTestTracking,
} from './types/HeaderTypes';
import { selectHeaderTest } from './tests/header/headerSelection';
import {
    epic as epicModule,
    liveblogEpic as liveblogEpicModule,
    puzzlesBanner,
    header,
} from './modules';
import { getReminderFields } from './lib/reminderFields';

interface EpicDataResponse {
    data?: {
        module: {
            url: string;
            props: EpicProps;
        };
        variant: Variant;
        meta: EpicTestTracking;
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
        meta: BannerTestTracking;
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
        meta: HeaderTestTracking;
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

const getArticleEpicTests = async (mvtId: number, isForcingTest: boolean): Promise<Test[]> => {
    const [regular, holdback, hardcoded] = await Promise.all([
        fetchConfiguredArticleEpicTestsCached(),
        fetchConfiguredArticleEpicHoldbackTestsCached(),
        getAllHardcodedTests(),
    ]);

    if (isForcingTest) {
        return [...regular.tests, ...holdback.tests, ...hardcoded];
    }

    const shouldHoldBack = mvtId % 100 === 0; // holdback 1% of the audience
    if (shouldHoldBack) {
        return [...holdback.tests];
    }

    return [...regular.tests, ...hardcoded];
};

const getLiveblogEpicTests = async (): Promise<Test[]> => {
    const configuredTests = await fetchConfiguredLiveblogEpicTestsCached();
    return [...configuredTests.tests];
};

export const buildEpicData = async (
    pageTracking: EpicPageTracking,
    targeting: EpicTargeting,
    type: EpicType,
    params: Params,
    baseUrl: string,
): Promise<EpicDataResponse> => {
    const tests = await (type === 'ARTICLE'
        ? getArticleEpicTests(targeting.mvtId || 1, !!params.force)
        : getLiveblogEpicTests());

    const result = params.force
        ? findForcedTestAndVariant(tests, params.force)
        : findTestAndVariant(tests, targeting, type, params.debug);

    if (process.env.log_targeting === 'true') {
        console.log(
            `Renders Epic ${result ? 'true' : 'false'} for targeting: ${JSON.stringify(targeting)}`,
        );
    }

    if (!result.result) {
        return { data: undefined, debug: result.debug };
    }

    const { test, variant } = result.result;

    const tickerSettings = await getTickerSettings(variant);
    const showReminderFields = getReminderFields(variant, targeting);

    const variantWithTickerAndReminder = { ...variant, tickerSettings, showReminderFields };

    const testTracking: EpicTestTracking = {
        abTestName: test.name,
        abTestVariant: variant.name,
        campaignCode: buildCampaignCode(test, variant),
        campaignId: `epic_${test.campaignId || test.name}`,
        componentType: 'ACQUISITIONS_EPIC',
        products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
    };

    const props: EpicProps = {
        variant: variantWithTickerAndReminder,
        tracking: { ...pageTracking, ...testTracking },
        numArticles: getArticleViewCountForWeeks(
            targeting.weeklyArticleHistory,
            test.articlesViewedSettings?.periodInWeeks,
        ),
        countryCode: targeting.countryCode,
    };

    const modulePathBuilder: (version?: string) => string =
        variantWithTickerAndReminder.modulePathBuilder ||
        (type === 'ARTICLE'
            ? epicModule.endpointPathBuilder
            : liveblogEpicModule.endpointPathBuilder);

    return {
        data: {
            variant: variantWithTickerAndReminder,
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
    pageTracking: BannerPageTracking,
    targeting: BannerTargeting,
    params: Params,
    req: express.Request,
): Promise<BannerDataResponse> => {
    const selectedTest = await selectBannerTest(
        targeting,
        pageTracking,
        baseUrl(req),
        getCachedTests,
        bannerDeployCaches,
        params.force,
    );

    if (selectedTest) {
        const { test, variant, moduleUrl, moduleName } = selectedTest;

        const testTracking: BannerTestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: buildBannerCampaignCode(test, variant),
            componentType: variant.componentType,
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
    pageTracking: BannerPageTracking,
    targeting: BannerTargeting,
    params: Params,
    req: express.Request,
): Promise<PuzzlesDataResponse> => {
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
    pageTracking: HeaderPageTracking,
    targeting: HeaderTargeting,
    baseUrl: string,
): Promise<HeaderDataResponse> => {
    const testSelection = await selectHeaderTest(targeting);
    if (testSelection) {
        const { test, variant } = testSelection;
        const testTracking: HeaderTestTracking = {
            abTestName: test.name,
            abTestVariant: variant.name,
            campaignCode: `${test.name}_${variant.name}`,
            componentType: 'ACQUISITIONS_HEADER',
        };
        return {
            data: {
                module: {
                    url: `${baseUrl}/${header.endpointPathBuilder(targeting.modulesVersion)}`,
                    name: header.name,
                    props: {
                        content: variant.content,
                        tracking: { ...pageTracking, ...testTracking },
                        countryCode: targeting.countryCode,
                    },
                },
                meta: testTracking,
            },
        };
    }
    return { data: undefined };
};
