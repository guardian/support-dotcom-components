import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ChoiceCardsBanner, ChoiceCardsBannerRenderProps } from './ChoiceCardsBanner';
import { BannerRenderProps } from '../common/types';
import {
    backgroundColor as blueBannerBackgroundColor,
    headingColor as blueBannerHeadingColor,
} from './ChoiceCardsBannerBlue';
import {
    backgroundColor as yellowBannerBackgroundColor,
    headingColor as yellowBannerHeadingColor,
} from './ChoiceCardsBannerYellow';
import { PageTracking, TestTracking, Tracking } from '@sdc/shared/src/types';

export default {
    component: ChoiceCardsBanner,
    title: 'Banners/Subscriptions/ChoiceCardsBanner',
} as Meta;

type ChoiceCardStoryProps = Omit<
    BannerRenderProps,
    'onCtaClick' | 'onSecondaryCtaClick' | 'onNotNowClick' | 'reminderTracking'
> &
    ChoiceCardsBannerRenderProps;

const Template: Story<ChoiceCardStoryProps> = (props: ChoiceCardStoryProps) =>
    props.content && (
        <ChoiceCardsBanner
            {...props}
            backgroundColor={props.backgroundColor}
            headingColor={props.headingColor}
            bannerId={props.bannerId}
            onCloseClick={() => null}
            onSignInClick={() => null}
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

export const ChoiceCardsBannerBlue = Template.bind({});
ChoiceCardsBannerBlue.args = {
    bannerId: 'choice-cards-banner-blue',
    countryCode: 'GB',
    content: {
        mainContent: {
            heading: <>Lend us a hand in 2023</>,
            subheading: null,
            paragraphs: [
                <>
                    Shareholders or billionaire owner, we report on world events with accuracy, free
                    from political and commercial influence. And unlike many others, we’re committed
                    to keeping our reporting open for all readers. Every contribution, however big
                    or small, makes a difference.
                </>,
            ],
            highlightedText: (
                <>
                    Support us from as little as £1. If you can, please consider supporting us with
                    a regular amount each month. Thank you.
                </>
            ),
            primaryCta: {
                ctaText: 'Contribute',
                ctaUrl: 'https://support.theguardian.com/contribute',
            },
            secondaryCta: null,
        },
        mobileContent: {
            heading: <>Lend us a hand in 2023</>,
            subheading: null,
            paragraphs: [
                <>
                    Shareholders or billionaire owner, we report on world events with accuracy, free
                    from political and commercial influence. And unlike many others, we’re committed
                    to keeping our reporting open for all readers. Every contribution, however big
                    or small, makes a difference.
                </>,
            ],
            highlightedText: (
                <>
                    Support us from as little as £1. If you can, please consider supporting us with
                    a regular amount each month. Thank you.
                </>
            ),
            primaryCta: {
                ctaText: 'Support us',
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
                amounts: [6, 12, 18, 24],
                defaultAmount: 12,
                hideChooseYourAmount: true,
            },
            ANNUAL: {
                amounts: [50, 100, 150, 200],
                defaultAmount: 100,
                hideChooseYourAmount: true,
            },
        },
    },
    backgroundColor: blueBannerBackgroundColor,
    headingColor: blueBannerHeadingColor,
    onCloseClick: () => null,
    separateArticleCount: true,
    numArticles: 15,
};

const { bannerId, backgroundColor, headingColor, ...rest } = ChoiceCardsBannerBlue.args;

export const ChoiceCardsBannerYellow = Template.bind({});
ChoiceCardsBannerYellow.args = {
    ...rest,
    bannerId: 'choice-cards-banner-yellow',
    backgroundColor: yellowBannerBackgroundColor,
    headingColor: yellowBannerHeadingColor,
};
