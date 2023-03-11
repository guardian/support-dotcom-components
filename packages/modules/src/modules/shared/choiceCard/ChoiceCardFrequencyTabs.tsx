import React from 'react';
import { ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { BannerChoiceCardsPaymentFrequencyTabs } from '../../banners/choiceCardsBanner/components/paymentFrequencyTabs/PaymentFrequencyTabs';
import { Box } from '../../banners/choiceCardsBanner/components/paymentFrequencyTabs/PaymentFrequencyTabsBox';
import {
    OphanEventIdPrefix,
    ContributionType,
    ChoiceCardSelection,
} from '../../../hooks/choiceCards';

export const trackClick = (
    type: 'amount' | 'frequency',
    ophanEventIdPrefix: OphanEventIdPrefix,
    submitComponentEvent?: (event: OphanComponentEvent) => void,
): void => {
    if (submitComponentEvent) {
        submitComponentEvent({
            component: {
                componentType: 'ACQUISITIONS_OTHER',
                id: `${ophanEventIdPrefix}-choice-cards-change-${type}`,
            },
            action: 'CLICK',
        });
    }
};

export const ChoiceCardFrequencyTabs = ({
    ophanEventIdPrefix,
    contributionType,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
}: {
    ophanEventIdPrefix: OphanEventIdPrefix;
    contributionType: ContributionType;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: ContributionAmounts;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    selection: ChoiceCardSelection;
}): JSX.Element => {
    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency', ophanEventIdPrefix, submitComponentEvent);
        amounts &&
            setSelectionsCallback({
                frequency: frequency,
                amount: amounts[frequency].defaultAmount,
            });
    };

    const tabFrequencies: ContributionFrequency[] = ['ONE_OFF', 'MONTHLY', 'ANNUAL'];

    const getRecurringLabelText = (tabFrequency: ContributionFrequency) =>
        tabFrequency[0] + tabFrequency.slice(1).toLowerCase();

    const getTabList = (ophanEventIdPrefix: OphanEventIdPrefix) => {
        const idPrefix = ophanEventIdPrefix === 'supporter-plus-banner' ? 'banner' : 'epic';

        return tabFrequencies.map(tabFrequency => ({
            frequency: tabFrequency,
            id: `${idPrefix}-${tabFrequency}`,
            labelText: tabFrequency === 'ONE_OFF' ? 'Single' : getRecurringLabelText(tabFrequency),
            selected: selection.frequency === tabFrequency,
        }));
    };

    if (ophanEventIdPrefix === 'supporter-plus-banner') {
        return (
            <Box>
                <BannerChoiceCardsPaymentFrequencyTabs
                    ariaLabel="payment frequency tabs"
                    tabs={getTabList('supporter-plus-banner')}
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
