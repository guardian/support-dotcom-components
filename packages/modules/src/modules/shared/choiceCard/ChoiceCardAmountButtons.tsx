import React from 'react';
import { ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import {
    ContributionType,
    ChoiceCardSelection,
    ChoiceCardBannerComponentId,
} from '../../../hooks/choiceCards';
import { trackClick } from './ChoiceCardFrequencyTabs';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { until } from '@guardian/src-foundations/mq';

const container = css`
    display: flex;
    flex-direction: column;
    margin: 0 ${space[3]}px;
`;

const choiceCardsContainer = css`
    display: flex;
    flex-direction: row;
    margin-top: ${space[3]}px;
    margin-bottom: ${space[2]}px;

    > label {
        margin: 0 !important;
    }

    > label:first-of-type {
        margin-right: ${space[2]}px !important;
    }

    > label:last-of-type {
        margin: 0 !important;
    }

    /* > label > div:first-of-type {
        padding: 0 !important;
    } */
`;

const choiceCardOrOtherAmountContainer = css`
    margin: ${space[2]}px 0;
`;

const supporterPlusChoiceCardAmountOverrides = css`
    ${until.mobileMedium} {
        font-size: 10px;
    }
`;

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
    componentId,
    contributionType,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
    currencySymbol,
}: {
    componentId: ChoiceCardBannerComponentId;
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
        componentId: ChoiceCardBannerComponentId,
        setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void,
        frequency: ContributionFrequency,
        submitComponentEvent?: (event: OphanComponentEvent) => void,
    ) => {
        trackClick('amount', componentId, submitComponentEvent);
        setSelectionsCallback({
            frequency,
            amount,
        });
    };

    const handleUpdateAmount = (amount: number | 'other') =>
        updateAmount(
            amount,
            componentId,
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
            css={supporterPlusChoiceCardAmountOverrides}
        />
    ));

    if (componentId.includes('choice-cards')) {
        /////
        ///// amounts containers
        return (
            <div css={container}>
                <div css={choiceCardsContainer}>
                    {choiceCardAmounts[0]}
                    {choiceCardAmounts[1]}
                </div>
                <div css={choiceCardOrOtherAmountContainer}>
                    {hideChooseYourAmount ? (
                        choiceCardAmounts[2]
                    ) : (
                        <ChoiceCard
                            value="other"
                            label="Other"
                            id="other"
                            checked={selection.amount == 'other'}
                            onChange={() => handleUpdateAmount('other')}
                            cssOverrides={supporterPlusChoiceCardAmountOverrides}
                        />
                    )}
                </div>
            </div>
        );
    }

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
                    onChange={() => handleUpdateAmount('other')}
                />
            )}
        </>
    );
};
