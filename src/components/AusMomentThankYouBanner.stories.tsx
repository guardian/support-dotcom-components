import React, { ReactElement } from 'react';
import { AusMomentThankYouBanner } from './modules/ausMomentThankYouBanner/AusMomentThankYouBanner';
import { withKnobs } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: AusMomentThankYouBanner,
    title: 'Components/AusMomentThankYouBanner',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <AusMomentThankYouBanner />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Aus Moment - Thank You banner' };
