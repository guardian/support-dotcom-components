import React from 'react';
import { css } from '@emotion/react';
import { body } from '@guardian/src-foundations/typography';
import { Hide } from '@guardian/src-layout';
import { from } from '@guardian/src-foundations/mq';

const container = css`
    ${body.small()}

    ${from.leftCol} {
        ${body.medium()}
    }
`;

interface EnvironmentMomentBannerBodyProps {
    messageText: JSX.Element | JSX.Element[];
    mobileMessageText: JSX.Element | JSX.Element[] | null;
}

export const EnvironmentMomentBannerBody: React.FC<EnvironmentMomentBannerBodyProps> = ({
    messageText,
    mobileMessageText,
}: EnvironmentMomentBannerBodyProps) => (
    <div css={container}>
        <Hide above="tablet">{mobileMessageText ?? messageText}</Hide>
        <Hide below="tablet">{messageText}</Hide>
    </div>
);
