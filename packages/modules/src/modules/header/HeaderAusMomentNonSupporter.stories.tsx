import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '@sdc/shared/types';
import { Header } from './HeaderAusMomentNonSupporter';
import { props, HeaderDecorator } from './Header.stories';

export default {
    component: Header,
    title: 'Header/AusMomentNonSupporter',
    args: {
        ...props,
        content: {
            ...props.content,
            heading: 'Support The Guardian',
            primaryCta: {
                url: '',
                text: 'Contribute',
            },
            secondaryCta: {
                url: '',
                text: 'Subscribe',
            },
        },
    },
    decorators: [HeaderDecorator],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => <Header {...props} />;

export const NonSupporter = Template.bind({});
