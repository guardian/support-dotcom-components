import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerTextContent } from './types';
import { Hide } from '@guardian/src-layout';

type BannerContentStyleableAreas = 'container' | 'heading' | 'body' | 'copy' | 'highlightedText';

type BannerContentStyles = {
    [key in BannerContentStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

type BannerContentProps = {
    content: BannerTextContent;
    styles: {
        mobile?: BannerContentStyles;
        desktop: BannerContentStyles;
    };
};

export const BannerContent: React.FC<BannerContentProps> = ({ styles, content }) => {
    const { mainContent } = content;
    const mobileContent = content.mobileContent || mainContent;
    const mobileStyles = styles.mobile || styles.desktop;
    const desktopStyles = styles.desktop;

    return (
        <>
            <Hide above="tablet">
                <div css={mobileStyles.container}>
                    <h2 css={mobileStyles.heading}>{mobileContent.heading}</h2>
                    <div css={mobileStyles.body}>
                        <div css={mobileStyles.copy}>
                            {mobileContent.messageText}
                            {mobileContent.highlightedText && (
                                <>
                                    {' '}
                                    <span css={mobileStyles.highlightedText}>
                                        {mobileContent.highlightedText}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Hide>
            <Hide below="tablet">
                <div css={desktopStyles.container}>
                    <h2 css={desktopStyles.heading}>{mainContent.heading}</h2>
                    <div css={desktopStyles.body}>
                        <div css={desktopStyles.copy}>
                            {mainContent.messageText}
                            {mainContent.highlightedText && (
                                <>
                                    {' '}
                                    <span css={desktopStyles.highlightedText}>
                                        {mainContent.highlightedText}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Hide>
        </>
    );
};
