import { BannerId } from './types';

export interface ComponentIds {
    close: string;
    cta: string;
    secondaryCta: string;
    notNow: string;
    signIn: string;
}

export function getComponentIds(bannerId: BannerId): ComponentIds {
    return {
        close: `${bannerId} : close`,
        cta: `${bannerId} : cta`,
        secondaryCta: `${bannerId} : secondary-cta`,
        notNow: `${bannerId} : not now`,
        signIn: `${bannerId} : sign in`,
    };
}
