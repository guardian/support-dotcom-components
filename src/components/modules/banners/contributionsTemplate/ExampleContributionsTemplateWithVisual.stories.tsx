import React, { ReactElement } from 'react';
import ExampleContributionsTemplateWithVisual from './ExampleContributionsTemplateWithVisual';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerProps, BannerContent, BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: ExampleContributionsTemplateWithVisual,
    title: 'Components/ContributionsTemplateWithVisual',
    decorators: [withKnobs],
};

const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'ContributionsTemplateWithVisual',
    abTestVariant: 'control',
    campaignCode: 'ContributionsTemplateWithVisual_control',
};

const content: BannerContent = {
    messageText:
        '<strong> We chose a different approach. Will you support it?</strong> Unlike many news organisations, we made a choice to keep our journalism open for all. At a time when factual information is a necessity, we believe that each of us, around the world, deserves access to accurate reporting with integrity at its heart. Every contribution, however big or small, is so valuable – it is essential in protecting our editorial independence.',
    highlightedText: ' Support the Guardian today from as little as %%CURRENCY_SYMBOL%%1.',
    cta: {
        baseUrl: 'https://support.theguardian.com/contribute',
        text: 'Support The Guardian',
    },
};

const props: BannerProps = {
    bannerChannel: 'contributions',
    tracking,
    isSupporter: false,
    countryCode: 'GB',
    content,
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <ExampleContributionsTemplateWithVisual {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Contributions Template With Visual' };
