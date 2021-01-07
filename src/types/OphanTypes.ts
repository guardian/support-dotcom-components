export type OphanProduct =
    | 'CONTRIBUTION'
    | 'MEMBERSHIP_SUPPORTER'
    | 'DIGITAL_SUBSCRIPTION'
    | 'PRINT_SUBSCRIPTION';

export type OphanAction = 'CLICK' | 'VIEW';

export type OphanComponentType =
    | 'ACQUISITIONS_EPIC'
    | 'ACQUISITIONS_ENGAGEMENT_BANNER'
    | 'ACQUISITIONS_SUBSCRIPTIONS_BANNER';

export type OphanComponent = {
    componentType: OphanComponentType;
    id?: string;
    products?: OphanProduct[];
    campaignCode?: string;
    labels?: string[];
};

export type OphanComponentEvent = {
    component: OphanComponent;
    action: OphanAction;
    value?: string;
    id?: string;
    abTest?: {
        name: string;
        variant: string;
    };
};
