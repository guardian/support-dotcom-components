import React, { useEffect } from 'react';
import { ChoiceCardGroup } from '@guardian/src-choice-card';
import { css } from '@emotion/react';
import { until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import { contributionType, ChoiceCardProps } from '../../../shared/helpers/choiceCards';
import { space } from '@guardian/src-foundations';
import { ChoiceCardAmountButtons } from '../../../shared/choiceCard/ChoiceCardAmountButtons';
import { ChoiceCardFrequencyTabs } from '../../../shared/choiceCard/ChoiceCardFrequencyTabs';

const styles = {
    epicFrequenciesGroupOverrides: css`
        margin: ${space[5]}px 0 ${space[5]}px;

        ${until.mobileLandscape} {
            > div {
                display: flex !important;
            }

            > div label:nth-of-type(2) {
                margin-left: 4px !important;
                margin-right: 4px !important;
            }
        }
    `,
    bannerFrequenciesGroupOverrides: css`
        > div:first-of-type {
            display: block !important;
        }
    `,
    hideChoiceCardGroupLegend: css`
        legend {
            ${visuallyHidden};
        }
    `,
    bannerAmountsContainer: css`
        > div:first-of-type {
            display: block !important;
        }
    `,
    // This `position: relative` is necessary to stop it jumping to the top of the page when a button is clicked
    container: css`
        position: relative;
    `,
};

export const ChoiceCards: React.FC<ChoiceCardProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    ophanEventIdPrefix,
    amounts,
    amountsTestName = 'test_undefined',
    amountsVariantName = 'variant_undefined',
}: ChoiceCardProps) => {
    if (!selection || !amounts) {
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
                        id: `${ophanEventIdPrefix}-choice-cards`,
                    },
                    action: 'VIEW',
                    abTest: {
                        name: amountsTestName,
                        variant: amountsVariantName,
                    },
                });
            }
        }
    }, [hasBeenSeen, submitComponentEvent]);

    return (
        <div ref={setNode} css={styles.container}>
            <ChoiceCardGroup
                name="contribution-frequency"
                columns={3}
                cssOverrides={[
                    styles.hideChoiceCardGroupLegend,
                    ophanEventIdPrefix === 'supporter-plus-banner'
                        ? styles.bannerFrequenciesGroupOverrides
                        : styles.epicFrequenciesGroupOverrides,
                ]}
                label="Contribution frequency"
            >
                <ChoiceCardFrequencyTabs
                    ophanEventIdPrefix={ophanEventIdPrefix}
                    contributionType={contributionType}
                    submitComponentEvent={submitComponentEvent}
                    amounts={amounts}
                    setSelectionsCallback={setSelectionsCallback}
                    selection={selection}
                />
            </ChoiceCardGroup>

            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                cssOverrides={[
                    styles.hideChoiceCardGroupLegend,
                    ophanEventIdPrefix === 'supporter-plus-banner'
                        ? styles.bannerAmountsContainer
                        : css``,
                ]}
                aria-labelledby={selection.frequency}
            >
                <ChoiceCardAmountButtons
                    ophanEventIdPrefix={ophanEventIdPrefix}
                    contributionType={contributionType}
                    amounts={amounts}
                    setSelectionsCallback={setSelectionsCallback}
                    selection={selection}
                    currencySymbol={currencySymbol}
                />
            </ChoiceCardGroup>
        </div>
    );
};
