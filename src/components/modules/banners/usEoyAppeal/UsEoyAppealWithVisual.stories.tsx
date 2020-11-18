import React, { ReactElement } from 'react';
import { UsEoyAppealBannerWithVisual } from './UsEoyAppealWithVisual';
import { withKnobs, number } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { TickerCountType, TickerEndType } from '../../../../lib/variants';
import { BannerProps, BannerContent, BannerTracking } from '../../../../types/BannerTypes';

export default {
    component: UsEoyAppealBannerWithVisual,
    title: 'Components/UsEoyAppealBannerWithVisual',
    decorators: [withKnobs],
};

const tracking: BannerTracking = {
    ophanPageId: 'kbluzw2csbf83eabedel',
    componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'UsEoyAppealBannerWithVisual',
    abTestVariant: 'control',
    campaignCode: 'UsEoyAppealBannerWithVisual_control',
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

const tickerSettings = {
    countType: TickerCountType.money,
    endType: TickerEndType.hardstop,
    currencySymbol: '$',
    copy: {
        countLabel: 'contributed',
        goalReachedPrimary: "We've met our goal - thank you",
        goalReachedSecondary: 'Contributions are still being accepted',
    },
    tickerData: {
        total: 120_000,
        goal: 150_000,
    },
};

const props: BannerProps = {
    bannerChannel: 'contributions',
    tracking,
    isSupporter: false,
    countryCode: 'GB',
    content,
    tickerSettings,
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <UsEoyAppealBannerWithVisual {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'US EOY appeal banner with visual' };
