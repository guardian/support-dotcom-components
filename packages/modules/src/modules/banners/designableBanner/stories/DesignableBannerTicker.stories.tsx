import React from 'react';
import { ComponentMeta, DecoratorFn, Story } from '@storybook/react';
import {
    DesignableBannerTicker,
    DesignableBannerTickerProps,
} from '../components/DesignableBannerTicker';
import { TickerCountType, TickerEndType } from '@sdc/shared/dist/types';

const TickerDecorator: DecoratorFn = (Story) => (
    <div style={{ margin: '20px' }}>
        <Story />
    </div>
);

export default {
    component: DesignableBannerTicker,
    title: 'Ticker',
    decorators: [TickerDecorator],
} as ComponentMeta<typeof DesignableBannerTicker>;

// Define a template for the story
const Template: Story<DesignableBannerTickerProps> = (props: DesignableBannerTickerProps) => (
    <DesignableBannerTicker {...props} />
);

export const PeopleTicker = Template.bind({});
PeopleTicker.args = {
    tickerSettings: {
        tickerData: {
            total: 5000,
            goal: 200000,
        },
        countType: TickerCountType.people,
        endType: TickerEndType.hardstop,
        currencySymbol: '',
        name: 'AU',
        copy: {
            countLabel: 'Help us reach our goal',
            goalReachedPrimary: 'We have reached our goal',
            goalReachedSecondary: 'Thank you for your support',
        },
    },
    stylingSettings: {
        textColour: '#052962',
        filledProgressColour: '#d9bd3c',
        progressBarBackgroundColour: '#d30606',
    },
};

export const PeopleTickerGoalMet = Template.bind({});
PeopleTickerGoalMet.args = {
    tickerSettings: {
        tickerData: {
            total: 50000000,
            goal: 200000,
        },
        countType: TickerCountType.money,
        endType: TickerEndType.hardstop,
        currencySymbol: '$',
        name: 'US',
        copy: {
            countLabel: 'Help us reach our goal',
            goalReachedPrimary: 'Weve met our goal but you can still contribute',
            goalReachedSecondary: '',
        },
    },
    stylingSettings: {
        textColour: '#48d900',
        filledProgressColour: '#d9bd3c',
        progressBarBackgroundColour: '#d30606',
    },
};

export const MoneyTicker = Template.bind({});
MoneyTicker.args = {
    tickerSettings: {
        tickerData: {
            total: 5000,
            goal: 200000,
        },
        countType: TickerCountType.money,
        endType: TickerEndType.hardstop,
        currencySymbol: '$',
        name: 'US',
        copy: {
            countLabel: '',
            goalReachedPrimary: 'We have reached our goal',
            goalReachedSecondary: 'Thank you for your support',
        },
    },
    stylingSettings: {
        textColour: '#052962',
        filledProgressColour: '#d9bd3c',
        progressBarBackgroundColour: '#d30606',
    },
};
