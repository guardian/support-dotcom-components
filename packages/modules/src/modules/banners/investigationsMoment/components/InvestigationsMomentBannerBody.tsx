import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { body } from '@guardian/src-foundations/typography';

const styles = {
    container: css`
        ${body.small()}
        color: ${neutral[100]};

        p {
            margin: 0;
        }

        ${from.tablet} {
            color: ${neutral[0]};
        }

        ${from.desktop} {
            font-size: 17px;
        }
    `,
    highlightedTextContainer: css`
        font-weight: bold;
    `,
};

interface InvestigationsMomentBannerBodyProps {
    messageText: JSX.Element | JSX.Element[];
    mobileMessageText: JSX.Element | JSX.Element[] | null;
    highlightedText: JSX.Element[] | null;
    mobileHighlightedText: JSX.Element[] | null;
}

export function InvestigationsMomentBannerBody({
    messageText,
    mobileMessageText,
    highlightedText,
    mobileHighlightedText,
}: InvestigationsMomentBannerBodyProps): JSX.Element {
    return (
        <div css={styles.container}>
            <p>
                <span>
                    <Hide above="tablet">{mobileMessageText ?? messageText}</Hide>
                    <Hide below="tablet">{messageText}</Hide>
                </span>{' '}
                <span css={styles.highlightedTextContainer}>
                    <Hide above="tablet">{mobileHighlightedText ?? highlightedText}</Hide>

                    <Hide below="tablet">{highlightedText}</Hide>
                </span>
            </p>
        </div>
    );
}
