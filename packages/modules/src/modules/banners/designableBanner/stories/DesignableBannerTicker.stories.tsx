import React from 'react';
import { TickerCountType, TickerEndType } from '@sdc/shared/dist/types/props/shared';
import { ComponentMeta, ComponentStory, DecoratorFn } from '@storybook/react';
import DesignableBannerTicker, {
    DesignableBannerTickerProps,
} from '../components/DesignableBannerTicker';

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
    component: DesignableBannerTicker,
    title: 'Ticker',
    decorators: [TickerDecorator],
} as ComponentMeta<typeof DesignableBannerTicker>;

const Template: ComponentStory<typeof DesignableBannerTicker> = (props) => (
    <DesignableBannerTicker {...props} />
);

const baseArgs: DesignableBannerTickerProps = {
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
            countLabel: 'supporters',
            goalReachedPrimary: 'We have reached our goal',
            goalReachedSecondary: 'Thank you for your support',
        },
    },
    stylingSettings: {
        textColour: '#052962',
        filledProgressColour: '#d9bd3c',
        progressBarBackgroundColour: '#d30606',
        goalMarkerColour: '#ecce43',
    },
} as const;

export const PeopleHeader = Template.bind({});
PeopleHeader.args = baseArgs;

export const MoneyHeader = Template.bind({});
MoneyHeader.args = {
    tickerSettings: {
        tickerData: {
            total: 5000,
            goal: 200000,
        },
        countType: TickerCountType.money,
        endType: TickerEndType.hardstop,
        currencySymbol: '$',
        name: 'AU',
        copy: {
            countLabel: 'contributed',
            goalReachedPrimary: 'We have reached our goal',
            goalReachedSecondary: 'Thank you for your support',
        },
    },
    stylingSettings: {
        textColour: '#48d900',
        filledProgressColour: '#d9bd3c',
        progressBarBackgroundColour: '#802222',
        goalMarkerColour: '#c7ec43',
    },
};
