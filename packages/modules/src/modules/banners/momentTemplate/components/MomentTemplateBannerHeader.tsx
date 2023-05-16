import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { HeaderSettings } from '../settings';
import useMediaQuery from '../../../../hooks/useMediaQuery';

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
    const isTabletOrAbove = useMediaQuery(from.tablet);

    return (
        <div css={styles.container}>
            <header css={styles.header(headerSettings)}>
                <h2>{isTabletOrAbove ? heading : mobileHeading}</h2>
            </header>
        </div>
    );
}

const styles = {
    container: css`
        position: relative;
    `,
    header: (headerSettings: HeaderSettings | undefined) => css`
        h2 {
            ${headline.xsmall({ fontWeight: 'bold' })}
            margin: 0;
            color: ${headerSettings?.textColour ?? neutral[0]};
            font-size: 24px;
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
