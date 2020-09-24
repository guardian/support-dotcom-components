import { OphanComponentEvent } from '../../../../../types/OphanTypes';

const OPHAN_COMPONENT_ID_READ_PLEDGE = 'environment-moment-2020-read-pledge';
const OPHAN_COMPONENT_ID_CONTRIBUTE = 'environment-moment-2020-contribute';
const OPHAN_COMPONENT_ID_HEAR_FROM_OUR_EDITOR = 'environment-moment-2020-hear-from-our-editor';
const OPHAN_COMPONENT_ID_CLOSE = 'environment-moment-2020-close';

export const OPHAN_COMPONENT_EVENT_READ_PLEDGE_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    },
    id: OPHAN_COMPONENT_ID_READ_PLEDGE,
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_CONTRIBUTE_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    },
    id: OPHAN_COMPONENT_ID_CONTRIBUTE,
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_HEAR_FROM_OUR_EDITOR_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    },
    id: OPHAN_COMPONENT_ID_HEAR_FROM_OUR_EDITOR,
    action: 'CLICK',
};

export const OPHAN_COMPONENT_EVENT_CLOSE_CLICK: OphanComponentEvent = {
    component: {
        componentType: 'ACQUISITIONS_ENGAGEMENT_BANNER',
    },
    id: OPHAN_COMPONENT_ID_CLOSE,
    action: 'CLICK',
};
