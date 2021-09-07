import React from 'react';
import { ChoiceCardGroup, ChoiceCard } from '@guardian/src-choice-card';
import {
    ChoiceCardAmounts,
    ChoiceCardFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib/geolocation';
import { css } from '@emotion/react';
import { until } from '@guardian/src-foundations/mq';

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

// This `position: relative` is necessary to stop it jumping to the top of the page when a button is clicked
const container = css`
    position: relative;
`;

export interface ChoiceCardSelection {
    frequency: ChoiceCardFrequency;
    amount: number | 'other';
}

interface EpicChoiceCardProps {
    amounts: ChoiceCardAmounts;
    selection: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    countryCode?: string;
    submitComponentEvent: (componentEvent: OphanComponentEvent) => void;
}

export const ContributionsEpicChoiceCards: React.FC<EpicChoiceCardProps> = ({
    amounts,
    selection,
    setSelectionsCallback,
    countryCode,
    submitComponentEvent,
}: EpicChoiceCardProps) => {
    const currencySymbol = getLocalCurrencySymbol(countryCode);

    const trackClick = (type: 'amount' | 'frequency'): void =>
        submitComponentEvent({
            component: {
                componentType: 'ACQUISITIONS_OTHER',
                id: `contributions-epic-choice-cards-change-${type}`,
            },
            action: 'CLICK',
        });

    const updateAmount = (amount: number | 'other') => {
        trackClick('amount');
        setSelectionsCallback({
            frequency: selection.frequency,
            amount: amount,
        });
    };

    const updateFrequency = (frequency: ChoiceCardFrequency) => {
        trackClick('frequency');
        setSelectionsCallback({
            frequency: frequency,
            amount: amounts[frequency][1],
        });
    };

    const frequencySuffix = () => {
        return {
            SINGLE: '',
            MONTHLY: ' per month',
            ANNUAL: ' per year',
        }[selection.frequency];
    };

    return (
        <div css={container}>
            <br />
            <ChoiceCardGroup
                name="contribution-frequency"
                columns={3}
                css={frequencyChoiceCardGroupOverrides}
            >
                <ChoiceCard
                    value="single"
                    label="Single"
                    id="single"
                    checked={selection.frequency == 'SINGLE'}
                    onChange={() => updateFrequency('SINGLE')}
                />
                <ChoiceCard
                    value="monthly"
                    label="Monthly"
                    id="monthly"
                    checked={selection.frequency == 'MONTHLY'}
                    onChange={() => updateFrequency('MONTHLY')}
                />
                <ChoiceCard
                    value="annual"
                    label="Annual"
                    id="annual"
                    checked={selection.frequency == 'ANNUAL'}
                    onChange={() => updateFrequency('ANNUAL')}
                />
            </ChoiceCardGroup>
            <br />
            <ChoiceCardGroup name="contribution-amount">
                <ChoiceCard
                    value="first"
                    label={`${currencySymbol}${
                        amounts[selection.frequency][0]
                    }${frequencySuffix()}`}
                    id="first"
                    checked={selection.amount == amounts[selection.frequency][0]}
                    onChange={() => updateAmount(amounts[selection.frequency][0])}
                />
                <ChoiceCard
                    value="second"
                    label={`${currencySymbol}${
                        amounts[selection.frequency][1]
                    }${frequencySuffix()}`}
                    id="second"
                    checked={selection.amount == amounts[selection.frequency][1]}
                    onChange={() => updateAmount(amounts[selection.frequency][1])}
                />
                <ChoiceCard
                    value="third"
                    label="Other"
                    id="third"
                    checked={selection.amount == 'other'}
                    onChange={() => updateAmount('other')}
                />
            </ChoiceCardGroup>
        </div>
    );
};
