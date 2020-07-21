import React, { ReactElement } from 'react';
import { ContributionsBanner } from './modules/banners/contributions/ContributionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: ContributionsBanner,
    title: 'Components/ContributionsBanner',
    decorators: [withKnobs],
};

const tracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    ophanComponentId: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'MainContributionsBanner',
    abTestVariant: 'control',
    campaignCode: 'MainContributionsBanner_control',
};

const data = {
    messageText:
        '<strong> We chose a different approach. Will you support it?</strong> Unlike many news organisations, we made a choice to keep our journalism open for all. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart. Every contribution, however big or small, is so valuable – it is essential in protecting our editorial independence.',
    ctaText: ' Support the Guardian today from as little as %%CURRENCY_SYMBOL%%1.',
    buttonCaption: 'Support The Guardian',
    linkUrl: 'https://support.theguardian.com/contribute',
};

const props = {
    tracking,
    isSupporter: false,
    countryCode: 'GB',
    data,
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <ContributionsBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Main Contributions Banner' };
