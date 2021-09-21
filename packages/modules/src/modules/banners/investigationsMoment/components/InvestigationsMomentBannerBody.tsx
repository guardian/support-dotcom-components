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
};

interface InvestigationsMomentBannerBodyProps {
    messageText: JSX.Element | JSX.Element[];
    mobileMessageText: JSX.Element | JSX.Element[] | null;
}

export function InvestigationsMomentBannerBody({
    messageText,
    mobileMessageText,
}: InvestigationsMomentBannerBodyProps): JSX.Element {
    return (
        <div css={styles.container}>
            <Hide above="tablet">
                <p>{mobileMessageText ?? messageText}</p>
            </Hide>

            <Hide below="tablet">
                <p>{messageText}</p>
            </Hide>
        </div>
    );
}
