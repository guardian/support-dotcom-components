import React from 'react';
import { BannerProps } from '@sdc/shared/src/types';
import { Story } from '@storybook/react';
import { bannerWrapper } from '../../common/BannerWrapper';
import { DesignableBanner } from '../DesignableBanner';
import { BannerRenderProps } from '../../common/types';

export const DefaultBanner: React.FC<BannerProps> = bannerWrapper((props: BannerRenderProps) => {
    return <DesignableBanner {...props} />;
}, 'designable-banner');

export const DefaultTemplate: Story<BannerProps> = (props: BannerProps) => (
    <DefaultBanner {...props} />
);
