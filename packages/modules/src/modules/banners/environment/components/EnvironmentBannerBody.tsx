import React from 'react';
import { css } from '@emotion/react';
import { body } from '@guardian/source-foundations';
import { Hide } from '@guardian/src-layout';
import { from } from '@guardian/source-foundations';

import { BannerTextStyles, createBannerBodyCopy } from '../../common/BannerText';
import type { ReactComponent } from '../../../../types';

const styles: BannerTextStyles = {
    container: css`
        ${body.small()}

        ${from.leftCol} {
            ${body.medium()}
        }
        p {
            margin: 0 0 0.5em 0;
        }
    `,
    highlightedText: css`
        font-weight: bold;
    `,
};

interface EnvironmentBannerBodyProps {
    messageText: (JSX.Element | JSX.Element[])[];
    mobileMessageText: (JSX.Element | JSX.Element[])[] | null;
}

export const EnvironmentBannerBody: ReactComponent<EnvironmentBannerBodyProps> = ({
    messageText,
    mobileMessageText,
}: EnvironmentBannerBodyProps) => (
    <div css={styles.container}>
        <Hide above="tablet">
            {createBannerBodyCopy(mobileMessageText ?? messageText, null, styles)}
        </Hide>

        <Hide below="tablet">{createBannerBodyCopy(messageText, null, styles)}</Hide>
    </div>
);
