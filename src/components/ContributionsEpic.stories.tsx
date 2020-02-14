import React, { ReactElement } from 'react';
import { ContributionsEpic } from './ContributionsEpic';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import testData from './ContributionsEpic.testData';

export default {
    component: ContributionsEpic,
    title: 'Components/ContributionsEpic',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    // Epic content props
    const epicContent = {
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlighted: object('highlighted', testData.content.highlighted),
    };

    // Epic metadata props
    const epicTracking = {
        ophanPageId: text('ophanPageId', testData.tracking.ophanPageId),
        ophanComponentId: text('ophanComponentId', testData.tracking.ophanComponentId),
        platformId: text('platformId', testData.tracking.platformId),
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    // Epic localisation props
    const epicLocalisation = {
        countryCode: text('countryCode', testData.localisation.countryCode || ''),
    };

    return (
        <StorybookWrapper>
            <ContributionsEpic
                content={epicContent}
                tracking={epicTracking}
                localisation={epicLocalisation}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default epic' };
