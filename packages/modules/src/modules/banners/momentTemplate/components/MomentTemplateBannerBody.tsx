import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { body } from '@guardian/src-foundations/typography';

import { createBannerBodyCopy } from '../../common/BannerText';
import { HighlightedTextSettings } from '../settings';

// ---- Component ---- //

interface MomentTemplateBannerBodyProps {
    paragraphs: (JSX.Element | JSX.Element[])[];
    mobileParagraphs: (JSX.Element | JSX.Element[])[] | null;
    highlightedText: JSX.Element | JSX.Element[] | null;
    mobileHighlightedText: JSX.Element | JSX.Element[] | null;
    highlightedTextSettings: HighlightedTextSettings;
}

export function MomentTemplateBannerBody({
    paragraphs,
    mobileParagraphs,
    highlightedText,
    mobileHighlightedText,
    highlightedTextSettings,
}: MomentTemplateBannerBodyProps): JSX.Element {
    const styles = getStyles(highlightedTextSettings);

    return (
        <div css={styles.container}>
            <Hide above="tablet">
                {createBannerBodyCopy(
                    mobileParagraphs ?? paragraphs,
                    mobileHighlightedText ?? highlightedText,
                    styles,
                )}
            </Hide>

            <Hide below="tablet">{createBannerBodyCopy(paragraphs, highlightedText, styles)}</Hide>
        </div>
    );
}

// ---- Styles ---- //

const getStyles = (settings: HighlightedTextSettings) => ({
    container: css`
        ${body.small()}
        color: ${neutral[0]};
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
