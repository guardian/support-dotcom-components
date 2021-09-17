import React from 'react';
import { BannerRenderProps } from '../common/types';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';

function InvestigationsMomentBanner({}: BannerRenderProps) {
    return <div>Hello, world</div>;
}

const unvalidated = bannerWrapper(InvestigationsMomentBanner, 'investigations-moment-banner');
const validated = validatedBannerWrapper(
    InvestigationsMomentBanner,
    'investigations-moment-banner',
);

export {
    validated as InvestigationsMomentBanner,
    unvalidated as InvestigationsMomentBannerUnvalidated,
};
