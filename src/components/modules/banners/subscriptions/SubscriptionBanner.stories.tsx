import React, { ReactElement } from 'react';
import { SubscriptionsBanner } from './SubscriptionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: SubscriptionsBanner,
    title: 'Components/SubscriptionsBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <SubscriptionsBanner subscriptionUrl="/" signInUrl="/" />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Subscriptions Banner' };
