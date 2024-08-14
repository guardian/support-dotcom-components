import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { HeaderUnvalidated as Header } from './Header';
import HeaderDecorator from './common/HeaderDecorator';

export default {
    component: Header,
    title: 'Headers/Header',
    decorators: [HeaderDecorator],
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (props) => <Header {...props} />;

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
    content: {
        heading: 'Support the Guardian',
        subheading: 'Available for everyone, funded by readers',
        primaryCta: {
            baseUrl: 'https://support.theguardian.com/contribute',
            text: 'Contribute',
        },
        secondaryCta: {
            baseUrl: '',
            text: 'Subscribe',
        },
    },
    mobileContent: {
        heading: '',
        subheading: '',
        primaryCta: {
            baseUrl: 'https://support.theguardian.com/contribute',
            text: 'Support us',
        },
    },
    tracking: {
        ophanPageId: 'pvid',
        platformId: 'GUARDIAN_WEB',
        referrerUrl: 'https://theguardian.com/uk',
        clientName: 'dcr',
        abTestName: 'test-name',
        abTestVariant: 'variant-name',
        campaignCode: 'campaign-code',
        componentType: 'ACQUISITIONS_HEADER',
    },
    countryCode: 'GB',
};
