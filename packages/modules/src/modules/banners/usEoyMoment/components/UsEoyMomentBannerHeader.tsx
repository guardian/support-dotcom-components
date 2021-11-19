import React from 'react';
import { css } from '@emotion/react';
import { news, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';

const styles = {
    container: css`
        position: relative;
    `,
    header: css`
        padding: ${space[2]}px ${space[3]}px;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            max-width: 150px;
            margin: 0;
            color: ${news[400]};
            width: max-content;

            ${from.mobileLandscape} {
                max-width: 210px;
            }

            ${from.phablet} {
                max-width: 300px;
                font-size: 34px;
            }

            ${from.tablet} {
                max-width: 400px;
                font-size: 34px;
            }

            ${from.desktop} {
                max-width: none;
            }

            ${from.leftCol} {
                max-width: none;
                font-size: 38px;
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

interface UsEoyMomentBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
}

export function UsEoyMomentBannerHeader({
    heading,
    mobileHeading,
}: UsEoyMomentBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header}>
                <h2>{mobileHeading ?? heading}</h2>
            </header>
        </div>
    );
}
