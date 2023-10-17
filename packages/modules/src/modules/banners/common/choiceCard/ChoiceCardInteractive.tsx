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
import { space } from '@guardian/src-foundations';
import { contributionType, ChoiceCardSelection } from '../../../shared/helpers/choiceCards';
import { ChoiceCardSettings } from './ChoiceCards';
import type { ReactComponent } from '../../../../types';

const buildStyles = (design: ChoiceCardSettings | undefined) => {

    const backgroundColour = design?.buttonColour;

    return {
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
        bannerFrequenciesGroupOverrides: css`
            // display: grid;

            // ${from.tablet} {
            //     grid-template-columns: repeat(3, minmax(93px, 200px));
            // }

            // > div:first-of-type {
            //     display: inline;
            //     grid-column: 1 / span 3;
            // }
        `,
        bannerAmountsGroupOverrides: css`
            > div:first-of-type {
                display: block !important;
            }
        `,
        frequencyContainer: css`
            display: flex;

            > label {
                margin-right: ${space[2]}px !important;
                margin-bottom: ${space[3]}px !important;
                min-width: 0;
                background-color: ${backgroundColour ?? 'transparent'};
            }

            > label > div {
                padding-left: 0;
                padding-right: 0;
            }

            > label:last-of-type {
                margin-right: 0 !important;
            }
        `,
    }
}

interface ChoiceCardInteractiveProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    amountsTest: SelectedAmountsVariant;
    componentId: string;
    design?: ChoiceCardSettings;
}

export const ChoiceCardInteractive: ReactComponent<ChoiceCardInteractiveProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    amountsTest,
    componentId,
    design,
}: ChoiceCardInteractiveProps) => {
    if (!selection || !amountsTest) {
        return <></>;
    }

    const { displayContributionType = contributionTabFrequencies, amountsCardData } = amountsTest;

    if (!amountsCardData) {
        return <></>;
    }

    const style = buildStyles(design);

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
        const label = contributionType[frequency].label;
        return (
            <ChoiceCard
                key={label}
                label={label}
                value={frequency}
                id={`contributions-banner-${frequency}`}
                checked={selection.frequency === frequency}
                onChange={() => updateFrequency(frequency)}
            />
        );
    };

    const noOfContributionTabs = displayContributionType.length > 2 ? 3 : 2;

    return (
        <>
            <div css={style.frequencyContainer}>
                <ChoiceCardGroup
                    name="contribution-frequency"
                    label="Contribution frequency"
                    columns={noOfContributionTabs}
                    cssOverrides={[
                        style.hideChoiceCardGroupLegend,
                        // style.bannerFrequenciesGroupOverrides,
                    ]}
                >
                    {displayContributionType.map((f) => generateChoiceCardFrequencyTab(f))}
                </ChoiceCardGroup>
            </div>
            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                cssOverrides={[
                    style.hideChoiceCardGroupLegend, 
                    style.bannerAmountsGroupOverrides,
                ]}
                aria-labelledby={selection.frequency}
            >
                {generateChoiceCardAmountsButtons()}
            </ChoiceCardGroup>
        </>
    );
};
