import React from 'react';
import {
    AmountsCardData,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { BannerChoiceCardsPaymentFrequencyTabs } from './paymentFrequencyTabs/PaymentFrequencyTabs';
import { Box } from './paymentFrequencyTabs/PaymentFrequencyTabsBox';
import { ChoiceCardSelection } from '../WorldPressFreedomDayBanner';

export const trackClick = (
    type: 'amount' | 'frequency',
    submitComponentEvent?: (event: OphanComponentEvent) => void,
): void => {
    if (submitComponentEvent) {
        submitComponentEvent({
            component: {
                componentType: 'ACQUISITIONS_OTHER',
                id: `wpfd-banner-change-${type}`,
            },
            action: 'CLICK',
        });
    }
};

export const FrequencyTabs = ({
    // componentId,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
}: {
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: AmountsCardData;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    selection: ChoiceCardSelection;
}): JSX.Element => {
    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency', submitComponentEvent);
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
        return tabFrequencies.map((tabFrequency) => ({
            frequency: tabFrequency,
            id: `banner-${tabFrequency}`,
            labelText:
                tabFrequency === 'ONE_OFF' ? 'One-time' : getRecurringLabelText(tabFrequency),
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
