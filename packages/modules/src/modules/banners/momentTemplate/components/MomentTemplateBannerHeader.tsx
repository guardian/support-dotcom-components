import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';

// ---- Component ---- //

interface MomentTemplateBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
}

export function MomentTemplateBannerHeader({
    heading,
    mobileHeading,
}: MomentTemplateBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header}>
                <h2>
                    <Hide below="tablet">{mobileHeading ?? heading}</Hide>
                    <Hide above="tablet">{heading}</Hide>
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

            ${from.mobileLandscape} {
                font-size: 30px;
            }

            ${from.tablet} {
                font-size: 28px;
            }

            ${from.desktop} {
                font-size: 42px;
            }
        }
    `,
};
