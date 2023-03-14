import React from 'react';
import { SerializedStyles } from '@emotion/utils';
import { BannerTextContent } from './types';
import { BannerContentRenderer } from './BannerContentRenderer';
import { css } from '@emotion/react';

type BannerTextStyleableAreas =
    | 'container'
    | 'heading'
    | 'subheading'
    | 'body'
    | 'copy'
    | 'highlightedText';

export type BannerTextStyles = {
    [key in BannerTextStyleableAreas]?: SerializedStyles | SerializedStyles[];
};

type BannerTextProps = {
    content: BannerTextContent;
    styles: {
        mobile?: BannerTextStyles;
        desktop: BannerTextStyles;
    };
    children?: React.ReactNode;
    articleCount?: JSX.Element;
};

const styles = {
    paragraphs: css`
        > :first-child {
            margin-top: 0;
        }
        > :last-child {
            margin-bottom: 0;
        }
    `,
};

export const createBannerBodyCopy = (
    paragraphs: (Array<JSX.Element> | JSX.Element)[],
    highlightedText: Array<JSX.Element> | JSX.Element | null | undefined,
    renderStyles: BannerTextStyles,
): JSX.Element[] | JSX.Element => {
    const paragraphsToProcess = Array.isArray(paragraphs) ? paragraphs : [paragraphs];
    const numberOfNonFinalParagraphs = paragraphsToProcess.length - 1;

    // To cover situations where there are no paragraphs to process
    if (numberOfNonFinalParagraphs < 0) {
        return (
            <div css={styles.paragraphs}>
                {highlightedText && (
                    <p>
                        <span css={renderStyles.highlightedText}>{highlightedText}</span>
                    </p>
                )}
            </div>
        );
    }

    return (
        <div css={styles.paragraphs}>
            {paragraphsToProcess.map((p, index) => {
                if (index < numberOfNonFinalParagraphs) {
                    return <p key={index}>{p}</p>;
                }
                return (
                    <p key={index}>
                        {p}{' '}
                        {highlightedText && (
                            <span css={renderStyles.highlightedText}>{highlightedText}</span>
                        )}
                    </p>
                );
            })}
        </div>
    );
};

export const BannerText: React.FC<BannerTextProps> = ({
    styles,
    content,
    children,
    articleCount,
}) => {
    const mobileStyles = styles.mobile || styles.desktop;
    const desktopStyles = styles.desktop;

    return (
        <BannerContentRenderer
            content={content}
            render={({ renderContent, isMobile }) => {
                const renderStyles = isMobile ? mobileStyles : desktopStyles;
                const { heading, subheading, paragraphs, highlightedText } = renderContent;

                return (
                    <div css={renderStyles.container}>
                        <h2 css={renderStyles.heading}>{heading}</h2>
                        {subheading && renderStyles.subheading && (
                            <h3 css={renderStyles.subheading}>{subheading}</h3>
                        )}

                        {articleCount}

                        <div css={renderStyles.body}>
                            <div css={renderStyles.copy}>
                                {createBannerBodyCopy(paragraphs, highlightedText, renderStyles)}
                                {children}
                            </div>
                        </div>
                    </div>
                );
            }}
        />
    );
};
