import React from 'react';
import { ComponentStory, ComponentMeta, Story } from '@storybook/react';
import { HeaderProps } from '@sdc/shared/types';
import { HeaderUnvalidated as Header } from './Header';
import { css } from '@emotion/react';
import { brand } from '@guardian/src-foundations';

const defaultProps: HeaderProps = {
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
        heading: 'Support the Guardian',
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

const background = css`
    background-color: ${brand[400]};
    padding: 10px;
`;

const HeaderDecorator = (Story: Story) => (
    <div css={background}>
        <Story />
    </div>
);

export default {
    component: Header,
    title: 'Header/Header',
    decorators: [HeaderDecorator],
} as ComponentMeta<typeof Header>;

const Template: ComponentStory<typeof Header> = props => <Header {...defaultProps} {...props} />;

export const DefaultHeader = Template.bind({});
