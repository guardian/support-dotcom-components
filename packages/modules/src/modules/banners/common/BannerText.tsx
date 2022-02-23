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
};

export const createBannerBodyCopy = (
    paras: (Array<JSX.Element> | JSX.Element)[],
    highlights: Array<JSX.Element> | JSX.Element | null | undefined,
    renderStyles: BannerTextStyles,
): JSX.Element[] | JSX.Element => {
    const parasToProcess = Array.isArray(paras) ? paras : [paras];
    const len = parasToProcess.length - 1;

    if (len < 0) {
        return (
            <p>
                <span css={renderStyles.highlightedText}>{highlights}</span>
            </p>
        );
    }

    return parasToProcess.map((p, index) => {
        if (index < len) {
            return <p key={index}>{p}</p>;
        }
        return (
            <p key={index}>
                {p} <span css={renderStyles.highlightedText}>{highlights}</span>
            </p>
        );
    });
};

export const BannerText: React.FC<BannerTextProps> = ({ styles, content, children }) => {
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
