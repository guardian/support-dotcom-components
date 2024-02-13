import React from 'react';
import { Story, Meta } from '@storybook/react';
import {
    BannerProps,
    PageTracking,
    SecondaryCtaType,
    TestTracking,
    Tracking,
} from '@sdc/shared/src/types';
import { WorldPressFreedomDayBannerUnValidated as WorldPressFreedomDayBanner } from './WorldPressFreedomDayBanner';

export default {
    component: WorldPressFreedomDayBanner,
    title: 'Banners/Custom',
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => (
    // TO-DO - type mismatch for 'content' prop
    <WorldPressFreedomDayBanner {...props} bannerChannel="contributions" />
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

export const WorldPressFreedomDay = Template.bind({});
WorldPressFreedomDay.args = {
    countryCode: 'GB',
    content: {
        heading: '',
        messageText:
            'Bushfires, floods, an historic referendum, six prime ministers and a pandemic. Much has changed since Guardian Australia first launched 10 years ago, but our mission remains the same: to follow the facts, hold power to account, to call out injustice, and give a voice to the marginalised. And we’re just getting started. This May, as we celebrate our 10th birthday, we want to power our journalism with an additional 5,000 supporter contributions. Whether you give once, or support us on a regular basis, your funding will power independent, fearless reporting for the years to come.',
        paragraphs: [
            'Bushfires, floods, an historic referendum, six prime ministers and a pandemic. Much has changed since Guardian Australia first launched 10 years ago, but our mission remains the same: to follow the facts, hold power to account, to call out injustice, and give a voice to the marginalised. And we’re just getting started. This May, as we celebrate our 10th birthday, we want to power our journalism with an additional 5,000 supporter contributions. Whether you give once, or support us on a regular basis, your funding will power independent, fearless reporting for the years to come.',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Contribute',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
    mobileContent: {
        heading: '',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        paragraphs: [
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus',
        ],
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
    isSupporter: false,
    tracking,
    choiceCardAmounts: {
        testName: 'Storybook_test',
        variantName: 'CONTROL',
        defaultContributionType: 'MONTHLY',
        displayContributionType: ['ONE_OFF', 'MONTHLY', 'ANNUAL'],
        amountsCardData: {
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
    separateArticleCount: true,
    numArticles: 15,
};
