import React from 'react';
import { Story, Meta } from '@storybook/react';
import { PostElectionAuMomentAlbaneseBannerUnvalidated as PostElectionAuMomentAlbaneseBanner } from './PostElectionAuMomentAlbaneseBanner';
import { PostElectionAuMomentHungBannerUnvalidated as PostElectionAuMomentHungBanner } from './PostElectionAuMomentHungBanner';
import { PostElectionAuMomentMorrisonBannerUnvalidated as PostElectionAuMomentMorrisonBanner } from './PostElectionAuMomentMorrisonBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    title: 'Banners/PostElectionAuMoment',
    args: props,
} as Meta;

const AlbaneseTemplate: Story<BannerProps> = (props: BannerProps) => (
    <PostElectionAuMomentAlbaneseBanner {...props} tickerSettings={undefined} />
);

export const Albanese = AlbaneseTemplate.bind({});
Albanese.args = {
    ...props,
    content: {
        heading: 'As Australia prepares to head to the polls...',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo.',
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support independent journalism',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Hear from our editor',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    mobileContent: {
        heading: 'As Australia prepares to head to the polls...',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.',
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support us',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Learn more',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
    numArticles: 50,
};

const HungTemplate: Story<BannerProps> = (props: BannerProps) => (
    <PostElectionAuMomentHungBanner {...props} tickerSettings={undefined} />
);

export const Hung = HungTemplate.bind({});
Hung.args = { ...Albanese.args };

const MorrisonTemplate: Story<BannerProps> = (props: BannerProps) => (
    <PostElectionAuMomentMorrisonBanner {...props} tickerSettings={undefined} />
);

export const Morrison = MorrisonTemplate.bind({});
Morrison.args = { ...Albanese.args };
