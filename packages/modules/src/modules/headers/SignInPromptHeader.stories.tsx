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

const baseArgs = {
    content: {
        heading: 'Thank you for subscribing',
        subheading: 'Enjoy the Guardian',
        primaryCta: {
            baseUrl: 'https://profile.theguardian.com/register',
            text: 'Complete registration',
        },
        benefits: ['Ad free', 'Fewer interruptions', 'Newsletters and comments'],
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
    } as const,
    countryCode: 'GB',
};

export const DefaultHeader = Template.bind({});
DefaultHeader.args = baseArgs;

export const ManyBenefits = Template.bind({});
ManyBenefits.args = {
    ...baseArgs,
    content: {
        ...baseArgs.content,
        benefits: ['One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven'],
    },
};

export const WithoutBenefits = Template.bind({});
const { benefits, ...contentWithoutBenefits } = baseArgs.content;
WithoutBenefits.args = {
    ...baseArgs,
    content: contentWithoutBenefits,
};
