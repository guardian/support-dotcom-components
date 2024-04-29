import React from 'react';
import {
    DesignableBannerTicker,
    TickerProps,
} from '../banners/designableBanner/components/DesignableBannerTicker';
import { TickerCountType, TickerEndType } from '@sdc/shared/dist/types';

export default {
    title: 'Checkouts/Ticker',
    component: DesignableBannerTicker,
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
        (Story: React.FC): JSX.Element => (
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

function Template(args: TickerProps) {
    return <DesignableBannerTicker {...args} />;
}

Template.args = {} as TickerProps;

export const PeopleTicker = Template.bind({});

PeopleTicker.args = {
    total: 200000,
    goal: 200000,
    end: 250000,
    countType: TickerCountType.people,
    endType: TickerEndType.unlimited,
    countryGroupId: 'AUDCountries',
    headline: 'End of year campaign',
};

export const MoneyTicker = Template.bind({});

MoneyTicker.args = {
    total: 50000,
    goal: 200000,
    end: 230000,
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    countryGroupId: 'UnitedStates',
    headline: 'End of year campaign',
};
