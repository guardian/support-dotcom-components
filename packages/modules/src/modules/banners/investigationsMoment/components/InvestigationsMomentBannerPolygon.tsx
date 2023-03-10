import { css, SerializedStyles } from '@emotion/react';
import { Breakpoint, from, until } from '@guardian/src-foundations/mq';
import React from 'react';

export type Shadow = 'shadowTopRight' | 'shadowBottomLeft';

export type SvgPolygonProps = {
    viewBox: string;
    points: string;
    shadow: Shadow;
    hideBelowBreakpoint?: Breakpoint;
    hideAboveBreakpoint?: Breakpoint;
};

const styles = {
    shadowTopRight: (hideBelowBreakpoint?: Breakpoint, hideAboveBreakpoint?: Breakpoint) => css`
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
            width: 234px;
            height: 316px;
        }

        ${from.desktop} {
            width: 297px;
            height: 257px;
        }

        ${from.leftCol} {
            width: 297px;
            height: 238px;
        }

        ${from.wide} {
            width: 390px;
            height: 315px;
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

        // The following styles will conditionally hide the svg polygon
        ${hideBelowBreakpoint && until[hideBelowBreakpoint]} {
            display: none;
        }
        ${hideAboveBreakpoint && from[hideAboveBreakpoint]} {
            display: none;
        }
    `,
    shadowBottomLeft: (hideBelowBreakpoint?: Breakpoint, hideAboveBreakpoint?: Breakpoint) => css`
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
            right: auto;D
        }

        // The following styles will conditionally hide the svg polygon
        ${hideBelowBreakpoint && until[hideBelowBreakpoint]} {
            display: none;
        }
        ${hideAboveBreakpoint && from[hideAboveBreakpoint]} {
            display: none;
        }
    `,
};

function InvestigationsMomentBannerPolygon({
    viewBox,
    points,
    shadow,
    hideBelowBreakpoint,
    hideAboveBreakpoint,
}: SvgPolygonProps): JSX.Element {
    const getStyles = (shadow: Shadow): SerializedStyles => {
        switch (shadow) {
            case 'shadowTopRight':
                return styles.shadowTopRight(hideBelowBreakpoint, hideAboveBreakpoint);
            case 'shadowBottomLeft':
                return styles.shadowBottomLeft(hideBelowBreakpoint, hideAboveBreakpoint);
            default:
                return css``;
        }
    };

    return (
        <div css={getStyles(shadow)}>
            <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                <polygon points={points} />
            </svg>
        </div>
    );
}

export default InvestigationsMomentBannerPolygon;
