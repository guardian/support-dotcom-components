import React, { useEffect } from 'react';
import { ChoiceCardGroup } from '@guardian/src-choice-card';
import { css } from '@emotion/react';
import { from, until } from '@guardian/src-foundations/mq';
import { visuallyHidden } from '@guardian/src-foundations/accessibility';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import {
    contributionType,
    ChoiceCardProps,
    OphanEventIdPrefix,
} from '../../../shared/helpers/choiceCards';
import { neutral, space } from '@guardian/src-foundations';
import { ChoiceCardAmountButtons } from '../../../shared/choiceCard/ChoiceCardAmountButtons';
import { ChoiceCardFrequencyTabs } from '../../../shared/choiceCard/ChoiceCardFrequencyTabs';
import { SupportCta } from './SupportCta';
import { PaymentCards } from './PaymentCards';
import { BannerEnrichedCta, BannerTextContent } from '../../common/types';

const styles = {
    container: (ophanEventIdPrefix: OphanEventIdPrefix) => css`
        // This position: relative is necessary to stop it jumping to the top of the page when a button is clicked
        position: relative;

        ${ophanEventIdPrefix === 'supporter-plus-banner' &&
            `
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
            `}
    `,
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
    `,
    paymentCardsSvgOverrides: css`
        margin-top: -10px;
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
    countryCode,
    tracking,
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
        <div ref={setNode} css={styles.container(ophanEventIdPrefix)}>
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

            {ophanEventIdPrefix === 'supporter-plus-banner' && (
                <div css={styles.ctaAndPaymentCardsontainer}>
                    <SupportCta
                        countryCode={countryCode}
                        tracking={tracking}
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
