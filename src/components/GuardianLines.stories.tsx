import React, { ReactElement } from 'react';
import { GuardianLines } from './GuardianLines';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: GuardianLines,
    title: 'Components/GuardianLines',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <GuardianLines />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default 4 lines' };

export const eightLinesStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <GuardianLines count={8} />
        </StorybookWrapper>
    );
};

eightLinesStory.story = { name: 'Special 8 lines' };
