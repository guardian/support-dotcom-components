import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ContributionsEpicTicker, Props } from './ContributionsEpicTicker';
import { TickerCountType, TickerEndType } from '@sdc/shared/types';

export default {
    component: ContributionsEpicTicker,
    title: 'Epics/ContributionsTicker',
    args: {
        settings: {
            countType: TickerCountType.money,
            endType: TickerEndType.unlimited,
            currencySymbol: '£',
            copy: {
                countLabel: 'contributed',
                goalReachedPrimary: "We've met our goal - thank you",
                goalReachedSecondary: 'Contributions are still being accepted',
            },
        },
        total: 50_000,
        goal: 100_000,
    },
} as Meta;

const Template: Story<Props> = (props: Props) => <ContributionsEpicTicker {...props} />;

export const Default = Template.bind({});

export const GoalReached = Template.bind({});
GoalReached.args = {
    total: 150_000,
};
