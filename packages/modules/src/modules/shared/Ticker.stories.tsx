import type { Meta } from '@storybook/react';
import { TickerCountType, TickerEndType, TickerSettings } from '@sdc/shared/types';
import DesignableBannerTicker from '../banners/designableBanner/components/DesignableBannerTicker';
import { TickerStylingSettings } from '../banners/designableBanner/settings';

const tickerSettings: TickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    currencySymbol: '',
    copy: {
        countLabel: 'contributions in March',
        goalReachedPrimary: "We've met our goal - thank you!",
        goalReachedSecondary: '',
    },
    tickerData: {
        total: 25_000,
        goal: 50_000,
    },
    name: 'AU', //this comes from the .json file name in S3. Other option is US - maybe that needs expanded to include the UK?
};

const tickerStylingSettings: TickerStylingSettings = {
    textColour: '#052962',
    filledProgressColour: '#052962',
    progressBarBackgroundColour: '#cccccc',
    goalMarkerColour: '#000000',
};

export default {
    title: 'Components/Ticker',
    component: DesignableBannerTicker,
    args: {
        tickerSettings: tickerSettings,
        stylingSettings: tickerStylingSettings,
    },
} as Meta<typeof DesignableBannerTicker>;

export const Default = { args: {} };

export const GoalReached = {
    args: {
        tickerSettings: {
            ...tickerSettings,
            tickerData: {
                total: 50_000,
                goal: 50_000,
            },
        },
        stylingSettings: {
            //not accurate colours - just for demo purposes
            filledProgressColour: '#ecce43',
            progressBarBackgroundColour: '#cccccc',
        },
    },
};
