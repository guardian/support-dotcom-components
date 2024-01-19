import React from 'react';
import {
    AmountsCardData,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { ChoiceCardBannerComponentId, ChoiceCardSettings } from './ChoiceCards';
import { ChoiceCardSelection } from '../ChoiceCardsButtonsBanner';
import { ChoiceCard } from '@guardian/src-choice-card';
import { css } from '@emotion/react';
import { space } from '@guardian/source-foundations';

const container = (backgroundColour?: string) => css`
    display: flex;

    > label {
        margin-right: ${space[2]}px !important;
        margin-bottom: ${space[3]}px !important;
        min-width: 0;
        background-color: ${backgroundColour ?? 'transparent'};
    }

    > label > div {
        padding-left: 0;
        padding-right: 0;
    }

    > label:last-of-type {
        margin-right: 0 !important;
    }
`;

export const trackClick = (
    type: 'amount' | 'frequency',
    componentId: ChoiceCardBannerComponentId,
    submitComponentEvent?: (event: OphanComponentEvent) => void,
): void => {
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

export const ChoiceCardFrequencyTabs = ({
    componentId,
    submitComponentEvent,
    amounts,
    amountsButtonColours,
    setSelectionsCallback,
    selection,
}: {
    componentId: ChoiceCardBannerComponentId;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: AmountsCardData;
    amountsButtonColours?: ChoiceCardSettings;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    selection: ChoiceCardSelection;
}): JSX.Element => {
    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency', componentId, submitComponentEvent);
        amounts &&
            setSelectionsCallback({
                frequency: frequency,
                amount: amounts[frequency].defaultAmount,
            });
    };

    const tabFrequencies: ContributionFrequency[] = ['ONE_OFF', 'MONTHLY', 'ANNUAL'];

    const getRecurringLabelText = (tabFrequency: ContributionFrequency) =>
        tabFrequency[0] + tabFrequency.slice(1).toLowerCase();

    const tabList = tabFrequencies.map((tabFrequency) => ({
        frequency: tabFrequency,
        id: `banner-${tabFrequency}`,
        labelText: tabFrequency === 'ONE_OFF' ? 'One-time' : getRecurringLabelText(tabFrequency),
        selected: selection.frequency === tabFrequency,
    }));

    return (
        <div css={container(amountsButtonColours?.buttonColour)}>
            {tabList.map((tab) => (
                <ChoiceCard
                    key={tab.id}
                    label={tab.labelText}
                    value={tab.labelText}
                    id={tab.id}
                    checked={tab.selected}
                    onChange={() => updateFrequency(tab.frequency)}
                />
            ))}
        </div>
    );
};
