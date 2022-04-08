import React from 'react';
import { css } from '@emotion/react';
import { neutral, brandAlt } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { body } from '@guardian/src-foundations/typography';

import { BannerTextStyles, createBannerBodyCopy } from '../../common/BannerText';

const styles: BannerTextStyles = {
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
        background-color: ${brandAlt[400]};
    `,
};

interface ElectionAuMomentBannerBodyProps {
    messageText: (JSX.Element | JSX.Element[])[];
    mobileMessageText: (JSX.Element | JSX.Element[])[] | null;
    highlightedText: JSX.Element | JSX.Element[] | null;
    mobileHighlightedText: JSX.Element | JSX.Element[] | null;
}

export function ElectionAuMomentBannerBody({
    messageText,
    mobileMessageText,
    highlightedText,
    mobileHighlightedText,
}: ElectionAuMomentBannerBodyProps): JSX.Element {
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
