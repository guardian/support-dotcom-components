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
    const epicMetadata = {
        ophanPageId: text('ophanPageId', testData.metadata.ophanPageId),
        ophanComponentId: text('ophanComponentId', testData.metadata.ophanComponentId),
        platformId: text('platformId', testData.metadata.platformId),
        campaignCode: text('campaignCode', testData.metadata.campaignCode),
        abTestName: text('abTestName', testData.metadata.abTestName),
        abTestVariant: text('abTestVariant', testData.metadata.abTestVariant),
        referrerUrl: text('referrerUrl', testData.metadata.referrerUrl),
    };

    return (
        <StorybookWrapper>
            <ContributionsEpic content={epicContent} metadata={epicMetadata} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default epic' };
