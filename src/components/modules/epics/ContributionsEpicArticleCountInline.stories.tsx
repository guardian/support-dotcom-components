import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicDecorator } from './ContributionsEpic.stories';
import { ContributionsEpicArticleCountInline, Props } from './ContributionsEpicArticleCountInline';

export default {
    component: ContributionsEpicArticleCountInline,
    title: 'Epics/ContributionsEpicArticleCountInline',
    args: {
        numArticles: 989,
    },
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<Props> = (props: Props) => <ContributionsEpicArticleCountInline {...props} />;

export const Default = Template.bind({});
