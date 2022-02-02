import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerTextContent } from './types';
import { BannerContentRenderer } from './BannerContentRenderer';

type BannerTextStyleableAreas =
    | 'container'
    | 'heading'
    | 'subheading'
    | 'body'
    | 'copy'
    | 'highlightedText';

type BannerTextStyles = {
    [key in BannerTextStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

type BannerTextProps = {
    content: BannerTextContent;
    styles: {
        mobile?: BannerTextStyles;
        desktop: BannerTextStyles;
    };
    children?: React.ReactNode;
};

export const BannerText: React.FC<BannerTextProps> = ({ styles, content, children }) => {
    const mobileStyles = styles.mobile || styles.desktop;
    const desktopStyles = styles.desktop;

    return (
        <BannerContentRenderer
            content={content}
            render={({ renderContent, isMobile }) => {
                const renderStyles = isMobile ? mobileStyles : desktopStyles;
                const { heading, subheading, messageText, highlightedText } = renderContent;

                return (
                    <div css={renderStyles.container}>
                        <h2 css={renderStyles.heading}>{heading}</h2>
                        {subheading && <h3 css={renderStyles.subheading}>{subheading}</h3>}

                        <div css={renderStyles.body}>
                            <div css={renderStyles.copy}>
                                {messageText}
                                {highlightedText && (
                                    <>
                                        {' '}
                                        <span css={renderStyles.highlightedText}>
                                            {highlightedText}
                                        </span>
                                    </>
                                )}
                                {children}
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
};
