import React, { ReactElement } from 'react';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { number, withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../utils/StorybookWrapper';
import { TickerCountType, TickerEndType } from '../../../lib/variants';

export default {
    component: ContributionsEpicTicker,
    title: 'Components/ContributionsEpicTicker',
    decorators: [withKnobs],
};

const moneyTickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.unlimited,
    currencySymbol: '£',
    copy: {
        countLabel: 'contributed',
        goalReachedPrimary: "We've met our goal - thank you",
        goalReachedSecondary: 'Contributions are still being accepted',
    },
};

export const defaultStory = (): ReactElement => {
    const total = number('total', 50000);
    const goal = number('goal', 100000);

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} settings={moneyTickerSettings} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Ticker' };

export const goalReached = (): ReactElement => {
    const total = number('total', 100000);
    const goal = number('goal', 100000);

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} settings={moneyTickerSettings} />
        </StorybookWrapper>
    );
};

goalReached.story = { name: 'Ticker - Goal Reached' };

export const goalExceeded = (): ReactElement => {
    const total = number('total', 101000);
    const goal = number('goal', 100000);

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} settings={moneyTickerSettings} />
        </StorybookWrapper>
    );
};

goalExceeded.story = { name: 'Ticker - Goal Exceeded' };

const peopleTickerSettings = {
    countType: TickerCountType.people,
    endType: TickerEndType.unlimited,
    currencySymbol: '£',
    copy: {
        countLabel: 'supporters in Australia',
        goalReachedPrimary: "We've hit our goal!",
        goalReachedSecondary: 'but you can still support us',
    },
};

export const supportersGoalExceeded = (): ReactElement => {
    const total = number('total', 101000);
    const goal = number('goal', 100000);

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} settings={peopleTickerSettings} />
        </StorybookWrapper>
    );
};

supportersGoalExceeded.story = { name: 'Ticker - Supporters / Goal Exceeded' };
