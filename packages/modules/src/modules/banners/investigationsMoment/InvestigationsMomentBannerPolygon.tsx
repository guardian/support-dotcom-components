import { css, SerializedStyles } from '@emotion/react';
import { from } from '@guardian/src-foundations/dist/types/mq';
import React, { RefObject, useEffect, useState } from 'react';

const styles = {
    shadowTopRight: css`
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
    shadowBottomLeft: css`
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

interface InvestigationsMomentBannerPolygonsProps {
    viewBoxsTopRight: string[];
    polygonPointsTopRight: string[];
    viewBoxsBottomLeft: string[];
    polygonPointsBottomLeft: string[];
    cssOverridesTopRight: SerializedStyles;
    cssOverridesBottomLeft: SerializedStyles;
}

const InvestigationsMomentBannerPolygons = ({
    viewBoxsTopRight,
    polygonPointsTopRight,
    viewBoxsBottomLeft,
    polygonPointsBottomLeft,
    cssOverridesTopRight,
    cssOverridesBottomLeft,
}: InvestigationsMomentBannerPolygonsProps): JSX.Element => {
    const [width, setWidth] = useState(0);
    const ref: RefObject<HTMLDivElement> = React.useRef(null);

    useEffect(() => {
        console.log('ref = ', ref);
        if (ref.current) {
            setWidth(ref.current.clientWidth);
        }
    }, [width]);

    const viewBoxTopRight =
        viewBoxsTopRight[
            width < 320
                ? 0
                : width < 375
                ? 1
                : width < 740
                ? 2
                : width < 980
                ? 3
                : width < 1140
                ? 4
                : width < 1300
                ? 5
                : 6
        ];
    const polygonPointTopRight =
        polygonPointsTopRight[
            width < 320
                ? 0
                : width < 375
                ? 1
                : width < 740
                ? 2
                : width < 980
                ? 3
                : width < 1140
                ? 4
                : width < 1300
                ? 5
                : 6
        ];

    const viewBoxBottomLeft =
        viewBoxsBottomLeft[width < 740 ? 0 : width < 980 ? 1 : width < 1140 ? 2 : 3];
    const polygonPointBottomLeft =
        polygonPointsBottomLeft[width < 740 ? 0 : width < 980 ? 1 : width < 1140 ? 2 : 3];

    return (
        <div>
            <div css={[styles.shadowTopRight, cssOverridesTopRight]}>
                <svg viewBox={viewBoxTopRight} xmlns="http://www.w3.org/2000/svg">
                    <polygon points={polygonPointTopRight} />
                </svg>
            </div>
            <div css={[styles.shadowBottomLeft, cssOverridesBottomLeft]}>
                <svg viewBox={viewBoxBottomLeft} xmlns="http://www.w3.org/2000/svg">
                    <polygon points={polygonPointBottomLeft} />
                </svg>
            </div>
        </div>
    );
};

export default InvestigationsMomentBannerPolygons;
