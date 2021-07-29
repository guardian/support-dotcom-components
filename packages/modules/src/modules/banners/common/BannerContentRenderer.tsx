import React from 'react';
import { BannerTextContent, BannerRenderedContent } from './types';
import { Hide } from '@guardian/src-layout';

type BannerContentForRender = {
	renderContent: BannerRenderedContent;
	isMobile: boolean;
};

type BannerContentRendererProps = {
	content: BannerTextContent;
	render: (breakpointContent: BannerContentForRender) => JSX.Element;
};

export const BannerContentRenderer: React.FC<BannerContentRendererProps> = ({
	content,
	render,
}) => {
	const { mainContent } = content;
	const mobileContent = content.mobileContent || mainContent;

	return (
		<>
			<Hide above="tablet">
				{render({
					renderContent: mobileContent,
					isMobile: true,
				})}
			</Hide>
			<Hide below="tablet">
				{render({
					renderContent: mainContent,
					isMobile: false,
				})}
			</Hide>
		</>
	);
};
