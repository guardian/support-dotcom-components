import React, { useEffect } from 'react';
import { ChoiceCardGroup } from '@guardian/src-choice-card';
import { css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import { neutral, space } from '@guardian/src-foundations';
import { ChoiceCardAmountButtons } from '../../../shared/choiceCard/ChoiceCardAmountButtons';
import {
    ChoiceCardFrequencyTabs,
    ContributionType,
} from '../../../shared/choiceCard/ChoiceCardFrequencyTabs';
import { SupportCta } from './SupportCta';
import { PaymentCards } from './PaymentCards';
import { BannerEnrichedCta, BannerTextContent } from '../../common/types';
import { ChoiceCardSelection } from '../ChoiceCardsBanner';
import { OphanComponentEvent, ContributionAmounts, Tracking } from '@sdc/shared/src/types';

export type ChoiceCardBannerComponentId = 'choice-cards-banner-yellow' | 'choice-cards-banner-blue';

interface ChoiceCardProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    componentId: ChoiceCardBannerComponentId;
    amounts?: ContributionAmounts;
    amountsTestName?: string;
    amountsVariantName?: string;
    countryCode?: string;
    bannerTracking?: Tracking;
    numArticles?: number;
    content?: BannerTextContent;
}

const styles = {
    container: css`
        // This position: relative is necessary to stop it jumping to the top of the page when a button is clicked
        position: relative;
        margin: ${space[3]}px 0 ${space[5]}px;
        max-width: 300px;

        ${from.mobileMedium} {
            max-width: 350px;
        }

        ${from.mobileLandscape} {
            max-width: 380px;
        }

        ${from.tablet} {
            margin: 60px 0 ${space[5]}px;
        }
    `,
    bannerFrequenciesGroupOverrides: css`
        > div:first-of-type {
            /* display: block !important; */
            /* grid-column: 1 / span 3; */
        }
    `,
    hideChoiceCardGroupLegend: css`
        legend {
            ${visuallyHidden};
        }
    `,
    bannerAmountsContainer: css`
        background: ${neutral[100]};
        border-left: 1px solid ${neutral[86]};
        border-right: 1px solid ${neutral[86]};

        > div:first-of-type {
            display: block !important;
        }
    `,

    ctaAndPaymentCardsontainer: css`
        display: flex;
        align-items: center;
        padding: 0 ${space[3]}px;
        background: ${neutral[100]};
        border-radius: 0 0 ${space[3]}px ${space[3]}px;
        border: 1px solid ${neutral[86]};
        border-top: none;
    `,
    paymentCardsSvgOverrides: css`
        margin-top: -10px;
    `,
};

const contributionType: ContributionType = {
    ONE_OFF: {
        label: 'Single',
        frequency: 'ONE_OFF',
        suffix: '',
    },
    MONTHLY: {
        label: 'Monthly',
        frequency: 'MONTHLY',
        suffix: 'per month',
    },
    ANNUAL: {
        label: 'Annual',
        frequency: 'ANNUAL',
        suffix: 'per year',
    },
};

export const ChoiceCards: React.FC<ChoiceCardProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    componentId,
    amounts,
    amountsTestName = 'test_undefined',
    amountsVariantName = 'variant_undefined',
    countryCode,
    bannerTracking,
    numArticles,
    content,
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
                        id: componentId,
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

    const getPrimaryCta = (
        contentType: 'mainContent' | 'mobileContent',
        content?: BannerTextContent,
    ): BannerEnrichedCta => {
        const primaryCtaText = content?.[contentType].primaryCta?.ctaText;
        const primaryCtaBaseUrl = content?.[contentType].primaryCta?.ctaUrl;

        return {
            ctaText: primaryCtaText ? primaryCtaText : 'undefined',
            ctaUrl: primaryCtaBaseUrl
                ? `${primaryCtaBaseUrl}?selected-contribution-type=${selection.frequency}&selected-amount=${selection.amount}`
                : '',
        };
    };

    return (
        <div ref={setNode} css={styles.container}>
            <ChoiceCardGroup
                name="contribution-frequency"
                columns={3}
                cssOverrides={styles.bannerFrequenciesGroupOverrides}
                label="Contribution frequency"
            >
                <ChoiceCardFrequencyTabs
                    componentId={componentId}
                    submitComponentEvent={submitComponentEvent}
                    amounts={amounts}
                    setSelectionsCallback={setSelectionsCallback}
                    selection={selection}
                />
            </ChoiceCardGroup>

            <ChoiceCardGroup
                name="contribution-amount"
                label="Contribution amount"
                cssOverrides={[styles.hideChoiceCardGroupLegend, styles.bannerAmountsContainer]}
                aria-labelledby={selection.frequency}
            >
                <ChoiceCardAmountButtons
                    componentId={componentId}
                    contributionType={contributionType}
                    amounts={amounts}
                    setSelectionsCallback={setSelectionsCallback}
                    selection={selection}
                    currencySymbol={currencySymbol}
                />
            </ChoiceCardGroup>

            {bannerTracking && countryCode && (
                <div css={styles.ctaAndPaymentCardsontainer}>
                    <SupportCta
                        countryCode={countryCode}
                        tracking={bannerTracking}
                        amountsTestName={amountsTestName}
                        amountsVariantName={amountsVariantName}
                        numArticles={numArticles ?? 0}
                        content={content}
                        getPrimaryCta={getPrimaryCta}
                    />
                    <PaymentCards cssOverrides={styles.paymentCardsSvgOverrides} />
                </div>
            )}
        </div>
    );
};
