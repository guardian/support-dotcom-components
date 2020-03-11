import React, { ReactElement } from 'react';
import { Button } from './Button';
import { withKnobs, text } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: Button,
    title: 'Components/Button',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <StorybookWrapper>
            <Button
                url={text('url', 'https://support.theguardian.com/uk/contribute')}
                linkText={text('linkText', 'Support The Guardian')}
            />
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Primary button' };

export const secondaryButton = (): ReactElement => {
    return (
        <StorybookWrapper>
            <Button
                url={text('url', 'https://www.theguardian.com/environment')}
                linkText={text('linkText', 'Read our pledge')}
                priority="secondary"
            />
        </StorybookWrapper>
    );
};

secondaryButton.story = { name: 'Secondary button' };
