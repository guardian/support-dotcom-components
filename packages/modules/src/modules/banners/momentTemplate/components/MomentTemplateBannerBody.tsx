import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { body } from '@guardian/src-foundations/typography';
import { createBannerBodyCopy } from '../../common/BannerText';
import { BodyCopySettings, HighlightedTextSettings } from '../settings';
import { BannerRenderedContent } from '../../common/types';
import useMediaQuery from '../../../../hooks/useMediaQuery';

interface MomentTemplateBannerBodyProps {
    mainContent: BannerRenderedContent;
    mobileContent: BannerRenderedContent;
    bodyCopySettings: BodyCopySettings;
}

export function MomentTemplateBannerBody({
    mainContent,
    mobileContent,
    bodyCopySettings,
}: MomentTemplateBannerBodyProps): JSX.Element {
    const styles = getStyles(bodyCopySettings);

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

const getStyles = (settings: BodyCopySettings) => ({
    container: css`
        ${body.small()}
        color: ${settings.textColour ?? neutral[0]};
        font-size: 15px;
        line-height: 135%;

        ${from.desktop} {
            font-size: 17px;
        }

        ${from.wide} {
            line-height: 150%;
        }

        p {
            margin: 0 0 0.5em 0;
        }

        strong {
            font-weight: bold;
        }
    `,
    highlightedText: css`
        display: ${settings.highlightedTextSettings.newLine ? 'block' : 'inline'};
        color: ${settings.highlightedTextSettings.textColour};

        ${settings.highlightedTextSettings.highlightColour
            ? `
            background: ${settings.highlightedTextSettings.highlightColour};
            box-shadow: 2px 0 0 ${settings.highlightedTextSettings.highlightColour}, -2px 0 0 ${settings.highlightedTextSettings.highlightColour};
            box-decoration-break: clone;
        `
            : ''}

        padding: 0.15rem 0.15rem;
        ${body.small({ fontWeight: 'bold', lineHeight: 'loose' })};
        font-size: 15px;

        ${settings.highlightedTextSettings.newLine
            ? `
            width: max-content;
            padding: 0;
        `
            : ''}

        ${from.desktop} {
            font-size: 17px;
        }
    `,
});
