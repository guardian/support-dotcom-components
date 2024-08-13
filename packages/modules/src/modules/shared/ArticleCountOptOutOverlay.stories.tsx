import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {
    ArticleCountOptOutOverlay,
    ArticleCountOptOutOverlayProps,
} from './ArticleCountOptOutOverlay';

export default {
    component: ArticleCountOptOutOverlay,
    title: 'Shared/ArticleCountOptOutOverlay',
    args: {
        type: 'banner',
        hasOptedOut: false,
        onClose: (): void => console.log('close'),
        onOptOut: (): void => console.log('close'),
    },
} as Meta;

const Template: StoryFn<ArticleCountOptOutOverlayProps> = (
    props: ArticleCountOptOutOverlayProps,
) => <ArticleCountOptOutOverlay {...props} />;

export const Epic = Template.bind({});
Epic.args = {
    type: 'epic',
};

export const Banner = Template.bind({});
Banner.args = {
    type: 'banner',
};
