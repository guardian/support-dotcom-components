import { OphanComponentEvent } from '../../../../types/OphanTypes';

const OPHAN_COMPONENT_ID_REMINDER_VIEW = 'contributions-epic-reminder-view';
const OPHAN_COMPONENT_ID_REMINDER_OPEN = 'contributions-epic-reminder-open';
const OPHAN_COMPONENT_ID_REMINDER_SET = 'contributions-epic-reminder-set';
const OPHAN_COMPONENT_ID_REMINDER_CLOSE = 'contributions-epic-reminder-close';

export const getReminderViewEvent = (isSignedIn: boolean): OphanComponentEvent => ({
    component: {
        componentType: 'ACQUISITIONS_OTHER',
        id: OPHAN_COMPONENT_ID_REMINDER_VIEW,
    },
    action: 'VIEW',
    value: isSignedIn.toString(),
});

export const OPHAN_COMPONENT_EVENT_REMINDER_OPEN: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_OTHER',
        id: OPHAN_COMPONENT_ID_REMINDER_OPEN,
    },
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_REMINDER_SET: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_OTHER',
        id: OPHAN_COMPONENT_ID_REMINDER_SET,
    },
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_REMINDER_CLOSE: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_OTHER',
        id: OPHAN_COMPONENT_ID_REMINDER_CLOSE,
    },
    action: 'CLICK',
};
