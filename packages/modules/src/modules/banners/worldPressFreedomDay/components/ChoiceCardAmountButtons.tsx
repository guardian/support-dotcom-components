import React from 'react';
import { ChoiceCard } from '@guardian/source/react-components';
import {
    AmountsCardData,
    ContributionFrequency,
    OphanComponentEvent,
    ContributionType,
} from '@sdc/shared/dist/types';
import { trackClick } from './FrequencyTabs';
import { SerializedStyles, css } from '@emotion/react';
import { space, between, from, until } from '@guardian/source/foundations';
import { ChoiceCardSelection } from '../WorldPressFreedomDayBanner';

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
        margin-right: 0 !important;
    }

    > label > div {
        ${between.tablet.and.desktop} {
            padding-left: 0 !important;
            padding-right: 0 !important;
        }
    }
`;

const choiceCardOrOtherAmountContainer = css`
    margin-bottom: ${space[1]}px;
    ${from.mobileLandscape} {
        margin-bottom: ${space[3]}px;
    }
`;

const choiceCardOrOtherAmountMissing = css`
    margin-bottom: ${space[1]}px;
`;

const supporterPlusChoiceCardAmountOverrides = css`
    border-radius: ${space[3]}px;
    ${until.mobileMedium} {
        font-size: 10px;
    }
`;

const ChoiceCardAmount = ({
    amount,
    id,
    label,
    checked,
    handleUpdateAmount,
    cssOverrides,
}: {
    id: string;
    amount?: number;
    label: string;
    checked: boolean;
    handleUpdateAmount: (amount: number | 'other') => void;
    cssOverrides: SerializedStyles;
}) => {
    if (amount) {
        return (
            <ChoiceCard
                value={`${amount}`}
                label={label}
                id={id}
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.id === id ? handleUpdateAmount(amount) : null
                }
                cssOverrides={cssOverrides}
            />
        );
    }

    return null;
};

export const ChoiceCardAmountButtons = ({
    contributionType,
    submitComponentEvent,
    amounts,
    setSelectionsCallback,
    selection,
    currencySymbol,
}: {
    contributionType: ContributionType;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: AmountsCardData;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    selection: ChoiceCardSelection;
    currencySymbol: string;
}): JSX.Element => {
    const productData = amounts[selection.frequency];
    const requiredAmounts = productData.amounts;
    const hideChooseYourAmount = productData.hideChooseYourAmount ?? false;

    // Something is wrong with the data
    if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
        return (
            <ChoiceCard value="third" label="Other" id="choice-cards-banner-third" checked={true} />
        );
    }

    const updateAmount = (
        amount: number | 'other',
        setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void,
        frequency: ContributionFrequency,
        submitComponentEvent?: (event: OphanComponentEvent) => void,
    ) => {
        trackClick('amount', submitComponentEvent);
        setSelectionsCallback({
            frequency,
            amount,
        });
    };

    const handleUpdateAmount = (amount: number | 'other') =>
        updateAmount(amount, setSelectionsCallback, selection.frequency, submitComponentEvent);

    const choiceCardAmounts = requiredAmounts.map((amount) => (
        <ChoiceCardAmount
            key={amount}
            id={`wpfd-banner-${amount}`}
            amount={amount}
            label={`${currencySymbol}${amount} ${contributionType[selection.frequency].suffix}`}
            checked={selection.amount === amount}
            handleUpdateAmount={() => handleUpdateAmount(amount)}
            cssOverrides={supporterPlusChoiceCardAmountOverrides}
        />
    ));

    return (
        <div css={container}>
            <div css={choiceCardsContainer}>
                {choiceCardAmounts[0]}
                {choiceCardAmounts[1]}
            </div>

            {hideChooseYourAmount ? (
                <div
                    css={
                        !choiceCardAmounts[2]
                            ? choiceCardOrOtherAmountMissing
                            : choiceCardOrOtherAmountContainer
                    }
                >
                    {choiceCardAmounts[2]}
                </div>
            ) : (
                <div css={choiceCardOrOtherAmountContainer}>
                    <ChoiceCard
                        value="other"
                        label="Other"
                        id={`wpfd-banner-other`}
                        checked={selection.amount == 'other'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.id === `wpfd-banner-other` ? handleUpdateAmount('other') : null
                        }
                        cssOverrides={supporterPlusChoiceCardAmountOverrides}
                    />
                </div>
            )}
        </div>
    );
};
