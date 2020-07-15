import React, { ReactElement } from 'react';
import { DigitalSubscriptionsBanner } from './DigitalSubscriptionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../../../../utils/StorybookWrapper';

export default {
    component: DigitalSubscriptionsBanner,
    title: 'Components/DigitalSubscriptionsBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <DigitalSubscriptionsBanner subscriptionUrl="/" signInUrl="/" />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Digital Subscriptions Banner' };
