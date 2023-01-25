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
    console.log('ContributionsEpicChoiceCards - amounts', amounts);
    console.log('ContributionsEpicChoiceCards - countryAmountsData', countryAmountsData);
    console.log('ContributionsEpicChoiceCards - selection', selection);

    // `countryAmountsData.variants[0]` will always be the control variant
    const amountsTestVariant = countryAmountsData.variants[0];
    const variantAmounts = amountsTestVariant.amounts;
    const hideChooseYourAmount = amountsTestVariant.hideChooseYourAmount;
    console.log('ContributionsEpicChoiceCards - amountsTestVariant', amountsTestVariant);
    console.log('ContributionsEpicChoiceCards - variantAmounts', variantAmounts);
    console.log('ContributionsEpicChoiceCards - hideChooseYourAmount', hideChooseYourAmount);

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

    const ChoiceCardAmount = ({ amount }: { amount?: number }) => {
        if (amount) {
            return (
                <ChoiceCard
                    value={`${amount}`}
                    label={`${currencySymbol}${amount}${frequencySuffix()}`}
                    id={`${amount}`}
                    checked={selection.amount === amount}
                    onChange={() => updateAmount(amount)}
                />
            );
        }
        return null;
    };

    const generateChoiceCardAmountsButtons = () => {
        const requiredAmounts = variantAmounts[selection.frequency].amounts;
        const defaultAmount = variantAmounts[selection.frequency].defaultAmount;
        console.log(defaultAmount, requiredAmounts);

        // Something is wrong with the data
        if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
            return <ChoiceCard value="third" label="Other" id="third" checked={true} />;
        }

        return (
            <>
                <ChoiceCardAmount amount={requiredAmounts[0]} />
                <ChoiceCardAmount amount={requiredAmounts[1]} />
                {hideChooseYourAmount ? (
                    <ChoiceCardAmount amount={requiredAmounts[2]} />
                ) : (
                    <ChoiceCard
                        value="other"
                        label="Other"
                        id="other"
                        checked={selection.amount == 'other'}
                        onChange={() => updateAmount('other')}
                    />
                )}
            </>
        );
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
