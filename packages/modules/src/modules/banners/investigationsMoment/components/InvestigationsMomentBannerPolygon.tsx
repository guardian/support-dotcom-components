import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import React from 'react';

type DesktopShadow = 'desktopShadowRight' | 'desktopShadowBottom';

interface InvestigationsMomentBannerPolygonProps {
    viewBox: string;
    points: string;
    desktopShadow: DesktopShadow;
}

const styles = {
    desktopShadowRight: css`
        position: absolute;
        pointer-events: none;
        display: flex;
        justify-content: flex-end;
        top: 0;
        right: 0;
        width: 150px;
        height: 80px;

        ${from.mobileMedium} {
            width: 200px;
        }

        ${from.mobileLandscape} {
            width: 300px;
        }

        ${from.phablet} {
            width: 475px;
        }

        ${from.tablet} {
            bottom: 0;
            width: auto;
            height: auto;
        }

        svg {
            display: block;
            height: 100%;

            ${from.tablet} {
                height: 90%;
            }

            ${from.desktop} {
                height: 95%;
            }

            ${from.leftCol} {
                height: 90%;
            }
        }
    `,
    desktopShadowBottom: css`
        position: absolute;
        pointer-events: none;
        bottom: 0;
        left: 0;
        right: 20px;

        svg {
            display: block;
        }

        ${from.wide} {
            height: 125px;
            width: 1250px;
            right: auto;
        }
    `,
};

function InvestigationsMomentBannerPolygon({
    viewBox,
    points,
    desktopShadow,
}: InvestigationsMomentBannerPolygonProps): JSX.Element {
    return (
        <div css={styles[desktopShadow]}>
            <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                <polygon points={points} />
            </svg>
        </div>
    );
}

export default InvestigationsMomentBannerPolygon;
