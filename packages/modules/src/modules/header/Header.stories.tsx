import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '@sdc/shared/types';
import { HeaderUnvalidated as Header } from './Header';
import { css } from '@emotion/core';
import { brand } from '@guardian/src-foundations';

export const props: HeaderProps = {
    content: {
        heading: 'Support the Guardian',
        subheading: 'Available for everyone, funded by readers',
        primaryCta: {
            url: 'https://support.theguardian.com/contribute',
            text: 'Contribute',
        },
        secondaryCta: {
            url: '',
            text: 'Subscribe',
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
    title: 'Header/Header',
    args: props,
    decorators: [HeaderDecorator],
    excludeStories: ['props', 'HeaderDecorator'],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => <Header {...props} />;

export const DefaultHeader = Template.bind({});
