import React from 'react';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { BannerChoiceCardsPaymentFrequencyTabs } from './paymentFrequencyTabs/PaymentFrequencyTabs';
import { Box } from './paymentFrequencyTabs/PaymentFrequencyTabsBox';
import { ChoiceCardBannerComponentId } from './ChoiceCards';
import { ChoiceCardSelection } from '../ChoiceCardsBanner';

interface ContributionTypeItem {
    label: string;
    frequency: ContributionFrequency;
    suffix: string;
}

export type ContributionType = {
    [key in ContributionFrequency]: ContributionTypeItem;
};

export const trackClick = (
    type: 'amount' | 'frequency',
    componentId: ChoiceCardBannerComponentId,
    submitComponentEvent?: (event: OphanComponentEvent) => void,
): void => {
    if (submitComponentEvent) {
        submitComponentEvent({
            component: {
                componentType: 'ACQUISITIONS_OTHER',
                id: `${componentId}-change-${type}`,
            },
            action: 'CLICK',
        });
    }
};

export const ChoiceCardFrequencyTabs = ({
    componentId,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
}: {
    componentId: ChoiceCardBannerComponentId;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: ContributionAmounts;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    selection: ChoiceCardSelection;
}): JSX.Element => {
    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency', componentId, submitComponentEvent);
        amounts &&
            setSelectionsCallback({
                frequency: frequency,
                amount: amounts[frequency].defaultAmount,
            });
    };

    const tabFrequencies: ContributionFrequency[] = ['ONE_OFF', 'MONTHLY', 'ANNUAL'];

    const getRecurringLabelText = (tabFrequency: ContributionFrequency) =>
        tabFrequency[0] + tabFrequency.slice(1).toLowerCase();

    const getTabList = () => {
        return tabFrequencies.map(tabFrequency => ({
            frequency: tabFrequency,
            id: `banner-${tabFrequency}`,
            labelText: tabFrequency === 'ONE_OFF' ? 'Single' : getRecurringLabelText(tabFrequency),
            selected: selection.frequency === tabFrequency,
        }));
    };

    return (
        <Box>
            <BannerChoiceCardsPaymentFrequencyTabs
                ariaLabel="payment frequency tabs"
                tabs={getTabList()}
                selectedTab={selection.frequency}
                onTabChange={updateFrequency}
            />
        </Box>
    );
};
