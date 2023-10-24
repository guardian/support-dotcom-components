import React from 'react';
import { css } from '@emotion/react';
import { from, until } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import { createBannerBodyCopy } from '../../common/BannerText';
import { HighlightedTextSettings } from '../settings';
import { BannerRenderedContent } from '../../common/types';
import useMediaQuery from '../../../../hooks/useMediaQuery';

interface MomentTemplateBannerBodyProps {
    mainContent: BannerRenderedContent;
    mobileContent: BannerRenderedContent;
    highlightedTextSettings: HighlightedTextSettings;
}

export function MomentTemplateBannerBody({
    mainContent,
    mobileContent,
    highlightedTextSettings,
}: MomentTemplateBannerBodyProps): JSX.Element {
    const styles = getStyles(highlightedTextSettings);

    const isTabletOrAbove = useMediaQuery(from.tablet);

    return (
        <div css={[styles.commonFontSizing, styles.container]}>
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
    commonFontSizing: css`
        ${body.small({ lineHeight: 'loose' })};
        ${until.tablet} {
            strong {
                font-weight: 800;
            }
        }
        ${from.tablet} {
            ${body.medium({ lineHeight: 'loose' })};
            strong {
                ${body.medium({ fontWeight: 'bold', lineHeight: 'loose' })};
            }
        }
    `,
    container: css`
        line-height: 135%;
        ${from.wide} {
            line-height: 150%;
        }
        p {
            margin: 0 0 0.5em 0;
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

        padding: 0.15rem 0.15rem;
        ${body.small({ fontWeight: 'bold', lineHeight: 'loose' })};
        font-size: 15px;

        ${from.desktop} {
            font-size: 17px;
        }
    `,
});
