import React, { useState } from 'react';
import { BannerProps } from '@sdc/shared/types';
import { setChannelClosedTimestamp } from '../localStorage';
import { useEscapeShortcut } from '../../../hooks/useEscapeShortcut';

export interface CloseableBannerProps extends BannerProps {
	onClose: () => void;
}

const withCloseable = (
	CloseableBanner: React.FC<CloseableBannerProps>,
): React.FC<BannerProps> => {
	const Banner: React.FC<BannerProps> = (bannerProps: BannerProps) => {
		const [isOpen, setIsOpen] = useState(true);

		const onClose = (): void => {
			setChannelClosedTimestamp(bannerProps.bannerChannel);
			setIsOpen(false);
		};

		useEscapeShortcut(onClose, []);

		return isOpen ? (
			<CloseableBanner onClose={onClose} {...bannerProps} />
		) : null;
	};
	return Banner;
};

export default withCloseable;
