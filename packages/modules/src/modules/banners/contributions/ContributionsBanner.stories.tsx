import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsBannerUnvalidated as ContributionsBanner } from './ContributionsBanner';
import { ContributionsBannerUnvalidated as ContributionsBannerTopReaderAcV1 } from './ContributionsBannerTopReaderArticleCountV1';
import { ContributionsBannerUnvalidated as ContributionsBannerTopReaderAcV2 } from './ContributionsBannerTopReaderArticleCountV2';
import { props, content } from '../utils/storybook';
import { BannerProps, SecondaryCtaType } from '@sdc/shared/types';

export default {
    component: ContributionsBanner,
    title: 'Banners/Contributions',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <ContributionsBanner {...props} />;

export const Default = Template.bind({});

export const WithReminder = Template.bind({});
WithReminder.args = {
    content: {
        ...content,
        secondaryCta: {
            type: SecondaryCtaType.ContributionsReminder,
        },
    },
};

export const WithPrefilledReminder = Template.bind({});
WithPrefilledReminder.args = {
    ...WithReminder.args,

    fetchEmail: () => {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve('test@guardian.co.uk');
            }, 500);
        });
    },
};

export const WithoutSupportUrl = Template.bind({});
WithoutSupportUrl.args = {
    ...WithReminder.args,
    content: {
        ...content,
        cta: {
            baseUrl: 'https://theguardian.com',
            text: 'The Guardian',
        },
    },
};

const TemplateV1: Story<BannerProps> = (props: BannerProps) => (
    <ContributionsBannerTopReaderAcV1 {...props} />
);

export const WithTopReaderArticleCountV1 = TemplateV1.bind({});
WithTopReaderArticleCountV1.args = {
    numArticles: 99,
};

const TemplateV2: Story<BannerProps> = (props: BannerProps) => (
    <ContributionsBannerTopReaderAcV2 {...props} />
);

export const WithTopReaderArticleCountV2 = TemplateV2.bind({});
WithTopReaderArticleCountV2.args = WithTopReaderArticleCountV1.args;
