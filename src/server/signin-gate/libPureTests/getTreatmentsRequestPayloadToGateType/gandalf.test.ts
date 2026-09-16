import {
    GANDALF_FREE_PAGE_VIEW_COUNT,
    gandalfArticleIdentifierIsAllowed,
    gandalfIsValidContentType,
    gandalfIsValidSection,
    gandalfIsValidTagIds,
    gandalfMandatoryPopupUserTreatment,
    getTreatmentsRequestPayloadToGateType,
} from '../../libPure';
import type { GetTreatmentsRequestPayload } from '../../types';

const now = 1756568322187; // current time in milliseconds since epoch

const buildPayload = (
    overrides: Partial<GetTreatmentsRequestPayload> = {},
): GetTreatmentsRequestPayload => ({
    browserId: 'sample',
    isSupporter: false,
    dailyArticleCount: 1,
    articleIdentifier: 'www.theguardian.com/world/2026/sep/01/sample-article',
    editionId: 'AU',
    contentType: 'LiveBlog',
    sectionId: 'world',
    tagIds: ['type/article'],
    gateDismissCount: 0,
    countryCode: 'NZ',
    mvtId: 250_000,
    should_show_legacy_gate_tmp: false,
    hasConsented: true,
    shouldServeDismissible: false,
    showDefaultGate: undefined,
    gateDisplayCount: 0,
    hideSupportMessagingTimestamp: undefined,
    ...overrides,
});

describe('getTreatmentsRequestPayloadToGateType (Gandalf)', () => {
    describe('switch off preserves the current behaviour', () => {
        it('consented readers still go to Auxia when the switch is off', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ hasConsented: true, contentType: 'Article' }),
                now,
                true,
                false,
            );
            expect(gateType).toBe('AuxiaAPI');
        });

        it('un-consented readers still get Auxia analytics then Guardian rules when the switch is off', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    hasConsented: false,
                    dailyArticleCount: 5,
                    contentType: 'Article',
                }),
                now,
                true,
                false,
            );
            expect(gateType).toBe('AuxiaAnalyticsThenGuDismissible');
        });

        it('a missing switch is treated as off', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ hasConsented: true, contentType: 'Article' }),
                now,
                true,
                // simulates an old S3 switch document without the field
                undefined,
            );
            expect(gateType).toBe('AuxiaAPI');
        });
    });

    describe('switch state and country', () => {
        it('runs the Gandalf journey for New Zealand readers when switched on', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ countryCode: 'NZ' }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GandalfFreeView');
        });

        it('does not run the Gandalf journey for other countries even when switched on', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ countryCode: 'IE', hasConsented: true, contentType: 'Article' }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('AuxiaAPI');
        });

        it('an unknown country is never treated as a Gandalf country', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    countryCode: '',
                    mvtId: 450_000,
                    hasConsented: true,
                    contentType: 'Article',
                    dailyArticleCount: 5,
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GuDismissible');
        });

        it('lowercase nz in the payload is not matched (country codes are uppercase)', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    countryCode: 'nz',
                    mvtId: 450_000,
                    hasConsented: true,
                    contentType: 'Article',
                    dailyArticleCount: 5,
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GuDismissible');
        });
    });

    describe('free pageviews (daily article count, includes the current view)', () => {
        it.each([0, 1, 2])('returns GandalfFreeView for daily count %i (consented)', (count) => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ hasConsented: true, dailyArticleCount: count }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GandalfFreeView');
        });

        it.each([0, 1, 2])('returns GandalfFreeView for daily count %i (un-consented)', (count) => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ hasConsented: false, dailyArticleCount: count }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GandalfFreeView');
        });

        it(`uses the free allowance constant of ${GANDALF_FREE_PAGE_VIEW_COUNT}`, () => {
            expect(GANDALF_FREE_PAGE_VIEW_COUNT).toBe(2);
        });
    });

    describe('hard gate from the third daily pageview', () => {
        it.each([3, 4, 10])(
            'returns GandalfMandatoryPopup for daily count %i (consented)',
            (count) => {
                const gateType = getTreatmentsRequestPayloadToGateType(
                    buildPayload({ hasConsented: true, dailyArticleCount: count }),
                    now,
                    true,
                    true,
                );
                expect(gateType).toBe('GandalfMandatoryPopup');
            },
        );

        it.each([3, 4, 10])(
            'returns GandalfMandatoryPopup for daily count %i (un-consented)',
            (count) => {
                const gateType = getTreatmentsRequestPayloadToGateType(
                    buildPayload({ hasConsented: false, dailyArticleCount: count }),
                    now,
                    true,
                    true,
                );
                expect(gateType).toBe('GandalfMandatoryPopup');
            },
        );

        it('ignores legacy dismissal and display counters', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    hasConsented: true,
                    dailyArticleCount: 1,
                    gateDismissCount: 9,
                    gateDisplayCount: 9,
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GandalfFreeView');
        });

        it('ignores the supporter/hide-support-messaging state', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    hasConsented: true,
                    dailyArticleCount: 3,
                    hideSupportMessagingTimestamp: now - 1000,
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GandalfMandatoryPopup');
        });
    });

    describe('eligible Guardian content metadata', () => {
        it.each([
            'Article',
            'Network Front',
            'Section',
            'Tag',
            'Audio',
            'Crossword',
            'Gallery',
            'Interactive',
            'LiveBlog',
            'ImageContent',
            'Video',
        ])('accepts %s', (contentType) => {
            expect(gandalfIsValidContentType(contentType)).toBe(true);
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ contentType }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GandalfFreeView');
        });

        it('matches content types case-insensitively', () => {
            expect(gandalfIsValidContentType('liveblog')).toBe(true);
            expect(gandalfIsValidContentType('network front')).toBe(true);
        });

        it.each(['Picture', 'Survey', 'Signup', ''])('does not accept %s', (contentType) => {
            expect(gandalfIsValidContentType(contentType)).toBe(false);
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ contentType }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('None');
        });
    });

    describe('exclusions', () => {
        it.each([
            'about',
            'info',
            'membership',
            'help',
            'guardian-live-australia',
            'gnm-archive',
            'thefilter',
            'thefilter-us',
        ])('excludes section %s', (sectionId) => {
            expect(gandalfIsValidSection(sectionId)).toBe(false);
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ sectionId }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('None');
        });

        it('excludes the newsletter sign-up tag', () => {
            expect(gandalfIsValidTagIds(['info/newsletter-sign-up'])).toBe(false);
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ tagIds: ['info/newsletter-sign-up'] }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('None');
        });

        it.each([
            'www.theguardian.com/tips',
            'www.theguardian.com/help/ng-interactive/2017/mar/17/contact-the-guardian-securely',
            'www.theguardian.com/info/privacy',
            'www.theguardian.com/info/complaints-and-corrections',
            'www.theguardian.com/the-whole-picture',
        ])('excludes page %s', (articleIdentifier) => {
            expect(gandalfArticleIdentifierIsAllowed(articleIdentifier)).toBe(false);
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ articleIdentifier }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('None');
        });

        it('allows ordinary articles and front pages', () => {
            expect(
                gandalfArticleIdentifierIsAllowed(
                    'www.theguardian.com/world/2026/sep/01/sample-article',
                ),
            ).toBe(true);
            expect(gandalfArticleIdentifierIsAllowed('www.theguardian.com/uk')).toBe(true);
        });
    });

    describe('deliberate overrides', () => {
        it('newsshowcase still receives the dismissible gate', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ shouldServeDismissible: true }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GuDismissible');
        });

        it('staff showgate=mandatory still receives the Gu mandatory gate', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ showDefaultGate: 'mandatory' }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GuMandatory');
        });

        it('staff showgate=dismissible still receives the Gu dismissible gate', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({ showDefaultGate: 'dismissible' }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GuDismissible');
        });
    });

    describe('non-Gandalf traffic is unaffected while the list is active', () => {
        it('consented GB readers in the Auxia share still go to Auxia', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    countryCode: 'GB',
                    mvtId: 100_000,
                    hasConsented: true,
                    contentType: 'Article',
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('AuxiaAPI');
        });

        it('consented GB readers outside the Auxia share keep the Guardian fallback', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    countryCode: 'GB',
                    mvtId: 450_000,
                    hasConsented: true,
                    contentType: 'Article',
                    dailyArticleCount: 5,
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('GuDismissible');
        });

        it('Ireland keeps its mandatory rollout behaviour when the switch is on', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    countryCode: 'IE',
                    hasConsented: true,
                    contentType: 'Article',
                }),
                now,
                true,
                true,
            );
            expect(gateType).toBe('AuxiaAPI');
        });

        it('a non-NZ country never takes the Gandalf journey, even when the switch is on', () => {
            const gateType = getTreatmentsRequestPayloadToGateType(
                buildPayload({
                    countryCode: 'CA',
                    hasConsented: true,
                    contentType: 'LiveBlog',
                    dailyArticleCount: 3,
                }),
                now,
                true,
                true,
            );
            // Canada is not a Gandalf country and LiveBlog is not globally
            // eligible, so no gate is served.
            expect(gateType).toBe('None');
        });
    });

    describe('mandatory popup treatment identity', () => {
        it('uses a Gandalf-specific treatmentId so analysis can distinguish it from the standard gate', () => {
            const treatment = gandalfMandatoryPopupUserTreatment();
            expect(treatment.treatmentId).toBe('gandalf-mandatory-popup');
            expect(treatment.treatmentTrackingId).toBe('gandalf-mandatory-popup-tracking-id');
            expect(treatment.treatmentType).toBe('NONDISMISSIBLE_SIGN_IN_GATE_POPUP');
        });
    });
});
