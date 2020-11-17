import React, { useState } from 'react';
import { BannerProps, BannerChannel } from '../../../../types/BannerTypes';
import { setChannelClosedTimestamp } from '../localStorage';

export interface CloseableBannerProps extends BannerProps {
    onClose: () => void;
}

const withCloseable = (
    CloseableBanner: React.FC<CloseableBannerProps>,
    bannerChannel: BannerChannel,
): React.FC<BannerProps> => {
    const Banner: React.FC<BannerProps> = (bannerProps: BannerProps) => {
        const [isOpen, setIsOpen] = useState(true);

        const onClose = (): void => {
            setChannelClosedTimestamp(bannerChannel);
            setIsOpen(false);
        };

        return isOpen ? <CloseableBanner onClose={onClose} {...bannerProps} /> : null;
    };
    return Banner;
};

export default withCloseable;
