import React, { ReactElement } from 'react';
import { PrimaryButton } from './PrimaryButton';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: PrimaryButton,
    title: 'Components/PrimaryButton',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <PrimaryButton
                url={text('url', 'https://support.theguardian.com/uk/contribute')}
                linkText={text('linkText', 'Support The Guardian')}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Primary button with Contribution CTA' };
