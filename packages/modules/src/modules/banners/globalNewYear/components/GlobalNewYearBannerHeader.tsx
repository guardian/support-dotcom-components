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
        padding: ${space[2]}px 0 ${space[2]}px ${space[3]}px;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            margin: 0;
            color: ${neutral[0]};
            font-size: 24px;
            line-height: 115%;

            ${from.mobileLandscape} {
                font-size: 30px;
            }

            ${from.tablet} {
                font-size: 34px;
            }

            ${from.desktop} {
                font-size: 47px;
            }

            ${from.leftCol} {
                font-size: 55px;
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
