import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '@sdc/shared/types';
import { Header } from './HeaderAusMomentSupporter';
import { props, HeaderDecorator } from './Header.stories';

export default {
	component: Header,
	title: 'Header/AusMomentSupporter',
	args: {
		...props,
		content: {
			...props.content,
			heading: 'Thank you',
			primaryCta: {
				url: '',
				text: 'Support us again',
			},
		},
	},
	decorators: [HeaderDecorator],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => (
	<Header {...props} />
);

export const SingleSupporter = Template.bind({});

export const RecurringSupporter = Template.bind({});

RecurringSupporter.args = {
	...props,
	content: {
		...props.content,
		heading: 'Thank you',
		primaryCta: {
			url: '',
			text: 'Make an extra contribution',
		},
	},
};
