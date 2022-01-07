import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';

const styles = {
    container: css`
        position: relative;
    `,
    header: css`
        padding: ${space[2]}px ${space[3]}px;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            max-width: 55%;
            margin: 0;
            color: ${neutral[0]};
            font-size: 24px;
            line-height: 115%;

            ${from.tablet} {
                max-width: 55%;
                font-size: 36px;
            }

            ${from.desktop} {
                max-width: 65%;
                font-size: 43px;
            }

            ${from.leftCol} {
                max-width: 75%;
                font-size: 50px;
            }

            ${from.wide} {
                max-width: 85%;
            }
        }

        ${from.mobileLandscape} {
            padding: ${space[2]}px ${space[5]}px;
        }

        ${from.tablet} {
            padding: ${space[2]}px 0;
        }
    `,
};

interface GlobalNewYearBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
}

export function GlobalNewYearBannerHeader({
    heading,
    mobileHeading,
}: GlobalNewYearBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header}>
                <h2>{mobileHeading ?? heading}</h2>
            </header>
        </div>
    );
}
