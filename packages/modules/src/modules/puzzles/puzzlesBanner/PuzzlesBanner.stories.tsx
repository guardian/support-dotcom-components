import React, { ReactElement } from 'react';
import { PuzzlesBanner } from './PuzzlesBanner';
import { StorybookWrapper, BannerWrapper } from '../../../utils/StorybookWrapper';
import { Tracking } from '@sdc/shared/types';

export default {
    component: PuzzlesBanner,
    title: 'Puzzles/PuzzlesBanner',
};

const tracking: Tracking = {
    ophanPageId: 'kbluzw2csbf83eabettt',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'GuardianPuzzlesBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_OTHER',
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <PuzzlesBanner tracking={tracking} submitComponentEvent={console.log} />
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
