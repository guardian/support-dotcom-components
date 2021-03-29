import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicDecorator } from './ContributionsEpic.stories';
import { ContributionsEpicArticleCountAbove, Props } from './ContributionsEpicArticleCountAbove';

export default {
    component: ContributionsEpicArticleCountAbove,
    title: 'Epics/ContributionsEpicArticleCountAbove',
    args: {
        numArticles: 989,
    },
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<Props> = (props: Props) => <ContributionsEpicArticleCountAbove {...props} />;

export const Default = Template.bind({});
