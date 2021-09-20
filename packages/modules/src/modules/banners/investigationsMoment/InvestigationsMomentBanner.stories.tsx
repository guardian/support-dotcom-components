import React from 'react';
import { Story, Meta } from '@storybook/react';
import { InvestigationsMomentBannerUnvalidated as InvestigationsMoment } from './InvestigationsMomentBanner';
import { props } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: InvestigationsMoment,
    title: 'Banners/InvestigationsMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <InvestigationsMoment {...props} />;

export const Default = Template.bind({});
Default.args = {
    ...props,
    mobileContent: {
        messageText:
            'The Guardian is a work in progress. Support us from as little as £1 and we will progress together. Can fit in some.',
    },
    content: {
        heading: 'Invest in investigative journalism',
        messageText:
            'Dummy copy In these extraordinary times, millions rely on the Guardian for high-impact, independent journalism that stands for truth and integrity. With no shareholders or billionaire owner, we report on world events with accuracy billionaire owner, we report on world events with accuracy billionaire owner,',
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
