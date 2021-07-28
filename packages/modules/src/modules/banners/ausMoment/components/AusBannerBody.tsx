import React from 'react';
import { css } from '@emotion/core';
import { body } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { BannerTextContent } from '../../common/types';

const containerStyles = css`
    ${body.medium()}
    color: ${neutral[100]};

    ${from.tablet} {
        margin-bottom: ${space[3]}px;
        font-size: 16px;
    }
`;
interface AusBannerBodyProps {
    content: BannerTextContent;
}

const AusBannerBody: React.FC<AusBannerBodyProps> = ({ content }: AusBannerBodyProps) => {
    return (
        <div css={containerStyles}>
            <Hide above="desktop">
                {content.mobileContent?.messageText ?? content.mainContent.messageText}
            </Hide>
            <Hide below="desktop">
                <div>{content.mainContent.messageText}</div>
            </Hide>
        </div>
    );
};

export default AusBannerBody;
