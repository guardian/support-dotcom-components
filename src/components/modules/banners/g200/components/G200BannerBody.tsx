import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { ContributionsBannerRenderedContent } from '../../contributions/ContributionsBannerWrapper';

const containerStyles = css`
    ${body.medium({ fontWeight: 'bold' })}
    color: ${neutral[100]};
`;

const desktopContainerStyles = css`
    > * + * {
        margin-top: ${space[2]}px;
    }
`;

const highlightedTextContainerStyles = css`
    color: ${neutral[0]};
    background: ${neutral[100]};
    display: inline;
    padding: 2px;
    word-wrap: break-word;
`;

interface G200BannerBodyProps {
    mobileContent: ContributionsBannerRenderedContent | undefined;
    content: ContributionsBannerRenderedContent;
}

const G200BannerBody: React.FC<G200BannerBodyProps> = ({
    mobileContent,
    content,
}: G200BannerBodyProps) => {
    return (
        <div css={containerStyles}>
            <Hide above="tablet">{mobileContent?.messageText ?? content.messageText}</Hide>
            <Hide below="tablet">
                <div css={desktopContainerStyles}>
                    <div>{content.messageText}</div>

                    {content.highlightedText && (
                        <div>
                            <div css={highlightedTextContainerStyles}>
                                {content.highlightedText}
                            </div>
                        </div>
                    )}
                </div>
            </Hide>
        </div>
    );
};

export default G200BannerBody;
