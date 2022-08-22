import React from 'react';
import { Story, Meta } from '@storybook/react';
import { AuBrandMomentBannerUnvalidated as AuBrandMomentBanner } from './AuBrandMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    title: 'Banners/AuBrandMoment',
    args: props,
} as Meta;

const AuBrandMomentTemplate: Story<BannerProps> = (props: BannerProps) => (
    <AuBrandMomentBanner {...props} />
);

export const AuBrandMoment = AuBrandMomentTemplate.bind({});
AuBrandMoment.args = {
    ...props,
    content: {
        heading: 'Join the fight for progress',
        messageText:
            'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, vulputate eget, arcu. In enim justo.',
        highlightedText:
            'Show your support today from just %%CURRENCY_SYMBOL%%1, or sustain us long term with a little more. Thank you.',
        cta: {
            text: 'Support us',
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
        heading: 'Join the fight for progress',
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
