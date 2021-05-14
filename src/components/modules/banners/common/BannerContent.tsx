import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerRenderedContent } from './types';
import { Hide } from '@guardian/src-layout';

type BannerBodyAndHeadingStyleableAreas =
    | 'container'
    | 'heading'
    | 'body'
    | 'copy'
    | 'highlightedText';

type BannerBodyAndHeadingStyles = {
    [key in BannerBodyAndHeadingStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

type BannerBodyAndHeadingProps = {
    content: Partial<BannerRenderedContent>;
    mobileContent?: Partial<BannerRenderedContent>;
    styles: BannerBodyAndHeadingStyles;
};

export const BannerContent: React.FC<BannerBodyAndHeadingProps> = ({
    styles,
    content,
    mobileContent,
}) => {
    const mobContent = mobileContent || content;
    return (
        <>
            <Hide above="tablet">
                <div css={styles.container}>
                    <h3 css={styles.heading}>{mobContent.heading}</h3>
                    <div css={styles.body}>
                        <div css={styles.copy}>
                            {mobContent.messageText}
                            {mobContent.highlightedText && (
                                <>
                                    {' '}
                                    <span css={styles.highlightedText}>
                                        {mobContent.highlightedText}
                                    </span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </Hide>
            <Hide below="tablet">
                <div css={styles.container}>
                    <h3 css={styles.heading}>{content.heading}</h3>
                    <div css={styles.body}>
                        <div css={styles.copy}>
                            {content.messageText}
                            {content.highlightedText && (
                                <>
                                    {' '}
                                    <span css={styles.highlightedText}>
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
