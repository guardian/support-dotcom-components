import React from 'react';
import { Story, Meta } from '@storybook/react';
import { BannerRenderProps } from '../common/types';
import { PageTracking, TestTracking, Tracking } from '@sdc/shared/src/types';
import { WorldPressFreedomDayBannerUnValidated as WorldPressFreedomDayBanner } from './WorldPressFreedomDayBanner';

export default {
    component: WorldPressFreedomDayBanner,
    title: 'Banners/WorldPressFreedomDayBanner',
} as Meta;

const Template: Story<BannerRenderProps> = (props: BannerRenderProps) =>
    props.content && (
        // TO-DO - type mismatch for 'content' prop
        <WorldPressFreedomDayBanner
            {...props}
            bannerChannel='contributions'
        />
    );

// Test tracking data from choice cards in epic story
const pageTracking: PageTracking = {
    ophanPageId: 'k5nxn0mxg7ytwpkxuwms',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl:
        'http://localhost:3000/politics/2020/jan/17/uk-rules-out-automatic-deportation-of-eu-citizens-verhofstadt-brexit',
};

const testTracking: TestTracking = {
    campaignCode: 'gdnwb_copts_memco_remote_epic_test_api',
    campaignId: 'remote_epic_test',
    abTestName: 'remote_epic_test',
    abTestVariant: 'api',
    componentType: 'ACQUISITIONS_EPIC',
    products: ['CONTRIBUTION', 'MEMBERSHIP_SUPPORTER'],
};

const tracking: Tracking = {
    ...pageTracking,
    ...testTracking,
};

export const Default = Template.bind({});
Default.args = {
    countryCode: 'GB',
    content: {
        mainContent: {
            heading: <>As 2023 unfolds, will you support us?</>,
            subheading: null,
            paragraphs: [
                <>
                    We’re a reader-funded news organisation, with more than 1.5 million supporters
                    in 180 countries. With this vital support, our reporting remains fiercely
                    independent, and is never manipulated by commercial or political ties. And it’s
                    free, for everyone. But if you can support us, we need you.
                </>,
            ],
            highlightedText: (
                <>
                    Give just once from £1, or better yet, power us every month with a little more.
                    Thank you.
                </>
            ),
            primaryCta: {
                ctaText: 'Contribute',
                ctaUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: null,
        },
        mobileContent: {
            heading: <>As 2023 unfolds, will you support us?</>,
            subheading: null,
            paragraphs: [
                <>
                    We’re a reader-funded news organisation, with more than 1.5 million supporters
                    in 180 countries. With this vital support, our reporting remains fiercely
                    independent, and is never manipulated by commercial or political ties. And it’s
                    free, for everyone. But if you can support us, we need you.
                </>,
            ],
            highlightedText: (
                <>
                    Give just once from £1, or better yet, power us every month with a little more.
                    Thank you.
                </>
            ),
            primaryCta: {
                ctaText: 'Continue',
                ctaUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: null,
        },
    },
    isSupporter: false,
    tracking,
    choiceCardAmounts: {
        testName: 'Storybook_test',
        variantName: 'Control',
        amounts: {
            ONE_OFF: {
                amounts: [5, 10, 15, 20],
                defaultAmount: 5,
                hideChooseYourAmount: false,
            },
            MONTHLY: {
                amounts: [3, 6, 10],
                defaultAmount: 10,
                hideChooseYourAmount: true,
            },
            ANNUAL: {
                amounts: [100],
                defaultAmount: 100,
                hideChooseYourAmount: true,
            },
        },
    },
    onCloseClick: () => null,
    separateArticleCount: true,
    numArticles: 15,
};