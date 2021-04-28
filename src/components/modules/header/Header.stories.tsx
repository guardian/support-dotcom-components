import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '../../../types/HeaderTypes';
import { Header } from './Header';
import { css } from '@emotion/core';
import { brand } from '@guardian/src-foundations';

const props: HeaderProps = {
    content: {
        heading: 'Support the Guardian',
        subheading: 'Available for everyone, funded by readers',
        primaryCta: {
            url: '',
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

export default {
    component: Header,
    title: 'Header/Header',
    args: props,
    decorators: [
        Story => (
            <div css={background}>
                <Story />
            </div>
        ),
    ],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => <Header {...props} />;

export const DefaultHeader = Template.bind({});
