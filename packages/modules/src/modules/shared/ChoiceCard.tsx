import React from 'react';
import { ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/src/types';
import { ChoiceCardSelection, ContributionType, OphanEventIdPrefix } from './helpers/choiceCards';
import { PaymentFrequencyTabs } from '../banners/choiceCardsBanner/components/paymentFrequencyTabs/PaymentFrequencyTabs';
import { Box } from '../banners/choiceCardsBanner/components/paymentFrequencyTabs/PaymentFrequencyTabsBox';

const trackClick = (
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

const ChoiceCardFrequencyTabs = ({
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

    const tabList = tabFrequencies.map(tabFrequency => ({
        id: tabFrequency,
        labelText: tabFrequency === 'ONE_OFF' ? 'Single' : getRecurringLabelText(tabFrequency),
        selected: selection.frequency === tabFrequency,
    }));

    if (ophanEventIdPrefix === 'supporter-plus-banner') {
        return (
            <Box>
                <PaymentFrequencyTabs
                    ariaLabel="payment frequency tabs"
                    tabs={tabList}
                    selectedTab={selection.frequency}
                    onTabChange={updateFrequency}
                />
            </Box>
        );
    }

    return (
        <>
            {tabFrequencies.map(tabFrequency => {
                const frequencyVal = contributionType[tabFrequency].frequency;

                return (
                    <ChoiceCard
                        key={tabFrequency}
                        label={contributionType[tabFrequency].label}
                        value={frequencyVal}
                        id={frequencyVal}
                        checked={selection?.frequency === frequencyVal}
                        onChange={() => updateFrequency(frequencyVal)}
                    />
                );
            })}
        </>
    );
};

const ChoiceCardAmount = ({
    amount,
    label,
    checked,
    handleUpdateAmount,
}: {
    amount?: number;
    label: string;
    checked: boolean;
    handleUpdateAmount: (amount: number | 'other') => void;
}) => {
    if (amount) {
        return (
            <ChoiceCard
                value={`${amount}`}
                label={label}
                id={`${amount}`}
                checked={checked}
                onChange={() => handleUpdateAmount(amount)}
            />
        );
    }

    return null;
};

const ChoiceCardAmountButtons = ({
    ophanEventIdPrefix,
    contributionType,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
    currencySymbol,
}: {
    ophanEventIdPrefix: OphanEventIdPrefix;
    contributionType: ContributionType;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: ContributionAmounts;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    selection: ChoiceCardSelection;
    currencySymbol: string;
}): JSX.Element => {
    const productData = amounts[selection.frequency];
    const requiredAmounts = productData.amounts;
    const hideChooseYourAmount = productData.hideChooseYourAmount ?? false;

    // Something is wrong with the data
    if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
        return <ChoiceCard value="third" label="Other" id="third" checked={true} />;
    }

    const updateAmount = (
        amount: number | 'other',
        ophanEventIdPrefix: OphanEventIdPrefix,
        setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void,
        frequency: ContributionFrequency,
        submitComponentEvent?: (event: OphanComponentEvent) => void,
    ) => {
        trackClick('amount', ophanEventIdPrefix, submitComponentEvent);
        setSelectionsCallback({
            frequency,
            amount,
        });
    };

    const handleUpdateAmount = (amount: number | 'other') =>
        updateAmount(
            amount,
            ophanEventIdPrefix,
            setSelectionsCallback,
            selection.frequency,
            submitComponentEvent,
        );

    const choiceCardAmounts = requiredAmounts.map(amount => (
        <ChoiceCardAmount
            key={amount}
            amount={amount}
            label={`${currencySymbol}${amount} ${contributionType[selection.frequency].suffix}`}
            checked={selection.amount === amount}
            handleUpdateAmount={() => handleUpdateAmount(amount)}
        />
    ));

    return (
        <>
            {choiceCardAmounts[0]}
            {choiceCardAmounts[1]}
            {hideChooseYourAmount ? (
                choiceCardAmounts[2]
            ) : (
                <ChoiceCard
                    value="other"
                    label="Other"
                    id="other"
                    checked={selection.amount == 'other'}
                    onChange={() => updateAmount}
                />
            )}
        </>
    );
};

export { ChoiceCardFrequencyTabs, ChoiceCardAmountButtons };
