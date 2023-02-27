import React from 'react';
import { css } from '@emotion/react';
import { brandAlt, neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { body } from '@guardian/src-foundations/typography';

import { BannerTextStyles, createBannerBodyCopy } from '../../common/BannerText';

const styles: BannerTextStyles = {
    container: css`
        ${body.small()}
        color: ${neutral[100]};

        p {
            margin: 0 0 0.5em 0;
        }

        ${from.tablet} {
            color: ${neutral[0]};
        }

        ${from.desktop} {
            font-size: 17px;
        }
    `,
    highlightedText: css`
        font-weight: bold;
        color: ${neutral[0]};
        background-color: ${brandAlt[400]};
    `,
};

interface InvestigationsMomentBannerBodyProps {
    messageText: (JSX.Element | JSX.Element[])[];
    mobileMessageText: (JSX.Element | JSX.Element[])[] | null;
    highlightedText: JSX.Element | JSX.Element[] | null;
    mobileHighlightedText: JSX.Element | JSX.Element[] | null;
}

export function InvestigationsMomentBannerBody({
    messageText,
    mobileMessageText,
    highlightedText,
    mobileHighlightedText,
}: InvestigationsMomentBannerBodyProps): JSX.Element {
    return (
        <div css={styles.container}>
            <Hide above="tablet">
                {createBannerBodyCopy(
                    mobileMessageText ?? messageText,
                    mobileHighlightedText ?? highlightedText,
                    styles,
                )}
            </Hide>

            <Hide below="tablet">{createBannerBodyCopy(messageText, highlightedText, styles)}</Hide>
        </div>
    );
}
