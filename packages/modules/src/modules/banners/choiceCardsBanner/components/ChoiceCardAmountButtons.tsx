import React from 'react';
import { ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { ContributionType, trackClick } from './ChoiceCardFrequencyTabs';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { between, until } from '@guardian/src-foundations/mq';
import { ChoiceCardSelection } from '../ChoiceCardsBanner';
import { ChoiceCardBannerComponentId } from './ChoiceCards';

const container = css`
    display: flex;
    flex-direction: column;
    margin: 0 ${space[3]}px;
`;

const choiceCardsContainer = css`
    display: flex;
    flex-direction: row;
    margin-top: ${space[3]}px;
    margin-bottom: ${space[3]}px;

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
    margin-bottom: ${space[3]}px;
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
}: {
    id: string;
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
                id={id}
                checked={checked}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    e.target.id === id ? handleUpdateAmount(amount) : null
                }
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
        return (
            <ChoiceCard value="third" label="Other" id="choice-cards-banner-third" checked={true} />
        );
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
            id={`${componentId}-${amount}`}
            amount={amount}
            label={`${currencySymbol}${amount} ${contributionType[selection.frequency].suffix}`}
            checked={selection.amount === amount}
            handleUpdateAmount={() => handleUpdateAmount(amount)}
            css={supporterPlusChoiceCardAmountOverrides}
        />
    ));

    return (
        <div css={container}>
            <div css={choiceCardsContainer}>
                {choiceCardAmounts[0]}
                {choiceCardAmounts[1]}
            </div>

            {hideChooseYourAmount ? (
                <div css={choiceCardOrOtherAmountContainer}>{choiceCardAmounts[2]}</div>
            ) : (
                <div css={choiceCardOrOtherAmountContainer}>
                    <ChoiceCard
                        value="other"
                        label="Other"
                        id={`${componentId}-other`}
                        checked={selection.amount == 'other'}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            e.target.id === `${componentId}-other`
                                ? handleUpdateAmount('other')
                                : null
                        }
                        cssOverrides={supporterPlusChoiceCardAmountOverrides}
                    />
                </div>
            )}
        </div>
    );
};
