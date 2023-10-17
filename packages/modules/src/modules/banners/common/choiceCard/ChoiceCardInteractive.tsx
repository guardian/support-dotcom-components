import React from 'react';
import { ChoiceCardGroup, ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionFrequency,
    SelectedAmountsVariant,
    contributionTabFrequencies,
    OphanComponentEvent,
} from '@sdc/shared/types';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { contributionType, ChoiceCardSelection } from '../../../shared/helpers/choiceCards';
import type { ReactComponent } from '../../../../types';

const styles = {
    bannerFrequenciesGroupOverrides: css`
        display: grid;

        ${from.tablet} {
            grid-template-columns: repeat(3, minmax(93px, 200px));
        }

        > div:first-of-type {
            display: inline;
            grid-column: 1 / span 3;
        }
    `,
    hideChoiceCardGroupLegend: css`
        label {
            border-radius: 10px;
        }
        legend {
            position: absolute;
            overflow: hidden; /* gets rid of horizontal scrollbar that appears in some circumstances */
            white-space: nowrap; /* The white-space property forces the content to render on one line. */
            width: 1px; /* ensures content is announced by VoiceOver. */
            height: 1px; /* ensures content is announced by VoiceOver. */
            margin: -1px; /* hide or clip content that does not fit into a 1-pixel visible area. */
            padding: 0; /* hide or clip content that does not fit into a 1-pixel visible area. */
            border: 0;
            clip: rect(1px, 1px, 1px, 1px); /* clip removes any visible trace of the element */
            -webkit-clip-path: inset(50%); /* clip removes any visible trace of the element */
            clip-path: inset(50%); /* clip removes any visible trace of the element */
        }
    `,
    bannerAmountsContainer: css`
        > div:first-of-type {
            display: block !important;
        }
    `,
};

interface ChoiceCardInteractiveProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    amountsTest: SelectedAmountsVariant;
    componentId: string;
}

export const ChoiceCardInteractive: ReactComponent<ChoiceCardInteractiveProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    amountsTest,
    componentId,
}: ChoiceCardInteractiveProps) => {
    if (!selection || !amountsTest) {
        return <></>;
    }

    const {
        displayContributionType = contributionTabFrequencies,
        amountsCardData,
    } = amountsTest;

    if (!amountsCardData) {
        return <></>;
    }

    const trackClick = (type: 'amount' | 'frequency'): void => {
        if (submitComponentEvent) {
            submitComponentEvent({
                component: {
                    componentType: 'ACQUISITIONS_OTHER',
                    id: `${componentId}-change-${type}`,
                },
                action: 'CLICK',
            });
        }
    };

    const updateAmount = (amount: number | 'other') => {
        trackClick('amount');
        setSelectionsCallback({
            frequency: selection.frequency,
            amount: amount,
        });
    };

    const updateFrequency = (frequency: ContributionFrequency) => {
        trackClick('frequency');
        setSelectionsCallback({
            frequency: frequency,
            amount: amountsCardData[frequency].defaultAmount,
        });
    };

    const ChoiceCardAmount = ({ amount }: { amount?: number }) => {
        if (amount) {
            return (
                <ChoiceCard
                    value={`${amount}`}
                    label={`${currencySymbol}${amount} ${
                        contributionType[selection.frequency].suffix
                    }`}
                    id={`contributions-banner-${amount}`}
                    checked={selection.amount === amount}
                    onChange={() => updateAmount(amount)}
                />
            );
        }
        return null;
    };

    const generateChoiceCardAmountsButtons = () => {
        const productData = amountsCardData[selection.frequency];
        const requiredAmounts = productData.amounts;
        const hideChooseYourAmount = productData.hideChooseYourAmount ?? false;

        // Something is wrong with the data
        if (!Array.isArray(requiredAmounts) || !requiredAmounts.length) {
            return (
                <ChoiceCard
                    value="third"
                    label="Other"
                    id="contributions-banner-third"
                    checked={true}
                />
            );
        }

        return (
            <>
                <ChoiceCardAmount amount={requiredAmounts[0]} />
                <ChoiceCardAmount amount={requiredAmounts[1]} />
                {hideChooseYourAmount ? (
                    <ChoiceCardAmount amount={requiredAmounts[2]} />
                ) : (
                    <ChoiceCard
                        value="other"
                        label="Other"
                        id="contributions-banner-other"
                        checked={selection.amount == 'other'}
                        onChange={() => updateAmount('other')}
                    />
                )}
            </>
        );
    };

    const generateChoiceCardFrequencyTab = (frequency: ContributionFrequency) => {
        return (
            <ChoiceCard
                label={contributionType[frequency].label}
                value={frequency}
                id={`contributions-banner-${frequency}`}
                checked={selection.frequency === frequency}
                onChange={() => updateFrequency(frequency)}
            />
        );
    };

    return (
        <div>
            <ChoiceCardGroup
                name="contribution-frequency"
                cssOverrides={[
                    styles.hideChoiceCardGroupLegend,
                    styles.bannerFrequenciesGroupOverrides,
                ]}
                label="Contribution frequency"
            >
                {displayContributionType.map((f) => generateChoiceCardFrequencyTab(f))}
            </ChoiceCardGroup>
            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                cssOverrides={[styles.hideChoiceCardGroupLegend, styles.bannerAmountsContainer]}
                aria-labelledby={selection.frequency}
            >
                {generateChoiceCardAmountsButtons()}
            </ChoiceCardGroup>
        </div>
    );
};
