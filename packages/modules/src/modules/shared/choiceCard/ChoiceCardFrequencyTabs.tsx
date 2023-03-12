import React from 'react';
import { ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { BannerChoiceCardsPaymentFrequencyTabs } from '../../banners/choiceCardsBanner/components/paymentFrequencyTabs/PaymentFrequencyTabs';
import { Box } from '../../banners/choiceCardsBanner/components/paymentFrequencyTabs/PaymentFrequencyTabsBox';
import { ChoiceCardBannerComponentId } from '../../banners/choiceCardsBanner/components/ChoiceCards';
import { ChoiceCardSelection } from '../../banners/choiceCardsBanner/ChoiceCardsBanner';

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
    contributionType,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
}: {
    componentId: ChoiceCardBannerComponentId;
    contributionType: ContributionType;
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

    const getTabList = (bannerId: ChoiceCardBannerComponentId) => {
        const idPrefix = bannerId.includes('choice-cards') ? 'banner' : 'epic';

        return tabFrequencies.map(tabFrequency => ({
            frequency: tabFrequency,
            id: `${idPrefix}-${tabFrequency}`,
            labelText: tabFrequency === 'ONE_OFF' ? 'Single' : getRecurringLabelText(tabFrequency),
            selected: selection.frequency === tabFrequency,
        }));
    };

    if (componentId.includes('choice-cards')) {
        return (
            <Box>
                <BannerChoiceCardsPaymentFrequencyTabs
                    ariaLabel="payment frequency tabs"
                    tabs={getTabList(componentId)}
                    selectedTab={selection.frequency}
                    onTabChange={updateFrequency}
                />
            </Box>
        );
    }

    // Epic ChoiceCard Payment Frequency Tabs
    return (
        <>
            {tabFrequencies.map(tabFrequency => {
                const frequencyVal = contributionType[tabFrequency].frequency;

                return (
                    <ChoiceCard
                        key={tabFrequency}
                        label={contributionType[tabFrequency].label}
                        value={frequencyVal}
                        id={`epic-${tabFrequency}`}
                        checked={selection?.frequency === frequencyVal}
                        onChange={() => updateFrequency(frequencyVal)}
                    />
                );
            })}
        </>
    );
};
