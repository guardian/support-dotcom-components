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
            ${headline.xxsmall({ fontWeight: 'bold' })}
            max-width: 210px;
            margin: 0;

            ${from.mobileMedium} {
                ${headline.xsmall({ fontWeight: 'bold' })}
            }
            ${from.mobileLandscape} {
                max-width: 240px;
            }
            ${from.tablet} {
                padding: ${space[2]}px 0 0;
                ${headline.xsmall({ fontWeight: 'bold', lineHeight: 'tight' })}
                max-width: 540px;
            }

            ${from.desktop} {
                padding: ${space[3]}px 0 0;
                ${headline.small({ fontWeight: 'bold', lineHeight: 'tight' })}
                max-width: 680px;
            }

            ${from.wide} {
                padding: ${space[2]}px 0 0;
                ${headline.large({ fontWeight: 'bold', lineHeight: 'tight' })}
                max-width: 840px;
            }
        }

        ${from.mobileLandscape} {
            padding: ${space[2]}px ${space[5]}px;
        }

        ${from.tablet} {
            padding: ${space[2]}px 0 0;
        }
    `,
};

interface InvestigationsMomentBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
}

export function InvestigationsMomentBannerHeader({
    heading,
    mobileHeading,
}: InvestigationsMomentBannerHeaderProps): JSX.Element {
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
