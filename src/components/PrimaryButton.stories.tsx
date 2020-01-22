import React, { ReactElement } from 'react';
import { PrimaryButton } from './PrimaryButton';
import { withKnobs, text } from '@storybook/addon-knobs';

export default {
    component: PrimaryButton,
    title: 'Components/PrimaryButton',
    decorators: [withKnobs],
};

export const defaultStory = (): ReactElement => {
    return (
        <div style={{ maxWidth: '1300px', margin: '0 auto' }}>
            <PrimaryButton
                url={text('url', 'https://support.theguardian.com/uk/contribute')}
                linkText={text('linkText', 'Support The Guardian')}
            />
        </div>
    );
};

defaultStory.story = { name: 'Default epic' };
