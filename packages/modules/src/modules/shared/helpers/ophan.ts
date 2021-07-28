import { OphanComponentEvent, OphanComponentType } from '@sdc/shared/types';

const OPHAN_COMPONENT_ID_OPT_OUT_VIEW = 'article-count-opt-out-view';
const OPHAN_COMPONENT_ID_OPT_OUT_OPEN = 'article-count-opt-out-open';
const OPHAN_COMPONENT_ID_OPT_OUT_CLOSE = 'article-count-opt-out-close';
const OPHAN_COMPONENT_ID_OPT_OUT_CONFIRM = 'article-count-opt-out-confirm';

export const ophanComponentEventOptOutView = (
    componentType: OphanComponentType,
): OphanComponentEvent => ({
    component: {
        componentType,
        id: OPHAN_COMPONENT_ID_OPT_OUT_VIEW,
    },
    action: 'VIEW',
});

export const ophanComponentEventOptOutOpen = (
    componentType: OphanComponentType,
): OphanComponentEvent => ({
    component: {
        componentType,
        id: OPHAN_COMPONENT_ID_OPT_OUT_OPEN,
    },
    action: 'CLICK',
});

export const ophanComponentEventOptOutClose = (
    componentType: OphanComponentType,
): OphanComponentEvent => ({
    component: {
        componentType,
        id: OPHAN_COMPONENT_ID_OPT_OUT_CLOSE,
    },
    action: 'CLICK',
});

export const ophanComponentEventOptOutConfirm = (
    componentType: OphanComponentType,
): OphanComponentEvent => ({
    component: {
        componentType,
        id: OPHAN_COMPONENT_ID_OPT_OUT_CONFIRM,
    },
    action: 'CLICK',
});
