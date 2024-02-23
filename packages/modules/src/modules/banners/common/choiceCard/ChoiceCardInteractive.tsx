import React from 'react';
import { ChoiceCardGroup, ChoiceCard, Stack } from '@guardian/source-react-components';
import {
    ContributionFrequency,
    SelectedAmountsVariant,
    OphanComponentEvent,
} from '@sdc/shared/types';
import { contributionType, ChoiceCardSelection } from '../../../shared/helpers/choiceCards';
import { ChoiceCardSettings } from './ChoiceCards';
import type { ReactComponent } from '../../../../types';
import { css } from '@emotion/react';

interface ChoiceCardInteractiveProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    amountsTest?: SelectedAmountsVariant;
    componentId: string;
    design?: ChoiceCardSettings;
}

const buildStyles = (design: ChoiceCardSettings | undefined) => {
    const {
        buttonColour,
        buttonTextColour,
        buttonBorderColour,
        buttonSelectColour,
        buttonSelectTextColour,
        buttonSelectBorderColour,
    } = design || {};

    return {
        buttonOverride: css`
            & + label {
                ${buttonTextColour && `color: ${buttonTextColour};`}
                ${buttonColour && `background-color: ${buttonColour};`}
    ${buttonBorderColour && `box-shadow: inset 0 0 0 2px ${buttonBorderColour};`}
            }

            &:hover + label {
                ${buttonTextColour && `color: ${buttonTextColour};`}
                ${buttonColour && `background-color: ${buttonColour};`}
    ${buttonSelectBorderColour && `box-shadow: inset 0 0 0 4px ${buttonSelectBorderColour};`}
            }

            &:checked + label {
                ${buttonSelectColour && `background-color: ${buttonSelectColour};`}
                ${buttonSelectBorderColour &&
                `box-shadow: inset 0 0 0 4px ${buttonSelectBorderColour};`}
            }
            &:checked + label > * {
                ${buttonSelectTextColour && `color: ${buttonSelectTextColour};`}
            }
        `,
        amountsOverride: css`
            > div > label > div {
                padding-left: 0 !important;
                padding-right: 0 !important;
            }
        `,
        lastAmountOverride: css`
            > div > label:last-of-type {
                grid-column-start: 1;
                grid-column-end: 3;
            }
        `,
    };
};

export const ChoiceCardInteractive: ReactComponent<ChoiceCardInteractiveProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    amountsTest,
    componentId,
    design,
}: ChoiceCardInteractiveProps) => {
    if (!selection || !amountsTest) {
        return <></>;
    }

    const { displayContributionType, amountsCardData } = amountsTest;

    const contributionTypeTabOrder: ContributionFrequency[] = ['ONE_OFF', 'MONTHLY', 'ANNUAL'];

    if (!amountsCardData) {
        return <></>;
    }

    const noOfContributionTabs = displayContributionType.length > 2 ? 3 : 2;
    const hideChooseYourAmount = !!amountsCardData[selection.frequency].hideChooseYourAmount;

    const style = buildStyles(design, noOfContributionTabs);

    const trackClick = (type: 'amount' | 'frequency'): void => {
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

    const updateAmount = (amount: number | 'other') => {
        trackClick('amount');
        setSelectionsCallback({
            frequency: selection.frequency,
            amount: amount,
        });
    };

    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency');
        setSelectionsCallback({
            frequency: frequency,
            amount: amountsCardData[frequency].defaultAmount,
        });
    };

    const choiceCardAmount = (amount?: number) => {
        if (amount) {
            return (
                <ChoiceCard
                    key={amount}
                    value={`${amount}`}
                    label={`${currencySymbol}${amount} ${
                        contributionType[selection.frequency].suffix
                    }`}
                    id={`contributions-banner-${amount}`}
                    checked={selection.amount === amount}
                    onChange={() => updateAmount(amount)}
                    cssOverrides={style.buttonOverride}
                />
            );
        }
        return <></>;
    };

    const generateChoiceCardAmountsButtons = () => {
        const productData = amountsCardData[selection.frequency];
        const requiredAmounts = productData.amounts;

        // Something is wrong with the data
        if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
            return (
                <ChoiceCard
                    value="third"
                    label="Other"
                    id="contributions-banner-third"
                    checked={true}
                    cssOverrides={style.buttonOverride}
                />
            );
        }

        return (
            <>
                {choiceCardAmount(requiredAmounts[0])}
                {choiceCardAmount(requiredAmounts[1])}

                {hideChooseYourAmount ? (
                    choiceCardAmount(requiredAmounts[2])
                ) : (
                    <ChoiceCard
                        key={2}
                        value="other"
                        label="Other"
                        id="contributions-banner-other"
                        checked={selection.amount === 'other'}
                        onChange={() => updateAmount('other')}
                        cssOverrides={style.buttonOverride}
                    />
                )}
            </>
        );
    };

    const generateChoiceCardFrequencyTab = (frequency: ContributionFrequency) => {
        const label = contributionType[frequency].label;
        return (
            <ChoiceCard
                key={label}
                label={label}
                value={frequency}
                id={`contributions-banner-${frequency}`}
                checked={selection.frequency === frequency}
                onChange={() => updateFrequency(frequency)}
                cssOverrides={style.buttonOverride}
            />
        );
    };

    return (
        <>
            <Stack space={3}>
                <div>
                    <ChoiceCardGroup
                        name="contribution-frequency"
                        label="Contribution frequency"
                        columns={noOfContributionTabs}
                        hideLabel
                        cssOverrides={style.amountsOverride}
                    >
                        {contributionTypeTabOrder.map((f) =>
                            displayContributionType.includes(f) ? (
                                generateChoiceCardFrequencyTab(f)
                            ) : (
                                <></>
                            ),
                        )}
                    </ChoiceCardGroup>
                </div>
                <div>
                    <ChoiceCardGroup
                        name="contribution-amount"
                        label="Contribution amount"
                        columns={2}
                        hideLabel
                        aria-labelledby={selection.frequency}
                        cssOverrides={style.lastAmountOverride}
                    >
                        {generateChoiceCardAmountsButtons()}
                    </ChoiceCardGroup>
                </div>
            </Stack>
        </>
    );
};
