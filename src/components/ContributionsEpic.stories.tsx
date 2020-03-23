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

// Number of articles viewed
// Used to replace the template placeholder
const periodInWeeks = 52;
const numArticles = getArticleViewCountForWeeks(
    testData.targeting.weeklyArticleHistory,
    periodInWeeks,
);

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

export const backgroundImageStory = (): ReactElement => {
    // Epic content props
    const variant: Variant = {
        name: 'Test Epic',
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlightedText: text('highlightedText', testData.content.highlightedText),
        showTicker: false,
        backgroundImageUrl: text('backgroundImageUrl', testData.content.backgroundImageUrl),
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

backgroundImageStory.story = { name: 'Epic with Image' };

export const reminderStory = (): ReactElement => {
    // Epic content props
    const variant: Variant = {
        name: 'Test Epic',
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlightedText: text('highlightedText', testData.content.highlightedText),
        showTicker: false,
        showReminderFields: {
            reminderDate: text('reminderDate', testData.content.showReminderFields.reminderDate),
            reminderDateAsString: text(
                'reminderDateAsString',
                testData.content.showReminderFields.reminderDateAsString,
            ),
        },
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

reminderStory.story = { name: 'Epic with Reminder' };
