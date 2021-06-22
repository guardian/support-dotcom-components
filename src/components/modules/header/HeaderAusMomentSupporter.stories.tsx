import React from 'react';
import { Story, Meta } from '@storybook/react';
import { HeaderProps } from '../../../types/HeaderTypes';
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
                text: 'Hear from our supporters',
            },
            secondaryCta: null,
        },
    },
    decorators: [HeaderDecorator],
} as Meta;

const Template: Story<HeaderProps> = (props: HeaderProps) => <Header {...props} />;

export const Supporter = Template.bind({});
