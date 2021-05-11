import { Variant as EpicVariant } from './variants';
import { BannerVariant } from '../types/BannerTypes';
import { ControlProportionSettings } from '../types/shared';

const maxMvt = 1000000;

export const withinRange = (lower: number, proportion: number, mvtId: number): boolean => {
    const upper = (lower + maxMvt * proportion) % maxMvt;

    if (lower > upper) {
        // wrapped
        return mvtId >= lower || mvtId < upper;
    } else {
        return mvtId >= lower && mvtId < upper;
    }
};

/**
 * If controlProportionSettings is set then we use this to define the range of mvt values for the control variant.
 * Otherwise we evenly distribute all variants across maxMvt.
 */

type Variant = EpicVariant | BannerVariant;
export const selectVariant = <V extends Variant>(
    variants: V[],
    mvtId: number,
    controlProportionSettings?: ControlProportionSettings,
): V => {
    const control = variants.find(v => v.name.toLowerCase() === 'control');

    if (controlProportionSettings && control) {
        if (
            withinRange(
                controlProportionSettings.offset,
                controlProportionSettings.proportion,
                mvtId,
            )
        ) {
            return control;
        } else {
            const otherVariants = variants.filter(v => v.name.toLowerCase() !== 'control');
            return otherVariants[mvtId % otherVariants.length] as V;
        }
    }

    return variants[mvtId % variants.length] as V;
};
