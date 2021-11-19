import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '@sdc/shared/types';
import { Header } from './EoYUSMomentHeader';
import { css } from '@emotion/core';
import { brand } from '@guardian/src-foundations';

export const props: HeaderProps = {
    content: {
        heading: 'Support the Guardian',
        subheading: 'Make a year-end gift',
        primaryCta: {
            url: 'https://support.theguardian.com/contribute',
            text: 'Contribute',
        },
        secondaryCta: {
            url: 'https://support.theguardian.com/subscribe',
            text: 'Subscribe',
        },
    },
    mobileContent: {
        heading: '',
        subheading: '',
        primaryCta: {
            url: 'https://support.theguardian.com/contribute',
            text: 'Make a year-end gift',
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

const background = css`
    background-color: ${brand[400]};
    padding: 10px;
`;

export const HeaderDecorator = (Story: Story): JSX.Element => (
    <div css={background}>
        <Story />
    </div>
);

export default {
    component: Header,
    title: 'Header/EOYUSMoment',
    args: props,
    decorators: [HeaderDecorator],
    excludeStories: ['props', 'HeaderDecorator'],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => <Header {...props} />;

export const DefaultHeader = Template.bind({});

export const SupportersHeader = Template.bind({});
SupportersHeader.args = {
    content: {
        heading: 'Thank you for supporting us',
        subheading: '',
        primaryCta: {
            url: 'https://support.theguardian.com/subscribe',
            text: 'Make an extra contribution',
        },
    },
    mobileContent: {
        heading: 'Thank you for your support',
        subheading: '',
        primaryCta: {
            url: 'https://support.theguardian.com/subscribe',
            text: 'Contribute again',
        },
    },
};
