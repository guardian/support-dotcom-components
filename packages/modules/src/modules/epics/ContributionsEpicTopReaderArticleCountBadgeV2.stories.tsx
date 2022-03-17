import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsEpicUnvalidated as ContributionsEpic } from './ContributionsEpicTopReaderArticleCountBadgeV2';
import { props } from './utils/storybook';
import { EpicProps } from '@sdc/shared/types';
import { EpicDecorator, WithAboveArticleCount } from './ContributionsEpic.stories';

export default {
    component: ContributionsEpic,
    title: 'Epics/ContributionsTopReaderV2',
    args: props,
    decorators: [EpicDecorator],
    excludeStories: /.*Decorator$/,
} as Meta;

const Template: Story<EpicProps> = (props: EpicProps) => <ContributionsEpic {...props} />;

export const Default = Template.bind({});
Default.args = WithAboveArticleCount.args;
