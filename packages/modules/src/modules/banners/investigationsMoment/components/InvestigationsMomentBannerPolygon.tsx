import { SerializedStyles } from '@emotion/react';
import React from 'react';

interface InvestigationsMomentBannerPolygonProps {
    viewBox: string;
    polygonPoints: string;
    cssOverrides: SerializedStyles;
}

const InvestigationsMomentBannerPolygon = ({
    viewBox,
    polygonPoints,
    cssOverrides,
}: InvestigationsMomentBannerPolygonProps): JSX.Element => {
    return (
        <div css={cssOverrides}>
            <svg viewBox={viewBox} xmlns="http://www.w3.org/2000/svg">
                <polygon points={polygonPoints} />
            </svg>
        </div>
    );
};

export default InvestigationsMomentBannerPolygon;
