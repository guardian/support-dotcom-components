import { OphanComponentEvent } from '../../../../../types/OphanTypes';

const OPHAN_COMPONENT_ID_CONTRIBUTE = 'global-eoy-2020-contribute';
const OPHAN_COMPONENT_ID_NOT_NOW = 'global-eoy-2020-not-now';
const OPHAN_COMPONENT_ID_READ_MORE = 'global-eoy-2020-read-more';
const OPHAN_COMPONENT_ID_CLOSE = 'global-eoy-2020-close';

export const OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        id: OPHAN_COMPONENT_ID_CONTRIBUTE,
    },
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_NOT_NOW_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        id: OPHAN_COMPONENT_ID_NOT_NOW,
    },
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_READ_MORE_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        id: OPHAN_COMPONENT_ID_READ_MORE,
    },
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_CLOSE_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
        id: OPHAN_COMPONENT_ID_CLOSE,
    },
    action: 'CLICK',
};
