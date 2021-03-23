import React, { ReactElement } from 'react';
import { PuzzlesBanner } from './PuzzlesBanner';
import { StorybookWrapper, BannerWrapper } from '../../../../utils/StorybookWrapper';
import { BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: PuzzlesBanner,
    title: 'Puzzles/PuzzlesBanner',
};

const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabettt',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'GuardianPuzzlesBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_PUZZLES_BANNER',
    products: ['PUZZLES_APP'],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <PuzzlesBanner tracking={tracking} />
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
