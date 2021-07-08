import React from 'react';
import { Story, Meta } from '@storybook/react';
import { props } from '../utils/storybook';
import { BannerProps } from '../../../../types/BannerTypes';
import { AusBanner } from './AusBanner';
import { SecondaryCtaType } from '../../../../types/shared';

export default {
    component: AusBanner,
    title: 'Banners/AusMoment',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <AusBanner {...props} />;

export const Default = Template.bind({});
Default.args = {
    ...props,
    mobileContent: {
        heading: 'Together, we can be a voice for change',
        messageText:
            'Help us reach more people across xxx T xx Australia. One in three people in Australia read the Guardian in the last year. p Guardian in the last yea growing our readership and gaining your support so we can provide high quas. To find out more, read this letter from our editor.',
        cta: {
            text: 'Support the Guardian',
            baseUrl: 'https://support.theguardian.com/contribute',
        },
    },
    content: {
        heading: 'Together, we can be a voice for change',
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
                text: 'Hear from our editor',
                baseUrl: 'https://theguardian.com',
            },
        },
    },
};
