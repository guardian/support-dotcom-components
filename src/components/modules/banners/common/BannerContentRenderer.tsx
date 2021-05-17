import React from 'react';
import { BannerTextContent, BannerRenderedContent } from './types';
import { Hide } from '@guardian/src-layout';

type BannerBreakpointContent = {
    renderContent: BannerRenderedContent;
    isMobile: boolean;
};

type BannerCtaProps = {
    content: BannerTextContent;
    render: (breakpointContent: BannerBreakpointContent) => JSX.Element;
};

export const BannerContentRenderer: React.FC<BannerCtaProps> = ({ content, render }) => {
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
