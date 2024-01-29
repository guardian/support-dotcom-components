import React from 'react';
import { css } from '@emotion/react';
import {
    PaymentFrequencyTabButtonAttributes,
    PaymentFrequencyTabButton,
} from './PaymentFrequencyTabButton';
import { ContributionFrequency } from '@sdc/shared/dist/types';

const tabListStyles = css`
    display: flex;
    position: relative;
    z-index: 10;
`;

export type TabProps = {
    id: string;
    frequency: ContributionFrequency;
    labelText: string;
    selected: boolean;
};

export type PaymentFrequencyTabsRenderProps = {
    ariaLabel: string;
    tabs: TabProps[];
    selectedTab: ContributionFrequency;
    onTabChange: (frequency: ContributionFrequency) => void;
};

export type PaymentFrequencyTabsProps = PaymentFrequencyTabsRenderProps & {
    TabController?: typeof PaymentFrequencyTabButton;
};

function getTabPanelId(tabId: string) {
    return `${tabId}-tab`;
}

function getTabControllerAttributes(tab: TabProps): PaymentFrequencyTabButtonAttributes {
    return {
        role: 'tab',
        id: tab.id,
        ariaSelected: tab.selected ? 'true' : 'false',
        ariaControls: getTabPanelId(tab.id),
    };
}

export function BannerChoiceCardsPaymentFrequencyTabs({
    ariaLabel,
    tabs,
    onTabChange,
    TabController = PaymentFrequencyTabButton,
}: PaymentFrequencyTabsProps): JSX.Element {
    return (
        <div>
            <div role="tablist" aria-label={ariaLabel} css={tabListStyles}>
                {tabs.map((tab: TabProps) => {
                    return (
                        <TabController
                            key={tab.id}
                            onClick={() => onTabChange(tab.frequency)}
                            {...getTabControllerAttributes(tab)}
                        >
                            {tab.labelText}
                        </TabController>
                    );
                })}
            </div>
        </div>
    );
}
