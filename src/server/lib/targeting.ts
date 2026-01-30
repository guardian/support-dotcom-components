import type {
    AbandonedBasket,
    BannerChannel,
    BannerTargeting,
    ConsentStatus,
    EpicTargeting,
    EpicViewLog,
    GutterTargeting,
    PageContextTargeting,
    SignedInStatus,
    Test,
    UserCohort,
    UserDeviceType,
    Variant,
} from '../../shared/types';
import { daysSince } from './dates';
import type { MParticleProfile } from './mParticle';

const lowValueSections = ['money', 'education', 'games', 'teacher-network', 'careers'];

const lowValueTags = [
    'tone/matchreports',
    'guardian-masterclasses/guardian-masterclasses',
    'tone/cartoons',
];

export interface ThrottleConfig {
    maxViewsDays: number;
    maxViewsCount: number;
    minDaysBetweenViews: number;
}

// Note, if testID is provided, will thottle against views only for that
// specific test, otherwise will apply a global throttle.
export const shouldThrottle = (
    log: EpicViewLog,
    config: ThrottleConfig,
    testId?: string,
    now: Date = new Date(),
): boolean => {
    let views = log;

    if (testId) {
        views = log.filter((view) => view.testId === testId);
    }

    const viewsInThrottleWindow = views.filter((view) => {
        return daysSince(new Date(view.date), now) < config.maxViewsDays;
    });

    const hasReachedViewsLimitInWindow = viewsInThrottleWindow.length >= config.maxViewsCount;

    const withinMinDaysSinceLastView = viewsInThrottleWindow.some(
        (view) => daysSince(new Date(view.date), now) < config.minDaysBetweenViews,
    );

    return hasReachedViewsLimitInWindow || withinMinDaysSinceLastView;
};

export const shouldNotRenderEpic = (meta: EpicTargeting): boolean => {
    const section = meta.sectionId ?? meta.sectionName;
    const isLowValueSection = !!section && lowValueSections.includes(section);
    const isLowValueTag = lowValueTags.some((id) => meta.tags.some((pageTag) => pageTag.id === id));

    return meta.shouldHideReaderRevenue || isLowValueSection || isLowValueTag || meta.isPaidContent;
};

export const audienceMatches = (
    showSupportMessaging: boolean,
    testAudience: UserCohort,
): boolean => {
    switch (testAudience) {
        case 'AllNonSupporters':
            return showSupportMessaging;
        case 'AllExistingSupporters':
            return !showSupportMessaging;
        default:
            return true;
    }
};

export const deviceTypeMatches = <V extends Variant>(
    test: Test<V>,
    userDeviceType: UserDeviceType,
): boolean => {
    switch (test.deviceType) {
        case 'Mobile':
            return userDeviceType === 'Android' || userDeviceType === 'iOS';
        case 'Desktop':
            return userDeviceType === 'Desktop';
        case 'iOS':
            return userDeviceType === 'iOS';
        case 'Android':
            return userDeviceType === 'Android';
        default:
            return true;
    }
};

export const correctSignedInStatus = (
    isSignedIn: boolean,
    signedInStatus?: SignedInStatus,
): boolean => {
    switch (signedInStatus) {
        case 'SignedIn':
            return isSignedIn;
        case 'SignedOut':
            return !isSignedIn;
        default:
            return true;
    }
};

export const consentStatusMatches = (
    hasConsented: boolean,
    consentStatus?: ConsentStatus,
): boolean => {
    switch (consentStatus) {
        case 'HasConsented':
            return hasConsented;
        case 'HasNotConsented':
            return !hasConsented;
        case 'All':
            return true;
        case undefined:
            return true;
    }
};

export function abandonedBasketMatches(
    bannerChannel: BannerChannel,
    abandonedBasket: AbandonedBasket | undefined,
): boolean {
    if (bannerChannel === 'abandonedBasket') {
        return !!abandonedBasket;
    }

    return true;
}

interface PageContext {
    tagIds?: string[];
    sectionId?: string;
}

const pageHasATag = (tagIds: string[], pageTagIds?: string[]): boolean =>
    !!pageTagIds && tagIds.some((tagId) => pageTagIds.includes(tagId));

const pageHasASection = (sectionIds: string[], pageSectionId?: string): boolean =>
    !!pageSectionId && sectionIds.includes(pageSectionId);

export const pageContextMatches = (
    pageContext: PageContext,
    testTargeting: PageContextTargeting,
): boolean => {
    const { tagIds, sectionIds, excludedTagIds, excludedSectionIds } = testTargeting;

    const noTargeting = tagIds.length === 0 && sectionIds.length === 0;

    const inclusionsMatch: boolean =
        noTargeting ||
        pageHasATag(tagIds, pageContext.tagIds) ||
        pageHasASection(sectionIds, pageContext.sectionId);

    const exclusionsMatch: boolean =
        (excludedTagIds.length > 0 && pageHasATag(excludedTagIds, pageContext.tagIds)) ||
        (excludedSectionIds.length > 0 &&
            pageHasASection(excludedSectionIds, pageContext.sectionId));

    return inclusionsMatch && !exclusionsMatch;
};

// Hide all messages on these pages
const excludedPageIds = new Set<string>([
    'info/privacy',
    'info/complaints-and-corrections',
    'about',
    'the-whole-picture',
]);

export const pageIdIsExcluded = (
    targeting: BannerTargeting | EpicTargeting | GutterTargeting,
): boolean => {
    return targeting.pageId ? excludedPageIds.has(targeting.pageId) : false;
};

export const matchesMParticleAudience = async (
    getMParticleProfile: () => Promise<MParticleProfile | undefined>,
    mParticleAudience?: number,
): Promise<boolean> => {
    if (mParticleAudience) {
        // User must be in the mParticle audience segment
        const mParticleProfile = await getMParticleProfile();
        if (mParticleProfile) {
            const audience = mParticleProfile.audience_memberships.find(
                ({ audience_id }) => audience_id === mParticleAudience,
            );
            return !!audience;
        } else {
            return false;
        }
    } else {
        return true;
    }
};
