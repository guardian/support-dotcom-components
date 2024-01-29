import React, { useEffect } from 'react';
import { ChoiceCardGroup } from '@guardian/source-react-components';
import { css, SerializedStyles } from '@emotion/react';
import { from } from '@guardian/source-foundations';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import { ChoiceCardAmountButtons } from './ChoiceCardAmountButtons';
import { ChoiceCardFrequencyTabs } from './ChoiceCardFrequencyTabs';
import { SupportCta } from './SupportCta';
import { PaymentCards } from './PaymentCards';
import { BannerTextContent } from '../../common/types';
import { ChoiceCardSelection } from '../ChoiceCardsButtonsBanner';
import {
    OphanComponentEvent,
    AmountsCardData,
    ContributionType,
    Tracking,
} from '@sdc/shared/src/types';
import type { ReactComponent } from '../../../../types';

export interface ChoiceCardSettings {
    buttonColour?: string;
}

export type ChoiceCardBannerComponentId = 'choice-cards-buttons-banner-blue';

interface ChoiceCardProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    componentId: ChoiceCardBannerComponentId;
    getCtaText: (contentType: 'mainContent' | 'mobileContent') => string;
    amounts?: AmountsCardData;
    amountsTestName?: string;
    amountsVariantName?: string;
    design?: ChoiceCardSettings;
    countryCode?: string;
    bannerTracking?: Tracking;
    numArticles?: number;
    content?: BannerTextContent;
    cssCtaOverides?: SerializedStyles;
}

const styles = {
    container: css`
        // This position: relative is necessary to stop it jumping to the top of the page when a button is clicked
        position: relative;
        max-width: 296px;

        ${from.mobile} {
            max-width: 351px;
        }

        ${from.mobileMedium} {
            max-width: 456px;
        }

        ${from.mobileLandscape} {
            max-width: 716px;
        }

        ${from.desktop} {
            min-height: 208px;
            max-width: 380px;
        }
    `,
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

    ctaAndPaymentCardsContainer: css`
        display: flex;
        align-items: center;
    `,
    paymentCardsSvgOverrides: css`
        margin-top: -10px;
    `,
};

const contributionType: ContributionType = {
    ONE_OFF: {
        label: 'One-time',
        suffix: '',
    },
    MONTHLY: {
        label: 'Monthly',
        suffix: 'per month',
    },
    ANNUAL: {
        label: 'Annual',
        suffix: 'per year',
    },
};

export const ChoiceCards: ReactComponent<ChoiceCardProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    componentId,
    amounts,
    amountsTestName = 'test_undefined',
    amountsVariantName = 'variant_undefined',
    design,
    countryCode,
    bannerTracking,
    numArticles,
    getCtaText,
    cssCtaOverides,
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
                        id: 'contributions-banner-choice-cards',
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
                    styles.bannerFrequenciesGroupOverrides,
                ]}
                label="Contribution frequency"
            >
                <ChoiceCardFrequencyTabs
                    componentId={componentId}
                    submitComponentEvent={submitComponentEvent}
                    amounts={amounts}
                    amountsButtonColours={design}
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
                    amountsButtonColours={design}
                    setSelectionsCallback={setSelectionsCallback}
                    selection={selection}
                    currencySymbol={currencySymbol}
                />
            </ChoiceCardGroup>

            {bannerTracking && (
                <div css={styles.ctaAndPaymentCardsContainer}>
                    <SupportCta
                        countryCode={countryCode}
                        tracking={bannerTracking}
                        amountsTestName={amountsTestName}
                        amountsVariantName={amountsVariantName}
                        numArticles={numArticles ?? 0}
                        selection={selection}
                        getCtaText={getCtaText}
                        cssOverrides={cssCtaOverides}
                    />
                    <PaymentCards cssOverrides={styles.paymentCardsSvgOverrides} />
                </div>
            )}
        </div>
    );
};
