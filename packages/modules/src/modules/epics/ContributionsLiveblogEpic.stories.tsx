import React, { ReactElement } from 'react';
import { ContributionsLiveblogEpic } from './ContributionsLiveblogEpic';
import { withKnobs, text, object } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../utils/StorybookWrapper';
import testData from './ContributionsLiveblogEpic.testData';
import { EpicVariant, Tracking } from '@sdc/shared/types';

export default {
    component: ContributionsLiveblogEpic,
    title: 'Components/ContributionsLiveblogEpic',
    decorators: [withKnobs],
};

// Number of articles viewed
// Used to replace the template placeholder
const articleCounts = {
    for52Weeks: 99,
    forTargetedWeeks: 99,
};

export const defaultStory = (): ReactElement => {
    // Epic content props
    const variant: EpicVariant = {
        name: 'Test Epic',
        paragraphs: object('paragraphs', testData.content.paragraphs),
        cta: {
            text: text('primaryCta.text', testData.content.cta.text),
            baseUrl: text('primaryCta.baseUrl', testData.content.cta.baseUrl),
        },
    };

    // Epic metadata props
    const epicTracking: Tracking = {
        ophanPageId: text('ophanPageId', testData.tracking.ophanPageId),
        componentType: testData.tracking.componentType,
        products: testData.tracking.products,
        platformId: text('platformId', testData.tracking.platformId),
        clientName: testData.tracking.clientName,
        campaignCode: text('campaignCode', testData.tracking.campaignCode),
        campaignId: text(
            'campaignId',
            testData.tracking.campaignId || testData.tracking.abTestName,
        ),
        abTestName: text('abTestName', testData.tracking.abTestName),
        abTestVariant: text('abTestVariant', testData.tracking.abTestVariant),
        referrerUrl: text('referrerUrl', testData.tracking.referrerUrl),
    };

    // Epic countryCode prop
    const countryCode = text('countryCode', testData.targeting.countryCode || 'GB');

    return (
        <StorybookWrapper>
            <ContributionsLiveblogEpic
                variant={variant}
                tracking={epicTracking}
                countryCode={countryCode}
                articleCounts={articleCounts}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default Epic' };
