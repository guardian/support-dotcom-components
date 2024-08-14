import React from 'react';
import { BannerProps } from '@sdc/shared/src/types';
import { StoryFn } from '@storybook/react';
import { DesignableBanner } from '../DesignableBanner';
import type { ReactComponent } from '../../../../types';

export const DefaultBanner: ReactComponent<BannerProps> = DesignableBanner;

export const DefaultTemplate: StoryFn<BannerProps> = (props: BannerProps) => (
    <DefaultBanner {...props} />
);
