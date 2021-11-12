import React from 'react';
import { css } from '@emotion/react';
import { neutral } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { Hide } from '@guardian/src-layout';
import { body } from '@guardian/src-foundations/typography';

const styles = {
    container: css`
        ${body.small()}
        color: ${neutral[0]};

        p {
            margin: 0;
        }

        ${from.tablet} {
            color: ${neutral[0]};
            font-size: 17px;
        }
    `,
    highlightedTextContainer: css`
        font-weight: bold;
    `,
};

interface UsEoyMomentBannerBodyProps {
    messageText: JSX.Element | JSX.Element[];
    mobileMessageText: JSX.Element | JSX.Element[] | null;
    highlightedText: JSX.Element | JSX.Element[] | null;
    mobileHighlightedText: JSX.Element | JSX.Element[] | null;
}

export function UsEoyMomentBannerBody({
    messageText,
    mobileMessageText,
    highlightedText,
    mobileHighlightedText,
}: UsEoyMomentBannerBodyProps): JSX.Element {
    return (
        <div css={styles.container}>
            <p>
                <span>
                    <Hide above="desktop">{mobileMessageText ?? messageText}</Hide>
                    <Hide below="desktop">{messageText}</Hide>
                </span>{' '}
                <span css={styles.highlightedTextContainer}>
                    <Hide above="tablet">{mobileHighlightedText ?? highlightedText}</Hide>

                    <Hide below="tablet">{highlightedText}</Hide>
                </span>
            </p>
        </div>
    );
}
