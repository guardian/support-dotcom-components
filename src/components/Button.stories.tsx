import React, { ReactElement } from 'react';
import { Button } from './Button';
import { withKnobs, text, boolean } from '@storybook/addon-knobs';
import { StorybookWrapper } from '../utils/StorybookWrapper';

export default {
    component: Button,
    title: 'Components/Button',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    const buttonText = text('buttonText', 'Click Me');
    const showArrow = boolean('showArrow', false);
    return (
        <StorybookWrapper>
            <Button onClickAction={(): void => console.log('Button clicked')} showArrow={showArrow}>
                {buttonText}
            </Button>
        </StorybookWrapper>
    );
};

defaultStory.story = { name: 'Default Button' };

export const primaryButtonStory = (): ReactElement => {
    const buttonText = text('buttonText', 'Support The Guardian');
    const clickAction = text('href', 'https://wwww.theguardian.com/');
    const showArrow = boolean('showArrow', true);
    return (
        <StorybookWrapper>
            <Button onClickAction={clickAction} showArrow={showArrow}>
                {buttonText}
            </Button>
        </StorybookWrapper>
    );
};

primaryButtonStory.story = { name: 'Primary LinkButton with icon' };

export const secondaryButtonStory = (): ReactElement => {
    const buttonText = text('buttonText', 'Read our pledge');
    const clickAction = text('clickAction', 'https://wwww.theguardian.com/');
    const showArrow = boolean('showArrow', true);
    return (
        <StorybookWrapper>
            <Button onClickAction={clickAction} showArrow={showArrow} priority="secondary">
                {buttonText}
            </Button>
        </StorybookWrapper>
    );
};

secondaryButtonStory.story = { name: 'Secondary LinkButton with icon' };

export const tertiaryButtonStory = (): ReactElement => {
    const buttonText = text('buttonText', 'Remind me in May');
    return (
        <StorybookWrapper>
            <Button onClickAction={(): void => undefined} isTertiary>
                {buttonText}
            </Button>
        </StorybookWrapper>
    );
};

tertiaryButtonStory.story = { name: 'Tertiary Button' };
