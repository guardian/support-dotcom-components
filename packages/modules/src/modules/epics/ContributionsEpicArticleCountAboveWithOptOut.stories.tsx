import React from 'react';
import { Story, Meta } from '@storybook/react';
import { EpicDecorator } from './ContributionsEpic.stories';
import {
	ContributionsEpicArticleCountAboveWithOptOut,
	ContributionsEpicArticleCountAboveWithOptOutProps,
} from './ContributionsEpicArticleCountAboveWithOptOut';

export default {
	component: ContributionsEpicArticleCountAboveWithOptOut,
	title: 'Epics/ContributionsEpicArticleCountAboveWithOptOut',
	args: {
		numArticles: 989,
		isArticleCountOn: true,
	},
	decorators: [EpicDecorator],
} as Meta;

const Template: Story<ContributionsEpicArticleCountAboveWithOptOutProps> = (
	props: ContributionsEpicArticleCountAboveWithOptOutProps,
) => <ContributionsEpicArticleCountAboveWithOptOut {...props} />;

export const ArticleCountOn = Template.bind({});

export const ArticleCountOff = Template.bind({});

// Nothing displays
export const ArticleCountOnBelow5 = Template.bind({});

ArticleCountOff.args = {
	isArticleCountOn: false,
};

ArticleCountOnBelow5.args = {
	numArticles: 1,
};
