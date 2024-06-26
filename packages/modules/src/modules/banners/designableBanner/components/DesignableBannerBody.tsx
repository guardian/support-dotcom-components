import React from 'react';
import { css } from '@emotion/react';
import { from, body } from '@guardian/source/foundations';
import { createBannerBodyCopy } from '../../common/BannerText';
import { HighlightedTextSettings } from '../settings';
import { BannerRenderedContent } from '../../common/types';
import useMediaQuery from '../../../../hooks/useMediaQuery';

interface DesignableBannerBodyProps {
    mainContent: BannerRenderedContent;
    mobileContent: BannerRenderedContent;
    highlightedTextSettings: HighlightedTextSettings;
}

export function DesignableBannerBody({
    mainContent,
    mobileContent,
    highlightedTextSettings,
}: DesignableBannerBodyProps): JSX.Element {
    const styles = getStyles(highlightedTextSettings);

    const isTabletOrAbove = useMediaQuery(from.tablet);

    return (
        <div css={styles.container}>
            {isTabletOrAbove
                ? createBannerBodyCopy(mainContent.paragraphs, mainContent.highlightedText, styles)
                : createBannerBodyCopy(
                      mobileContent.paragraphs,
                      mobileContent.highlightedText,
                      styles,
                  )}
        </div>
    );
}

const getStyles = (settings: HighlightedTextSettings) => ({
    container: css`
        p {
            margin: 0 0 0.5em 0;
        }
        ${body.small({ lineHeight: 'regular' })};
        ${from.desktop} {
            ${body.medium({ lineHeight: 'regular' })};
        }
    `,
    highlightedText: css`
        display: inline;
        color: ${settings.textColour};

        ${settings.highlightColour
            ? `
            background: ${settings.highlightColour};
            box-shadow: 2px 0 0 ${settings.highlightColour}, -2px 0 0 ${settings.highlightColour};
            box-decoration-break: clone;
        `
            : ''}

        ${body.small({ fontWeight: 'bold', lineHeight: 'regular' })};
        ${from.desktop} {
            ${body.medium({ fontWeight: 'bold', lineHeight: 'regular' })};
        }
    `,
});
