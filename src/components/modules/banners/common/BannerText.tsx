import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerTextContent } from './types';
import { BannerContentRenderer } from './BannerContentRenderer';

type BannerTextStyleableAreas = 'container' | 'heading' | 'body' | 'copy' | 'highlightedText';

type BannerTextStyles = {
    [key in BannerTextStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

type BannerTextProps = {
    content: BannerTextContent;
    styles: {
        mobile?: BannerTextStyles;
        desktop: BannerTextStyles;
    };
};

export const BannerText: React.FC<BannerTextProps> = ({ styles, content }) => {
    const mobileStyles = styles.mobile || styles.desktop;
    const desktopStyles = styles.desktop;

    return (
        <BannerContentRenderer
            content={content}
            render={({ renderContent, isMobile }) => {
                const renderStyles = isMobile ? mobileStyles : desktopStyles;
                return (
                    <div css={renderStyles.container}>
                        <h2 css={renderStyles.heading}>{renderContent.heading}</h2>
                        <div css={renderStyles.body}>
                            <div css={renderStyles.copy}>
                                {renderContent.messageText}
                                {renderContent.highlightedText && (
                                    <>
                                        {' '}
                                        <span css={renderStyles.highlightedText}>
                                            {renderContent.highlightedText}
                                        </span>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
};
