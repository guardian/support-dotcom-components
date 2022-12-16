import React from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';

// ---- Component ---- //

interface AuMomentTemplateBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
}

export function AuMomentTemplateBannerHeader({
    heading,
    mobileHeading,
}: AuMomentTemplateBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header}>
                <h2>
                    <Hide above="tablet">{mobileHeading}</Hide>
                    <Hide below="tablet">{heading}</Hide>
                </h2>
            </header>
        </div>
    );
}

// ---- Styles ---- //

const styles = {
    container: css`
        position: relative;
    `,
    header: css`
        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            margin: 0;
            color: ${neutral[0]};
            font-size: 24px;
            line-height: 115%;

            ${from.tablet} {
                margin-top: ${space[2]}px;
            }

            ${from.desktop} {
                font-size: 28px;
            }

            ${from.leftCol} {
                font-size: 34px;
            }

            span {
                background: #ffe500;
            }
        }
    `,
};