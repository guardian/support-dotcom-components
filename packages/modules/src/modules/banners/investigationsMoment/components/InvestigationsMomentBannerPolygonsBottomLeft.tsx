import React from 'react';
import InvestigationsMomentBannerPolygon, {
    SvgPolygonProps,
} from './InvestigationsMomentBannerPolygon';

const breakpoints: Breakpoint[] = ['tablet', 'desktop', 'leftCol', 'wide'];
type Breakpoint = 'tablet' | 'desktop' | 'leftCol' | 'wide';

const polygonBottomLeft: Record<Breakpoint, SvgPolygonProps> = {
    tablet: {
        viewBox: '0 0 1000 100',
        points: '0 100, 1000 100, 0 35',
        shadow: 'shadowBottomLeft',
        hideBelowBreakpoint: 'tablet',
        hideAboveBreakpoint: 'desktop',
    },
    desktop: {
        viewBox: '0 0 1000 100',
        points: '0 100, 1000 100, 0 40',
        shadow: 'shadowBottomLeft',
        hideBelowBreakpoint: 'desktop',
        hideAboveBreakpoint: 'leftCol',
    },
    leftCol: {
        viewBox: '0 0 1000 100',
        points: '0 100, 1000 100, 0 45',
        shadow: 'shadowBottomLeft',
        hideBelowBreakpoint: 'leftCol',
        hideAboveBreakpoint: 'wide',
    },
    wide: {
        viewBox: '0 0 1000 100',
        points: '0 100, 1000 100, 0 55',
        shadow: 'shadowBottomLeft',
        hideBelowBreakpoint: 'wide',
    },
};

export function InvestigationsMomentBannerPolygonBottomLeft(): JSX.Element {
    return (
        <div>
            {breakpoints.map((breakpoint: Breakpoint) => (
                <div key={breakpoint}>
                    <InvestigationsMomentBannerPolygon
                        viewBox={polygonBottomLeft[breakpoint].viewBox}
                        points={polygonBottomLeft[breakpoint].points}
                        shadow={polygonBottomLeft[breakpoint].shadow}
                        hideBelowBreakpoint={polygonBottomLeft[breakpoint].hideBelowBreakpoint}
                        hideAboveBreakpoint={polygonBottomLeft[breakpoint].hideAboveBreakpoint}
                    />
                </div>
            ))}
        </div>
    );
}
