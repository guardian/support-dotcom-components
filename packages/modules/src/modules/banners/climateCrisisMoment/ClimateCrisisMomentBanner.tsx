import React from 'react';
import { bannerWrapper, validatedBannerWrapper } from '../common/BannerWrapper';
import { getMomentTemplateBanner } from '../momentTemplate/MomentTemplateBanner';
import { settings } from './settings';
import { Thermometer } from './visual/Thermometer';
import { ThermometerMercury } from './visual/ThermometerMercury';

const ClimateCrisisMomentBanner = getMomentTemplateBanner({
    ...settings,
    alternativeVisual: (
        <Thermometer>
            <ThermometerMercury />
        </Thermometer>
    ),
});

const unvalidated = bannerWrapper(ClimateCrisisMomentBanner, 'climate-crisis-moment-banner');
const validated = validatedBannerWrapper(ClimateCrisisMomentBanner, 'climate-crisis-moment-banner');

export {
    validated as ClimateCrisisMomentBanner,
    unvalidated as ClimateCrisisMomentBannerUnvalidated,
};
