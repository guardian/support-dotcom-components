import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '@sdc/shared/types';
import { Header } from './HeaderSupportAgain';
import { props, HeaderDecorator } from './Header.stories';

export default {
	component: Header,
	title: 'Header/HeaderSupportAgain',
	args: {
		...props,
		content: {
			...props.content,
			heading: 'Thank you',
			subheading: 'Your support powers our independent journalism',
			primaryCta: {
				url: '',
				text: 'Support us again',
			},
			secondaryCta: undefined,
		},
	},
	decorators: [HeaderDecorator],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => (
	<Header {...props} />
);

export const DefaultHeader = Template.bind({});
