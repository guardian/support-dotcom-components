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
        messageText:
            'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus enim porttitor dolor at fermentum ut. Placerat est fermentum nulla porttitor est suspendisse proin volutpat. Habitant maecenas massa ullamcorper volutpat. Elit proin Placerat est fermentum nulla porttitor est  suspendisse suspendisse porttitor est',
        highlightedText:
            'The Guardian is a work in progress. Support us from as little as £1 and we will progress together.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
        secondaryCta: {
            type: SecondaryCtaType.Custom,
            cta: {
                text: 'Join the party',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
};
