import React, { ReactElement } from 'react';
import { ContributionsEpic } from './ContributionsEpic';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import mocks from './ContributionsEpic.mocks';

export default {
    component: ContributionsEpic,
    title: 'Components/ContributionsEpic',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    // Epic content props
    const epicContent = {
        heading: text('heading', mocks.content.heading),
        paragraphs: object('paragraphs', mocks.content.paragraphs),
        highlighted: object('highlighted', mocks.content.highlighted),
    };

    // Epic metadata props
    const epicMetadata = {
        ophanPageId: text('ophanPageId', mocks.metadata.ophanPageId),
        ophanComponentId: text('ophanComponentId', mocks.metadata.ophanComponentId),
        platformId: text('platformId', mocks.metadata.platformId),
        campaignCode: text('campaignCode', mocks.metadata.campaignCode),
        abTestName: text('abTestName', mocks.metadata.abTestName),
        abTestVariant: text('abTestVariant', mocks.metadata.abTestVariant),
        referrerUrl: text('referrerUrl', mocks.metadata.referrerUrl),
    };

    return (
        <StorybookWrapper>
            <ContributionsEpic content={epicContent} metadata={epicMetadata} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default epic' };
