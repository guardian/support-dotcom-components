import React, { useEffect } from 'react';
import { ChoiceCardGroup, ChoiceCard } from '@guardian/src-choice-card';
import {
    ContributionFrequency,
    SelectedAmountsVariant,
    contributionTabFrequencies,
    OphanComponentEvent,
} from '@sdc/shared/types';
import { css } from '@emotion/react';
import { until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { HasBeenSeen, useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { contributionType, ChoiceCardSelection } from '../shared/helpers/choiceCards';
import type { ReactComponent } from '../../types';

// CSS Styling
// -------------------------------------------
const frequencyChoiceCardGroupOverrides = css`
    ${until.mobileLandscape} {
        > div {
            display: flex !important;
        }

        > div label:nth-of-type(2) {
            margin-left: 4px !important;
            margin-right: 4px !important;
        }
    }
`;

const hideChoiceCardGroupLegend = css`
    legend {
        ${visuallyHidden};
    }
`;

// This `position: relative` is necessary to stop it jumping to the top of the page when a button is clicked
const container = css`
    position: relative;
`;

// ContributionsEpicChoiceCards - exported component
// -------------------------------------------
interface EpicChoiceCardProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    amountsTest: SelectedAmountsVariant;
}

export const ContributionsEpicChoiceCards: ReactComponent<EpicChoiceCardProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    amountsTest,
}: EpicChoiceCardProps) => {
    if (!selection || !amountsTest) {
        return <></>;
    }

    const {
        testName = 'test_undefined',
        variantName = 'variant_undefined',
        displayContributionType = contributionTabFrequencies,
        amountsCardData,
    } = amountsTest;

    if (!amountsCardData) {
        return <></>;
    }

    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    useEffect(() => {
        if (hasBeenSeen) {
            // For ophan
            if (submitComponentEvent) {
                submitComponentEvent({
                    component: {
                        componentType: 'ACQUISITIONS_OTHER',
                        id: 'contributions-epic-choice-cards',
                    },
                    action: 'VIEW',
                    abTest: {
                        name: testName,
                        variant: variantName,
                    },
                });
            }
        }
    }, [hasBeenSeen, submitComponentEvent]);

    const trackClick = (type: 'amount' | 'frequency'): void => {
        if (submitComponentEvent) {
            submitComponentEvent({
                component: {
                    componentType: 'ACQUISITIONS_OTHER',
                    id: `contributions-epic-choice-cards-change-${type}`,
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
                    id={`contributions-epic-${amount}`}
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
                    id="contributions-epic-third"
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
                        id="contributions-epic-other"
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
                id={`contributions-epic-${frequency}`}
                checked={selection.frequency === frequency}
                onChange={() => updateFrequency(frequency)}
            />
        );
    };

    return (
        <div ref={setNode} css={container}>
            <br />
            <ChoiceCardGroup
                name="contribution-frequency"
                css={[frequencyChoiceCardGroupOverrides, hideChoiceCardGroupLegend]}
                label="Contribution frequency"
            >
                {displayContributionType.map((f) => generateChoiceCardFrequencyTab(f))}
            </ChoiceCardGroup>
            <br />
            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                css={hideChoiceCardGroupLegend}
            >
                {generateChoiceCardAmountsButtons()}
            </ChoiceCardGroup>
        </div>
    );
};
