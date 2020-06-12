import React, { ReactElement, useState } from 'react';
import { SubscriptionsBanner } from './modules/subscriptionsBanner/SubscriptionsBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: SubscriptionsBanner,
    title: 'Components/SubscriptionsBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    const [showBanner, toggleBanner] = useState(true);
    return (
        <StorybookWrapper>
            <>
                {showBanner && (
                    <SubscriptionsBanner
                        subscriptionUrl="/"
                        signInUrl="/"
                        closeBanner={(): void => toggleBanner(false)}
                    />
                )}
            </>
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Subscriptions Banner' };
