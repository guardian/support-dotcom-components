import {
    createInsertEventFromTracking,
    createViewEventFromTracking,
    logEpicView,
} from '@sdc/shared/src/lib';
import {
    ContributionFrequency,
    OphanComponentEvent,
    SelectedAmountsVariant,
    Stage,
    Tracking,
} from '@sdc/shared/src/types';
import { useState, useEffect } from 'react';
import { HasBeenSeen, useHasBeenSeen } from '../../../hooks/useHasBeenSeen';
import { ChoiceCardSelection } from '../../epics/ContributionsEpicChoiceCards';
import { isProd } from './stage';

export const useChoiceCardSelection = (
    choiceCardAmounts?: SelectedAmountsVariant,
    showChoiceCards?: boolean,
    defaultChoiceCardFrequency?: ContributionFrequency,
): {
    choiceCardSelection?: ChoiceCardSelection;
    setChoiceCardSelection: (choiceCardSelection?: ChoiceCardSelection) => void;
} => {
    const [choiceCardSelection, setChoiceCardSelection] = useState<
        ChoiceCardSelection | undefined
    >();

    useEffect(() => {
        if (choiceCardAmounts?.amounts && (showChoiceCards ?? true)) {
            const defaultFrequency: ContributionFrequency = defaultChoiceCardFrequency ?? 'MONTHLY';
            const localAmounts = choiceCardAmounts.amounts[defaultFrequency];
            const defaultAmount = localAmounts.defaultAmount || localAmounts.amounts[1] || 1;

            setChoiceCardSelection({
                frequency: defaultFrequency,
                amount: defaultAmount,
            });
        }
    }, [choiceCardAmounts, showChoiceCards]);

    return { choiceCardSelection, setChoiceCardSelection };
};

export const useChoiceCardsTrackingViewEvent = (
    tracking?: Tracking,
    submitComponentEvent?: (componentEvent: OphanComponentEvent) => void,
    countryCode?: string,
    stage?: Stage,
): ((el: HTMLDivElement) => void) => {
    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen && tracking) {
            // For ophan
            if (submitComponentEvent) {
                submitComponentEvent(createViewEventFromTracking(tracking, tracking.campaignCode));
            }

            // Props passed to hook in the epic
            if (countryCode && stage) {
                // For the epic view count
                logEpicView(tracking.abTestName);

                // For the epic event stream
                sendEpicViewEvent(tracking.referrerUrl, countryCode, stage);
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

const sendEpicViewEvent = (url: string, countryCode?: string, stage?: Stage): void => {
    const path = 'events/epic-view';
    const host = isProd(stage)
        ? 'https://contributions.guardianapis.com'
        : 'https://contributions.code.dev-guardianapis.com';
    const body = JSON.stringify({
        url,
        countryCode,
    });

    fetch(`${host}/${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body,
    }).then(response => {
        if (!response.ok) {
            console.log('Epic view event request failed', response);
        }
    });
};
