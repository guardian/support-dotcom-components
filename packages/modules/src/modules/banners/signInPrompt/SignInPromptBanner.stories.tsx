import React from 'react';
import { Meta, StoryFn } from '@storybook/react';

import { SecondaryCtaType } from '@sdc/shared/types';

import { props } from '../utils/storybook';
import { SignInPromptBannerUnvalidated as SignInPromptBanner } from './SignInPromptBanner';

export default {
    component: SignInPromptBanner,
    title: 'Banners/Retired',
} as Meta<typeof SignInPromptBanner>;

const Template: StoryFn<typeof SignInPromptBanner> = (props) => <SignInPromptBanner {...props} />;

const content = {
    heading: 'Thank you for subscribing',
    paragraphs: [
        'Remember to sign in for a better experience',
        'Ad free',
        'Fewer interruptions',
        'Newsletters and comments',
    ],
    cta: {
        baseUrl: 'https://profile.theguardian.com/register',
        text: 'Complete registration',
    },
    secondaryCta: {
        type: SecondaryCtaType.Custom,
        cta: {
            baseUrl: '',
            text: 'Not now',
        },
    },
};

const baseArgs = {
    ...props,
    content,
};

export const SignInPrompt = Template.bind({});
SignInPrompt.args = baseArgs;
