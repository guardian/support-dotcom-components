import React, { useState } from 'react';
import { BannerProps } from '../../../../types/BannerTypes';

export interface CloseableBannerProps extends BannerProps {
    onClose: () => void;
}

const withCloseable = (CloseableBanner: React.FC<CloseableBannerProps>): React.FC<BannerProps> => {
    const Banner: React.FC<BannerProps> = (bannerProps: BannerProps) => {
        const [isOpen, setIsOpen] = useState(true);

        const onClose = (): void => setIsOpen(false);

        return isOpen ? <CloseableBanner onClose={onClose} {...bannerProps} /> : null;
    };
    return Banner;
};

export default withCloseable;
