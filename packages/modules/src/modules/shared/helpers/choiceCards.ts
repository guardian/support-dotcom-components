import { ContributionType } from '@sdc/shared/src/types';
import { ContributionFrequency } from '@sdc/shared/types';

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

export const contributionType: ContributionType = {
    ONE_OFF: {
        label: 'One-time',
        suffix: '',
    },
    MONTHLY: {
        label: 'Monthly',
        suffix: 'per month',
    },
    ANNUAL: {
        label: 'Annual',
        suffix: 'per year',
    },
};
