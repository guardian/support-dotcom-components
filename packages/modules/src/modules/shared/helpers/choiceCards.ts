import { createInsertEventFromTracking, createViewEventFromTracking } from '@sdc/shared/src/lib';
import {
    ContributionFrequency,
    OphanComponentEvent,
    SelectedAmountsVariant,
    Tracking,
} from '@sdc/shared/src/types';
import { useState, useEffect } from 'react';
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';
import { ChoiceCardSelection } from '../../epics/ContributionsEpicChoiceCards';

export const useChoiceCardSelection = (
    choiceCardAmounts?: SelectedAmountsVariant,
): {
    choiceCardSelection?: ChoiceCardSelection;
    setChoiceCardSelection: (choiceCardSelection?: ChoiceCardSelection) => void;
} => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    useEffect(() => {
        if (choiceCardAmounts?.amounts) {
            const defaultFrequency: ContributionFrequency = 'MONTHLY';
            const localAmounts = choiceCardAmounts.amounts[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts]);

    return { choiceCardSelection, setChoiceCardSelection };
};

export const useChoiceCardsTrackingViewEvent = (
    tracking?: Tracking,
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void,
): ((el: HTMLDivElement) => void) => {
    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen && tracking) {
            // For ophan
            if (submitComponentEvent) {
                submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
            }
        }
    }, [hasBeenSeen, submitComponentEvent]);

    return setNode;
};

export const useChoiceCardsTrackingInsertEvent = (
    tracking?: Tracking,
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void,
): void => {
    useEffect(() => {
        if (submitComponentEvent && tracking) {
            submitComponentEvent(createInsertEventFromTracking(tracking, tracking.campaignCode));
        }
    }, [submitComponentEvent]);
};
