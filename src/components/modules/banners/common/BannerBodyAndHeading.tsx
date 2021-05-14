import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerRenderedContent } from './types';

type BannerBodyAndHeadingStyleableAreas =
    | 'bodyAndHeading'
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

export const BannerBodyAndHeading: React.FC<BannerBodyAndHeadingProps> = ({ styles, content }) => (
    <div css={styles.bodyAndHeading}>
        <h3 css={styles.heading}>{content.heading}</h3>
        <div css={styles.body}>
            <div css={styles.copy}>
                {content.messageText}
                {content.highlightedText && (
                    <>
                        {' '}
                        <span css={styles.highlightedText}>{content.highlightedText}</span>
                    </>
                )}
            </div>
        </div>
    </div>
);
