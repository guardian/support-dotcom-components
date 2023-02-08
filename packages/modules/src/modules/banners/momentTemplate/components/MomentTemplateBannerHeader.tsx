import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { Hide } from '@guardian/src-layout';
import { HeaderSettings } from '../settings';

// ---- Component ---- //

interface MomentTemplateBannerHeaderProps {
    heading: JSX.Element | JSX.Element[] | null;
    mobileHeading: JSX.Element | JSX.Element[] | null;
    headerSettings: HeaderSettings | undefined;
}

export function MomentTemplateBannerHeader({
    heading,
    mobileHeading,
    headerSettings,
}: MomentTemplateBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header(headerSettings)}>
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
    header: (headerSettings: HeaderSettings | undefined) => css`
        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            margin: 0;
            color: ${headerSettings?.textColour ?? neutral[0]};
            font-size: ${headerSettings?.textHeight ?? 24}px;
            line-height: 115%;

            ${from.desktop} {
                font-size: 28px;
            }

            ${from.leftCol} {
                font-size: 34px;
            }
        }
    `,
};
