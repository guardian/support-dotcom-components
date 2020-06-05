import React, { ReactElement } from 'react';
import { ContributionsEpicTicker } from './ContributionsEpicTicker';
import { withKnobs, number, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: ContributionsEpicTicker,
    title: 'Components/ContributionsEpicTicker',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    const total = number('total', 50000);
    const goal = number('goal', 100000);
    const countryCode = text('countryCode', 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} countryCode={countryCode} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Ticker' };

export const goalReached = (): ReactElement => {
    const total = number('total', 100000);
    const goal = number('goal', 100000);
    const countryCode = text('countryCode', 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} countryCode={countryCode} />
        </StorybookWrapper>
    );
};

goalReached.story = { name: 'Ticker - Goal Reached' };

export const goalExceeded = (): ReactElement => {
    const total = number('total', 101000);
    const goal = number('goal', 100000);
    const countryCode = text('countryCode', 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpicTicker total={total} goal={goal} countryCode={countryCode} />
        </StorybookWrapper>
    );
};

goalExceeded.story = { name: 'Ticker - Goal Exceeded' };
