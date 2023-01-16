import React from 'react';
import { ChoiceCardGroup, ChoiceCard } from '@guardian/src-choice-card';
import {
    ModifiedChoiceCardAmounts,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/types';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib/geolocation';
import { css } from '@emotion/react';
import { until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { countryCodeToCountryGroupId } from '@sdc/shared/lib';

const frequencyChoiceCardGroupOverrides = css`
    ${until.mobileLandscape} {
        > div {
            display: flex !important;
        }

        > div label:nth-of-type(2) {
            margin-left: 4px !important;
            margin-right: 4px !important;
        }
    }
`;

const hideChoiceCardGroupLegend = css`
    legend {
        ${visuallyHidden};
    }
`;

// This `position: relative` is necessary to stop it jumping to the top of the page when a button is clicked
const container = css`
    position: relative;
`;

export interface ChoiceCardSelection {
    frequency: ContributionFrequency;
    amount: number | 'other';
}

interface EpicChoiceCardProps {
    amounts: ModifiedChoiceCardAmounts;
    selection: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    countryCode?: string;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
}

export const ContributionsEpicChoiceCards: React.FC<EpicChoiceCardProps> = ({
    amounts,
    selection,
    setSelectionsCallback,
    countryCode,
    submitComponentEvent,
}: EpicChoiceCardProps) => {
    const currencySymbol = getLocalCurrencySymbol(countryCode);
    const countryGroupId = countryCodeToCountryGroupId(countryCode || 'GBPCountries');
    const countryAmountsData = amounts[countryGroupId];
    console.log(
        'hello',
        countryCode,
        currencySymbol,
        countryGroupId,
        countryAmountsData,
        selection,
    );

    // `countryAmountsData.variants[0]` will always be the control variant
    const amountsTestVariant = countryAmountsData.variants[0];
    const variantAmounts = amountsTestVariant.amounts;
    const hideChooseYourAmount = amountsTestVariant.hideChooseYourAmount;

    const trackClick = (type: 'amount' | 'frequency'): void => {
        if (submitComponentEvent) {
            submitComponentEvent({
                component: {
                    componentType: 'ACQUISITIONS_OTHER',
                    id: `contributions-epic-choice-cards-change-${type}`,
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
            amount: variantAmounts[frequency].defaultAmount,
        });
    };

    const frequencySuffix = () => {
        return {
            ONE_OFF: '',
            MONTHLY: ' per month',
            ANNUAL: ' per year',
        }[selection.frequency];
    };

    const generateChoiceCardAmountsButtons = () => {
        const requiredAmounts = variantAmounts[selection.frequency].amounts;
        const defaultAmount = variantAmounts[selection.frequency].defaultAmount;
        console.log(defaultAmount, requiredAmounts);

        // Something is wrong with the data
        if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
            return <ChoiceCard value="third" label="Other" id="third" checked={true} />;
        }

        // hideChooseYourAmount === true
        if (hideChooseYourAmount) {
            return (
                <>
                    <ChoiceCard
                        value="first"
                        label={`${currencySymbol}${requiredAmounts[0]}${frequencySuffix()}`}
                        id="first"
                        checked={selection.amount === requiredAmounts[0]}
                        onChange={() => updateAmount(requiredAmounts[0])}
                    />
                    {requiredAmounts[1] != null && (
                        <ChoiceCard
                            value="second"
                            label={`${currencySymbol}${requiredAmounts[1]}${frequencySuffix()}`}
                            id="second"
                            checked={selection.amount === requiredAmounts[1]}
                            onChange={() => updateAmount(requiredAmounts[1])}
                        />
                    )}
                    {requiredAmounts[2] != null && (
                        <ChoiceCard
                            value="third"
                            label={`${currencySymbol}${requiredAmounts[2]}${frequencySuffix()}`}
                            id="third"
                            checked={selection.amount === requiredAmounts[2]}
                            onChange={() => updateAmount(requiredAmounts[2])}
                        />
                    )}
                </>
            );
        }
        // hideChooseYourAmount === false
        else {
            return (
                <>
                    <ChoiceCard
                        value="first"
                        label={`${currencySymbol}${requiredAmounts[0]}${frequencySuffix()}`}
                        id="first"
                        checked={selection.amount === requiredAmounts[0]}
                        onChange={() => updateAmount(requiredAmounts[0])}
                    />
                    {requiredAmounts[1] != null && (
                        <ChoiceCard
                            value="second"
                            label={`${currencySymbol}${requiredAmounts[1]}${frequencySuffix()}`}
                            id="second"
                            checked={selection.amount === requiredAmounts[1]}
                            onChange={() => updateAmount(requiredAmounts[1])}
                        />
                    )}
                    <ChoiceCard
                        value="third"
                        label="Other"
                        id="third"
                        checked={selection.amount == 'other'}
                        onChange={() => updateAmount('other')}
                    />
                </>
            );
        }
    };

    return (
        <div css={container}>
            <br />
            <ChoiceCardGroup
                name="contribution-frequency"
                columns={3}
                css={[frequencyChoiceCardGroupOverrides, hideChoiceCardGroupLegend]}
                label="Contribution frequency"
            >
                <ChoiceCard
                    label="Single"
                    value="one_off"
                    id="one_off"
                    checked={selection.frequency == 'ONE_OFF'}
                    onChange={() => updateFrequency('ONE_OFF')}
                />
                <ChoiceCard
                    label="Monthly"
                    value="monthly"
                    id="monthly"
                    checked={selection.frequency == 'MONTHLY'}
                    onChange={() => updateFrequency('MONTHLY')}
                />
                <ChoiceCard
                    label="Annual"
                    value="annual"
                    id="annual"
                    checked={selection.frequency == 'ANNUAL'}
                    onChange={() => updateFrequency('ANNUAL')}
                />
            </ChoiceCardGroup>
            <br />
            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                css={hideChoiceCardGroupLegend}
            >
                {generateChoiceCardAmountsButtons()}
            </ChoiceCardGroup>
        </div>
    );
};
