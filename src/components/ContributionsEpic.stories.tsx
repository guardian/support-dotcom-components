import React, { ReactElement } from 'react';
import { ContributionsEpic } from './ContributionsEpic';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';
import testData from './ContributionsEpic.testData';
import { Variant } from '../lib/variants';
import { getArticleViewCountForWeeks } from '../lib/history';

export default {
    component: ContributionsEpic,
    title: 'Components/ContributionsEpic',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    // Epic content props
    const variant: Variant = {
        name: 'Test Epic',
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlightedText: text('highlightedText', testData.content.highlightedText),
        showTicker: false,
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
        countryCode: text('countryCode', testData.localisation.countryCode || 'GB'),
    };

    // Number of articles viewed
    // Used to replace the template placeholder
    const periodInWeeks = 52;
    const numArticles = getArticleViewCountForWeeks(
        testData.targeting.weeklyArticleHistory,
        periodInWeeks,
    );

    return (
        <StorybookWrapper>
            <ContributionsEpic
                variant={variant}
                tracking={epicTracking}
                localisation={epicLocalisation}
                numArticles={numArticles}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default epic' };
