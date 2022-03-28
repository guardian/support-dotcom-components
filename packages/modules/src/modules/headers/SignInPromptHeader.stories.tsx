import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { SignInPromptHeaderUnvalidated as SignInPromptHeader } from './SignInPromptHeader';
import HeaderDecorator from './common/HeaderDecorator';

export default {
    component: SignInPromptHeader,
    title: 'Headers/SignInPromptHeader',
    decorators: [HeaderDecorator],
} as ComponentMeta<typeof SignInPromptHeader>;

const Template: ComponentStory<typeof SignInPromptHeader> = props => (
    <SignInPromptHeader {...props} />
);

export const DefaultHeader = Template.bind({});
DefaultHeader.args = {
    content: {
        heading: 'Thank you for subscribing',
        subheading: 'Enjoy the Guardian',
        primaryCta: {
            baseUrl: 'https://profile.theguardian.com/register',
            text: 'Complete registration',
        },
    },
    mobileContent: {
        heading: '',
        subheading: '',
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
