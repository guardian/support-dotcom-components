import React from 'react';
import {
    AmountsCardData,
    ContributionFrequency,
    OphanComponentEvent,
} from '@sdc/shared/dist/types';
import { ChoiceCardBannerComponentId } from './ChoiceCards';
import { ChoiceCardSelection } from '../ChoiceCardsButtonsBanner';
import { ChoiceCard } from '@guardian/src-choice-card';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';

const container = css`
    display: flex;

    > label {
        margin-right: ${space[2]}px !important;
        margin-bottom: ${space[3]}px !important;
        min-width: 0;
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
    setSelectionsCallback,
    selection,
}: {
    componentId: ChoiceCardBannerComponentId;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    amounts: AmountsCardData;
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
        labelText: tabFrequency === 'ONE_OFF' ? 'Single' : getRecurringLabelText(tabFrequency),
        selected: selection.frequency === tabFrequency,
    }));

    return (
        <div css={container}>
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
