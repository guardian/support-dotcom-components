import React, { ReactElement } from 'react';
import { PuzzlesBanner } from './PuzzlesBanner';
import { StorybookWrapper, BannerWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: PuzzlesBanner,
    title: 'Puzzles/PuzzlesBanner',
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <PuzzlesBanner />
        </StorybookWrapper>
    );
};

defaultStory.story = {
    name: 'Puzzles Banner',
    decorators: [
        (Story: React.FC): ReactElement => (
            <BannerWrapper>
                <Story />
            </BannerWrapper>
        ),
    ],
};
