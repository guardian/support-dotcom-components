import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ResearchSurveyBannerUnvalidated as ResearchSurveyBanner } from './ResearchSurveyBanner';
import { props } from '../utils/storybook';
import { BannerProps } from '@sdc/shared/types';

export default {
    component: ResearchSurveyBanner,
    title: 'Banners/ResearchSurveyBanner',
    args: props,
} as Meta;

const Template: Story<BannerProps> = (props: BannerProps) => <ResearchSurveyBanner {...props} />;

export const Default = Template.bind({});
Default.args = {
    ...props,
    separateArticleCount: false,
    content: {
        heading: 'Take part in this short survey from the Guardian',
        paragraphs: [
            "We are always looking to improve what we do and we'd love to have your input. The feedback we receive will enable us to improve our website and products to better meet your needs, and should take less than 5 minutes to complete.",
        ],
        cta: {
            text: 'Take the survey',
            baseUrl: 'https://surveys.theguardian.com/c/a/6NlT5qcs0w6E6NVjsTpVO8',
        },
    },
};
