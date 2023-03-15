import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { body } from '@guardian/src-foundations/typography';

import { createBannerBodyCopy } from '../../common/BannerText';
import { BodyCopySettings, HighlightedTextSettings } from '../settings';
import { BannerRenderedContent } from '../../common/types';

// ---- Component ---- //

interface MomentTemplateBannerBodyProps {
    mainContent: BannerRenderedContent;
    mobileContent: BannerRenderedContent;
    highlightedTextSettings: HighlightedTextSettings;
    bodyCopySettings?: BodyCopySettings;
}

export function MomentTemplateBannerBody({
    mainContent,
    mobileContent,
    highlightedTextSettings,
    bodyCopySettings,
}: MomentTemplateBannerBodyProps): JSX.Element {
    const styles = getStyles(highlightedTextSettings, bodyCopySettings);

    return (
        <div css={styles.container}>
            <Hide above="tablet">
                {createBannerBodyCopy(
                    mobileContent.paragraphs,
                    mobileContent.highlightedText,
                    styles,
                )}
            </Hide>

            <Hide below="tablet">
                {createBannerBodyCopy(mainContent.paragraphs, mainContent.highlightedText, styles)}
            </Hide>
        </div>
    );
}

// ---- Styles ---- //

const getStyles = (
    highlightedTextSettings: HighlightedTextSettings,
    bodyCopySettings?: BodyCopySettings,
) => ({
    container: css`
        ${body.small()}
        color: ${bodyCopySettings?.textColour ? bodyCopySettings.textColour : neutral[0]};
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
        display: ${highlightedTextSettings.newLine ? 'block' : 'inline'};
        color: ${highlightedTextSettings.textColour};

        ${highlightedTextSettings.highlightColour
            ? `
            background: ${highlightedTextSettings.highlightColour};
            box-shadow: 2px 0 0 ${highlightedTextSettings.highlightColour}, -2px 0 0 ${highlightedTextSettings.highlightColour};
            box-decoration-break: clone;
        `
            : ''}

        padding: 0.15rem 0.15rem;
        ${body.small({ fontWeight: 'bold', lineHeight: 'loose' })};
        font-size: 15px;

        ${highlightedTextSettings.newLine
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
