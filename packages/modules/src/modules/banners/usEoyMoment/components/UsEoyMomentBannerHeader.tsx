import React from 'react';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { Hide } from '@guardian/src-layout';

const styles = {
    container: css`
        position: relative;
    `,
    header: css`
        background: ${neutral[100]};
        padding: ${space[2]}px ${space[3]}px;
        margin: 0;

        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            max-width: 160px;
            margin: 0;

            ${from.tablet} {
                max-width: none;
                font-size: 32px;
            }

            ${from.desktop} {
                ${headline.large({ fontWeight: 'bold' })}
            }

            ${from.leftCol} {
                ${headline.xlarge({ fontWeight: 'bold' })}
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
                <h2>
                    <Hide above="tablet">{mobileHeading ?? heading}</Hide>
                    <Hide below="tablet">{heading}</Hide>
                </h2>
            </header>
        </div>
    );
}
