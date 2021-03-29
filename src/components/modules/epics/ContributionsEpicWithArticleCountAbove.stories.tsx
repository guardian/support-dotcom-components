import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsEpic } from './ContributionsEpicWithArticleCountAbove';
import { EpicProps } from './ContributionsEpic';
import { props } from './utils/storybook';
import { EpicDecorator } from './ContributionsEpic.stories';

export default {
    component: ContributionsEpic,
    title: 'Epics/ContributionsWithArticleCountAbove',
    args: { ...props, numArticles: 989 },
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsEpic {...props} />;

export const Default = Template.bind({});
