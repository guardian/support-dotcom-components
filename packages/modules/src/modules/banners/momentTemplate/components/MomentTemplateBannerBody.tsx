import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
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

    const bannerBodyMobile = createBannerBodyCopy(
        mobileContent.paragraphs,
        mobileContent.highlightedText,
        styles,
    );
    const bannerBodyTabletAndAbove = createBannerBodyCopy(
        mainContent.paragraphs,
        mainContent.highlightedText,
        styles,
    );

    return (
        <div css={styles.container}>
            {isTabletOrAbove ? bannerBodyTabletAndAbove : bannerBodyMobile}
        </div>
    );
}

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
