import React from 'react';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { headline } from '@guardian/src-foundations/typography';
import { neutral } from '@guardian/src-foundations/palette';
import { HeaderSettings } from '../settings';

interface MomentTemplateBannerHeaderProps {
    mainOrMobileContent: JSX.Element | JSX.Element[] | null;
    headerSettings: HeaderSettings | undefined;
}

export function MomentTemplateBannerHeader({
    mainOrMobileContent,
    headerSettings,
}: MomentTemplateBannerHeaderProps): JSX.Element {
    return (
        <div css={styles.container}>
            <header css={styles.header(headerSettings)}>
                <h2>
                    {headerSettings?.showHeader.text ? mainOrMobileContent : null}
                    {headerSettings?.showHeader.image ? headerSettings?.image : null}
                </h2>
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

            ${from.tablet} {
                font-size: 28px;
            }

            ${from.desktop} {
                font-size: 34px;
            }
        }
    `,
};
