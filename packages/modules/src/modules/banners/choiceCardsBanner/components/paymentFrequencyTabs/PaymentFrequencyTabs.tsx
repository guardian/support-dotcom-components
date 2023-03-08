import React from 'react';
import { css } from '@emotion/react';
import { useEffect, useRef } from 'react';
import { PaymentFrequencyTabButtonAttributes } from './PaymentFrequencyTabButton';
import { PaymentFrequencyTabButton } from './PaymentFrequencyTabButton';
import { ContributionFrequency } from '@sdc/shared/src/types';

const tabListStyles = css`
    display: flex;
`;

export type TabProps = {
    id: ContributionFrequency;
    labelText: string;
    selected: boolean;
};

export type PaymentFrequencyTabsRenderProps = {
    ariaLabel: string;
    tabs: TabProps[];
    selectedTab: ContributionFrequency;
    onTabChange: (freq: ContributionFrequency) => void;
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
    selectedTab,
    onTabChange,
    TabController = PaymentFrequencyTabButton,
}: PaymentFrequencyTabsProps): JSX.Element {
    const isInitialMount = useRef(true);
    const tabPanel = useRef<HTMLDivElement>(null);

    // We want to auto-focus the tab panel when the tab selection changes, but not on initial mount
    // Cf. https://reactjs.org/docs/hooks-faq.html#can-i-run-an-effect-only-on-updates
    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
        } else {
            tabPanel.current?.focus();
        }
    }, [selectedTab]);

    return (
        <div>
            <div role="tablist" aria-label={ariaLabel} css={tabListStyles}>
                {tabs.map((tab: TabProps) => {
                    return (
                        <TabController
                            key={tab.id}
                            onClick={() => onTabChange(tab.id)}
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
