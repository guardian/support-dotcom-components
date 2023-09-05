import React from 'react';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { DesignableBanner } from '../DesignableBanner';

export const DefaultBanner: React.FC<BannerProps> = DesignableBanner;

export const DefaultTemplate: Story<BannerProps> = (props: BannerProps) => (
    <DefaultBanner {...props} />
);
