import { ChoiceCardGroup, ChoiceCard } from '@guardian/src-choice-card';
import React, { useState } from 'react';
import { ChoiceCardFrequencies, EpicChoiceCardProps } from '@sdc/shared/dist/types';
import { getLocalCurrencySymbol } from '@sdc/shared/dist/lib/geolocation';

export const ContributionsEpicChoiceCards: React.FC<EpicChoiceCardProps> = ({
    amounts,
}: EpicChoiceCardProps) => {
    const [contributionFrequency, setContributionFrequency] = useState<ChoiceCardFrequencies>(
        'MONTHLY',
    );

    const currencySymbol = getLocalCurrencySymbol();

    const frequencySuffix = () => {
        return {
            SINGLE: '',
            MONTHLY: ' per month',
            ANNUAL: ' per year',
        }[contributionFrequency];
    };

    return (
        <div>
            <br />
            <ChoiceCardGroup name="contribution-frequency" columns={3}>
                <ChoiceCard
                    value="single"
                    label="Single"
                    id="single"
                    onChange={() => setContributionFrequency('SINGLE')}
                />
                <ChoiceCard
                    value="monthly"
                    label="Monthly"
                    id="monthly"
                    defaultChecked={true}
                    onChange={() => setContributionFrequency('MONTHLY')}
                />
                <ChoiceCard
                    value="annual"
                    label="Annual"
                    id="annual"
                    onChange={() => setContributionFrequency('ANNUAL')}
                />
            </ChoiceCardGroup>
            <br />
            <ChoiceCardGroup name="contribution-amount">
                <ChoiceCard
                    value="first"
                    label={`${currencySymbol}${
                        amounts[contributionFrequency][0]
                    }${frequencySuffix()}`}
                    id="first"
                />
                <ChoiceCard
                    value="second"
                    label={`${currencySymbol}${
                        amounts[contributionFrequency][1]
                    }${frequencySuffix()}`}
                    id="second"
                    defaultChecked={true}
                />
                <ChoiceCard value="third" label="Other" id="third" />
            </ChoiceCardGroup>
        </div>
    );
};
