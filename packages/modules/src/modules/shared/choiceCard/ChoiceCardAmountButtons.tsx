import React from 'react';
import { ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/src/types';
import { OphanEventIdPrefix, ContributionType, ChoiceCardSelection } from '../helpers/choiceCards';
import { trackClick } from './ChoiceCardFrequencyTabs';

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

export const ChoiceCardAmountButtons = ({
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
