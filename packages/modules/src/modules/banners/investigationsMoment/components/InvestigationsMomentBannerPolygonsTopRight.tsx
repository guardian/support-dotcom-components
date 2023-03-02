import { Breakpoint } from '@guardian/src-foundations';
import React from 'react';
import InvestigationsMomentBannerPolygon, {
    SvgPolygonProps,
} from './InvestigationsMomentBannerPolygon';

const breakpoints: Breakpoint[] = [
    'mobile',
    'mobileMedium',
    'mobileLandscape',
    'phablet',
    'tablet',
    'desktop',
    'leftCol',
    'wide',
];

const polygonTopRight: Record<Breakpoint, SvgPolygonProps> = {
    mobile: {
        viewBox: '0 0 150 80',
        points: '0 0, 150 0, 150 80',
        desktopShadow: 'desktopShadowRight',
        hideAboveBreakpoint: 'mobileMedium',
    },
    mobileMedium: {
        viewBox: '0 0 200 80',
        points: '0 0, 200 0, 200 80',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'mobileMedium',
        hideAboveBreakpoint: 'mobileLandscape',
    },
    mobileLandscape: {
        viewBox: '0 0 300 80',
        points: '0 0, 300 0, 300 80',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'mobileLandscape',
        hideAboveBreakpoint: 'phablet',
    },
    phablet: {
        viewBox: '0 0 475 80',
        points: '0 0, 475 0, 475 80',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'phablet',
        hideAboveBreakpoint: 'tablet',
    },
    tablet: {
        viewBox: '0 0 100 200',
        points: '0 0, 100 0, 100 200',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'tablet',
        hideAboveBreakpoint: 'desktop',
    },
    desktop: {
        viewBox: '0 0 300 400',
        points: '0 0, 300 0, 300 400',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'desktop',
        hideAboveBreakpoint: 'leftCol',
    },
    leftCol: {
        viewBox: '0 0 350 400',
        points: '0 0, 350 0, 350 400',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'leftCol',
        hideAboveBreakpoint: 'wide',
    },
    wide: {
        viewBox: '0 0 530 400',
        points: '0 0, 530 0, 530 400',
        desktopShadow: 'desktopShadowRight',
        hideBelowBreakpoint: 'wide',
    },
};

const InvestigationsMomentBannerPolygonsTopRight = (): JSX.Element => {
    return (
        <div>
            {breakpoints.map((breakpoint: Breakpoint) => (
                <div key={breakpoint}>
                    <InvestigationsMomentBannerPolygon
                        viewBox={polygonTopRight[breakpoint].viewBox}
                        points={polygonTopRight[breakpoint].points}
                        desktopShadow={polygonTopRight[breakpoint].desktopShadow}
                        hideBelowBreakpoint={polygonTopRight[breakpoint].hideBelowBreakpoint}
                        hideAboveBreakpoint={polygonTopRight[breakpoint].hideAboveBreakpoint}
                    />
                    {polygonTopRight[breakpoint]}
                </div>
            ))}
        </div>
    );
};

export default InvestigationsMomentBannerPolygonsTopRight;
