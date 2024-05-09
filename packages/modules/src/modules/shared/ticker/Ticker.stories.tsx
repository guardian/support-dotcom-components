import React from 'react';
import { Ticker } from './Ticker';
import {
    TickerCountType,
    TickerEndType,
    TickerSettings,
} from '@sdc/shared/dist/types/props/shared';
import { ComponentMeta, DecoratorFn } from '@storybook/react';

const TickerDecorator: DecoratorFn = (Story) => (
    <div
        style={{
            width: '100%',
            maxWidth: '500px',
        }}
    >
        <Story />
    </div>
);

export default {
    title: 'Components/Ticker',
    component: Ticker,
    argTypes: {
        appearance: {
            control: {
                type: 'radio',
                options: ['light', 'dark'],
            },
        },
    },
    decorators: [TickerDecorator],
} as ComponentMeta<typeof Ticker>;

function Template(args: TickerSettings) {
    return <Ticker {...args} />;
}

Template.args = {} as TickerSettings;

export const PeopleTicker = Template.bind({});

PeopleTicker.args = {
    tickerData: {
        total: 50000,
        goal: 200000,
    },
    end: 250000,
    countType: TickerCountType.people,
    endType: TickerEndType.hardstop,
    countryGroupId: 'UnitedStates',
    name: 'AU',
};

export const MoneyTicker = Template.bind({});

MoneyTicker.args = {
    tickerData: {
        total: 20000,
        goal: 200000,
    },
    end: 200000,
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    countryGroupId: 'UnitedStates',
    headline: 'Help us reach our goal',
    name: 'US',
};

export const TickerGoalExceeded = Template.bind({});
TickerGoalExceeded.args = {
    tickerData: {
        total: 6000000,
        goal: 200000,
    },
    end: 200000,
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    countryGroupId: 'AUDCountries',
    name: 'AU',
};
