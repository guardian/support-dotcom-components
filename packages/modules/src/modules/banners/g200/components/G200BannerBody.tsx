import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { BannerTextContent } from '../../common/types';

import { BannerTextStyles, createBannerBodyCopy } from '../../common/BannerText';

const containerStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
    color: ${neutral[100]};
`;

const desktopContainerStyles = css`
    > * + * {
        margin-top: ${space[2]}px;
    }
`;

const styles: BannerTextStyles = {
    highlightedText: css`
        color: ${neutral[0]};
        background: ${neutral[100]};
        display: inline;
        padding: 2px;
        word-wrap: break-word;
    `,
};

interface G200BannerBodyProps {
    content: BannerTextContent;
}

const G200BannerBody: React.FC<G200BannerBodyProps> = ({ content }: G200BannerBodyProps) => {
    const { mainContent, mobileContent } = content;
    const messageText = mainContent.paragraphs;
    const highlightedText = mainContent.highlightedText || null;
    const mobileMessageText = mobileContent != null ? mobileContent.paragraphs : null;
    const mobileHighlightedText = mobileContent != null ? mobileContent.highlightedText : null;

    return (
        <div css={containerStyles}>

            <Hide above="tablet">
                {createBannerBodyCopy(mobileMessageText ?? messageText, mobileHighlightedText ?? highlightedText, styles)}
            </Hide>

            <Hide below="tablet">
                {createBannerBodyCopy(messageText, highlightedText, styles)}
            </Hide>
        </div>
    );
};

export default G200BannerBody;
