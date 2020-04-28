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
        cta: {
            text: text('primaryCta.text', testData.content.cta.text),
            baseUrl: text('primaryCta.baseUrl', testData.content.cta.baseUrl),
        },
    };

    // Epic metadata props
    const epicTracking = {
        ophanPageId: text('ophanPageId', testData.tracking.ophanPageId),
        ophanComponentId: text('ophanComponentId', testData.tracking.ophanComponentId),
        platformId: text('platformId', testData.tracking.platformId),
        clientName: testData.tracking.clientName,
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        campaignId: text('campaignId', testData.tracking.campaignId),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    // Epic countryCode prop
    const countryCode = text('countryCode', testData.targeting.countryCode || 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpic
                variant={variant}
                tracking={epicTracking}
                countryCode={countryCode}
                numArticles={numArticles}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default Epic' };

export const backgroundImageStory = (): ReactElement => {
    // Epic content props
    const variant: Variant = {
        name: 'Test Epic',
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlightedText: text('highlightedText', testData.content.highlightedText),
        showTicker: false,
        backgroundImageUrl: text('backgroundImageUrl', testData.content.backgroundImageUrl),
        cta: {
            text: text('primaryCta.text', testData.content.cta.text),
            baseUrl: text('primaryCta.baseUrl', testData.content.cta.baseUrl),
        },
    };

    // Epic metadata props
    const epicTracking = {
        ophanPageId: text('ophanPageId', testData.tracking.ophanPageId),
        ophanComponentId: text('ophanComponentId', testData.tracking.ophanComponentId),
        platformId: text('platformId', testData.tracking.platformId),
        clientName: testData.tracking.clientName,
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        campaignId: text('campaignId', testData.tracking.campaignId),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    // Epic countryCode prop
    const countryCode = text('countryCode', testData.targeting.countryCode || 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpic
                variant={variant}
                tracking={epicTracking}
                countryCode={countryCode}
                numArticles={numArticles}
            />
        </StorybookWrapper>
    );
};

backgroundImageStory.story = { name: 'Epic with Image' };

export const secondaryButtonStory = (): ReactElement => {
    // Epic content props
    const variant: Variant = {
        name: 'Test Epic',
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlightedText: text('highlightedText', testData.content.highlightedText),
        showTicker: false,
        cta: {
            text: text('primaryCta.text', testData.content.cta.text),
            baseUrl: text('primaryCta.baseUrl', testData.content.cta.baseUrl),
        },
        secondaryCta: {
            text: text('secondaryCta.text', testData.content.secondaryCta.text),
            baseUrl: text('secondaryCta.baseUrl', testData.content.secondaryCta.baseUrl),
        },
    };

    // Epic metadata props
    const epicTracking = {
        ophanPageId: text('ophanPageId', testData.tracking.ophanPageId),
        ophanComponentId: text('ophanComponentId', testData.tracking.ophanComponentId),
        platformId: text('platformId', testData.tracking.platformId),
        clientName: testData.tracking.clientName,
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        campaignId: text('campaignId', testData.tracking.campaignId),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    const countryCode = text('countryCode', testData.targeting.countryCode || 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpic
                variant={variant}
                tracking={epicTracking}
                countryCode={countryCode}
                numArticles={numArticles}
            />
        </StorybookWrapper>
    );
};

secondaryButtonStory.story = { name: 'Epic with Secondary Button' };

export const epicReminderStory = (): ReactElement => {
    // Epic content props
    const variant: Variant = {
        name: 'Test Epic',
        heading: text('heading', testData.content.heading),
        paragraphs: object('paragraphs', testData.content.paragraphs),
        highlightedText: text('highlightedText', testData.content.highlightedText),
        showTicker: false,
        cta: {
            text: text('primaryCta.text', testData.content.cta.text),
            baseUrl: text('primaryCta.baseUrl', testData.content.cta.baseUrl),
        },
        showReminderFields: {
            reminderCTA: text('reminderCTA', testData.content.showReminderFields.reminderCTA),
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
        clientName: testData.tracking.clientName,
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        campaignId: text('campaignId', testData.tracking.campaignId),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    const countryCode = text('countryCode', testData.targeting.countryCode || 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpic
                variant={variant}
                tracking={epicTracking}
                countryCode={countryCode}
                numArticles={numArticles}
            />
        </StorybookWrapper>
    );
};

epicReminderStory.story = { name: 'Epic with Reminder' };

export const epicWithoutButtons = (): ReactElement => {
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
        clientName: testData.tracking.clientName,
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        campaignId: text('campaignId', testData.tracking.campaignId),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    // Epic countryCode prop
    const countryCode = text('countryCode', testData.targeting.countryCode || 'GB');

    return (
        <StorybookWrapper>
            <ContributionsEpic
                variant={variant}
                tracking={epicTracking}
                countryCode={countryCode}
                numArticles={numArticles}
            />
        </StorybookWrapper>
    );
};

epicWithoutButtons.story = { name: 'Epic without buttons' };
