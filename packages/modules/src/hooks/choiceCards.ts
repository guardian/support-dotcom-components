import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
    Tracking,
} from '@sdc/shared/dist/types';
import { BannerTextContent } from '../modules/banners/common/types';

export interface ContributionTypeItem {
    label: string;
    frequency: ContributionFrequency;
    suffix: string;
}

export type ContributionType = {
    [key in ContributionFrequency]: ContributionTypeItem;
};

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

export type ChoiceCardBannerComponentId =
    | 'choice-cards-banner-yellow'
    | 'choice-cards-banner-blue'
    | 'contributions-epic';

export interface ChoiceCardProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    componentId: ChoiceCardBannerComponentId;
    amounts?: ContributionAmounts;
    amountsTestName?: string;
    amountsVariantName?: string;
    countryCode?: string;
    bannerTracking?: Tracking;
    numArticles?: number;
    content?: BannerTextContent;
}

export const contributionType: ContributionType = {
    ONE_OFF: {
        label: 'Single',
        frequency: 'ONE_OFF',
        suffix: '',
    },
    MONTHLY: {
        label: 'Monthly',
        frequency: 'MONTHLY',
        suffix: 'per month',
    },
    ANNUAL: {
        label: 'Annual',
        frequency: 'ANNUAL',
        suffix: 'per year',
    },
};
