import React from 'react';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { DesignableBanner } from '../DesignableBanner';
import type { ReactComponent } from '../../../../types';

export const DefaultBanner: ReactComponent<BannerProps> = DesignableBanner;

export const DefaultTemplate: Story<BannerProps> = (props: BannerProps) => (
    <DefaultBanner {...props} />
);
