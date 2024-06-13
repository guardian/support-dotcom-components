import React from 'react';
import { ChoiceCard } from '@guardian/source/react-components';
import { AmountsCardData, ContributionFrequency, ContributionType } from '@sdc/shared/dist/types';
import { trackClick } from './ChoiceCardFrequencyTabs';
import { SerializedStyles, css } from '@emotion/react';
import { space, between, from, until } from '@guardian/source/foundations';
import { ChoiceCardSelection } from '../ChoiceCardsButtonsBanner';
import { ChoiceCardBannerComponentId, ChoiceCardSettings } from './ChoiceCards';
import { OphanComponentEvent } from '@guardian/libs';

const container = css`
    display: flex;
    flex-direction: column;
`;

const choiceCardsContainer = (backgroundColour?: string) => css`
    display: flex;
    flex-direction: row;
    margin-bottom: ${space[2]}px;

    > label {
        margin: 0 !important;
        background-color: ${backgroundColour ?? 'transparent'};
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

const choiceCardOrOtherAmount = (isAmountMissing: boolean, backgroundColour?: string) => css`
    margin-bottom: ${space[1]}px;
    ${isAmountMissing ? `` : `${from.mobileLandscape} { margin-bottom: ${space[3]}px; }`}

    > label {
        background-color: ${backgroundColour ?? 'transparent'};
    }
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
    componentId,
    contributionType,
    submitComponentEvent,
    amounts,
    amountsButtonColours,
    setSelectionsCallback,
    selection,
    currencySymbol,
}: {
    componentId: ChoiceCardBannerComponentId;
    contributionType: ContributionType;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: AmountsCardData;
    amountsButtonColours?: ChoiceCardSettings;
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

    const choiceCardAmounts = requiredAmounts.map((amount) => (
        <ChoiceCardAmount
            key={amount}
            id={`${componentId}-${amount}`}
            amount={amount}
            label={`${currencySymbol}${amount} ${contributionType[selection.frequency].suffix}`}
            checked={selection.amount === amount}
            handleUpdateAmount={() => handleUpdateAmount(amount)}
            cssOverrides={supporterPlusChoiceCardAmountOverrides}
        />
    ));

    return (
        <div css={container}>
            <div css={choiceCardsContainer(amountsButtonColours?.buttonColour)}>
                {choiceCardAmounts[0]}
                {choiceCardAmounts[1]}
            </div>

            {hideChooseYourAmount ? (
                <div
                    css={choiceCardOrOtherAmount(
                        !choiceCardAmounts[2],
                        amountsButtonColours?.buttonColour,
                    )}
                >
                    {choiceCardAmounts[2]}
                </div>
            ) : (
                <div
                    css={choiceCardOrOtherAmount(
                        hideChooseYourAmount,
                        amountsButtonColours?.buttonColour,
                    )}
                >
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
