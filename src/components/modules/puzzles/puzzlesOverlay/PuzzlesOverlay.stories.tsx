import React, { ReactElement } from 'react';
import { PuzzlesOverlay } from './PuzzlesOverlay';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: PuzzlesOverlay,
    title: 'Puzzles/Overlay',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <PuzzlesOverlay />
        </StorybookWrapper>
    );
};

defaultStory.story = {
    name: 'Puzzles Interactive Overlay',
    decorators: [(Story: React.FC): ReactElement => <Story />],
};
