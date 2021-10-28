import * as z from 'zod';

export const ophanProductSchema = z.enum([
    'CONTRIBUTION',
    'MEMBERSHIP_SUPPORTER',
    'DIGITAL_SUBSCRIPTION',
    'PRINT_SUBSCRIPTION',
]);

export type OphanProduct = z.infer<typeof ophanProductSchema>;

export type OphanAction = 'CLICK' | 'VIEW' | 'INSERT';

export const ophanComponentTypeSchema = z.enum([
    'ACQUISITIONS_EPIC',
    'ACQUISITIONS_ENGAGEMENT_BANNER',
    'ACQUISITIONS_SUBSCRIPTIONS_BANNER',
    'ACQUISITIONS_HEADER',
    'ACQUISITIONS_OTHER',
]);

export type OphanComponentType = z.infer<typeof ophanComponentTypeSchema>;

export type OphanComponent = {
    componentType: OphanComponentType;
    id?: string;
    products?: OphanProduct[];
    campaignCode?: string;
    labels?: string[];
};

interface OphanAbTest {
    name: string;
    variant: string;
}

export type OphanComponentEvent = {
    component: OphanComponent;
    action: OphanAction;
    value?: string;
    id?: string;
    abTest?: OphanAbTest;
    targetingAbTest?: OphanAbTest;
};
