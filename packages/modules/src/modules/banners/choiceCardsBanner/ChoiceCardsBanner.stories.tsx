import React from 'react';
import { Story, Meta } from '@storybook/react';
import { tracking } from '../../epics/utils/storybook';
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

export const ChoiceCardsBannerBlue = Template.bind({});
ChoiceCardsBannerBlue.args = {
    bannerId: 'choice-cards-banner-blue',
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
                ctaText: 'Support us',
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
    // correctly formatted epic storybook tracking data used here for banner example
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
};

const { bannerId, backgroundColor, headingColor, ...rest } = ChoiceCardsBannerBlue.args;

export const ChoiceCardsBannerYellow = Template.bind({});
ChoiceCardsBannerYellow.args = {
    ...rest,
    bannerId: 'choice-cards-banner-yellow',
    backgroundColor: yellowBannerBackgroundColor,
    headingColor: yellowBannerHeadingColor,
};
