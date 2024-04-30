import React from 'react';
import { Ticker } from '../banners/designableBanner/components/ticker/Ticker';
import {
    TickerCountType,
    TickerEndType,
    TickerSettings,
} from '@sdc/shared/dist/types/props/shared';

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
        onGoalReached: { action: 'goal reached' },
    },
    decorators: [
        (Story: React.FC): React.JSX.Element => (
            <div
                style={{
                    width: '100%',
                    maxWidth: '500px',
                }}
            >
                <Story />
            </div>
        ),
    ],
};

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
    endType: TickerEndType.unlimited,
    countryGroupId: 'GBPCountries',
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
    countryGroupId: 'GBPCountries',
    headline: 'End of year campaign',
    name: 'US',
};
