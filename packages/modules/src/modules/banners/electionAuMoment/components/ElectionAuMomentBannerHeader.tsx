import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';

const styles = {
    header: css`
        padding: ${space[2]}px 0 0;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            margin: 0;
            color: ${neutral[0]};
            font-size: 24px;
            line-height: 115%;

            ${from.tablet} {
                ${headline.small()}
                font-weight: normal;
            }

            ${from.desktop} {
                ${headline.large()}
            }
        }

        ${from.tablet} {
            width: 50%;
        }

        ${from.desktop} {
            width: 45%;
        }
    `,
};

interface ElectionAuMomentBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
}

export function ElectionAuMomentBannerHeader({
    heading,
    mobileHeading,
}: ElectionAuMomentBannerHeaderProps): JSX.Element {
    return (
        <header css={styles.header}>
            <h2>{mobileHeading ?? heading}</h2>
        </header>
    );
}
