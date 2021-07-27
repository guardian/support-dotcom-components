import React, { ReactElement } from 'react';
import { GuardianWeeklyBanner } from './GuardianWeeklyBanner';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';
import { BannerContent, BannerProps } from '../../../../types/BannerTypes';
import { Tracking } from '../../../../types/shared';

export default {
    component: GuardianWeeklyBanner,
    title: 'Components/GuardianWeeklyBanner',
    decorators: [
        withKnobs({
            escapeHTML: false,
        }),
    ],
};

const tracking: Tracking = {
    ophanPageId: 'kbluzw2csbf83eabettt',
    platformId: 'GUARDIAN_WEB',
    clientName: 'dcr',
    referrerUrl: 'http://localhost:3030/Article',
    abTestName: 'GuardianWeeklyBanner',
    abTestVariant: 'control',
    campaignCode: '',
    componentType: 'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    products: ['PRINT_SUBSCRIPTION'],
};

export const defaultStory = (): ReactElement => {
    const content: BannerContent = {
        heading: text('heading', 'Read The Guardian in print'),
        messageText: text(
            'messageText',
            "Make sense of a chaotic world with The Guardian's weekly news magazine.",
        ),
    };

    const mobileContent: BannerContent = {
        heading: text('Mobile heading', 'In print every week'),
        messageText: text(
            'Mobile messageText',
            "Make sense of a chaotic world with The Guardian's weekly news magazine.",
        ),
    };

    const props: BannerProps = {
        bannerChannel: 'subscriptions',
        content,
        mobileContent,
        isSupporter: false,
        tracking,
    };
    return (
        <StorybookWrapper>
            <GuardianWeeklyBanner {...props} />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Guardian Weekly Banner' };
