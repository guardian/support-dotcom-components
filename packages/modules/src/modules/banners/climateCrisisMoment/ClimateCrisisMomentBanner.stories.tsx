import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ClimateCrisisMomentBannerUnvalidated as ClimateCrisisMomentBanner } from './ClimateCrisisMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    title: 'Banners/ClimateCrisis',
    args: props,
} as Meta;

const ClimateCrisisTemplate: Story<BannerProps> = (props: BannerProps) => (
    <ClimateCrisisMomentBanner {...props} />
);

export const ClimateCrisis = ClimateCrisisTemplate.bind({});
ClimateCrisis.args = {
    ...props,
    content: {
        heading: "Support climate journalism.<br />The world can't wait.",
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
        heading: "Support climate journalism.<br />The world can't wait.",
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
    isMobile: false,
};
