import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerRenderedContent } from './types';
import { Hide } from '@guardian/src-layout';

type BannerContentStyleableAreas = 'container' | 'heading' | 'body' | 'copy' | 'highlightedText';

type BannerContentStyles = {
    [key in BannerContentStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

type BannerContentProps = {
    content: Partial<BannerRenderedContent>;
    mobileContent?: Partial<BannerRenderedContent>;
    styles: {
        mobile?: BannerContentStyles;
        desktop: BannerContentStyles;
    };
};

export const BannerContent: React.FC<BannerContentProps> = ({ styles, content, mobileContent }) => {
    const mobContent = mobileContent || content;
    const mobileStyles = styles.mobile || styles.desktop;
    const desktopStyles = styles.desktop;

    return (
        <>
            <Hide above="tablet">
                <div css={mobileStyles.container}>
                    <h2 css={mobileStyles.heading}>{mobContent.heading}</h2>
                    <div css={mobileStyles.body}>
                        <div css={mobileStyles.copy}>
                            {mobContent.messageText}
                            {mobContent.highlightedText && (
                                <>
                                    {' '}
                                    <span css={mobileStyles.highlightedText}>
                                        {mobContent.highlightedText}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Hide>
            <Hide below="tablet">
                <div css={desktopStyles.container}>
                    <h2 css={desktopStyles.heading}>{content.heading}</h2>
                    <div css={desktopStyles.body}>
                        <div css={desktopStyles.copy}>
                            {content.messageText}
                            {content.highlightedText && (
                                <>
                                    {' '}
                                    <span css={desktopStyles.highlightedText}>
                                        {content.highlightedText}
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
