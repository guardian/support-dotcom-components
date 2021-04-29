import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicDecorator } from './ContributionsEpic.stories';
import {
    ContributionsEpicArticleCountOptIn,
    ContributionsEpicArticleCountOptInProps,
} from './ContributionsEpicArticleCountOptIn';

export default {
    component: ContributionsEpicArticleCountOptIn,
    title: 'Epics/ContributionsEpicArticleCountOptIn',
    decorators: [EpicDecorator],
} as Meta;

const Template: Story<ContributionsEpicArticleCountOptInProps> = (
    props: ContributionsEpicArticleCountOptInProps,
) => <ContributionsEpicArticleCountOptIn {...props} />;

export const Default = Template.bind({});
