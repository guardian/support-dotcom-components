import React, { useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import { ChoiceCardInteractive } from './ChoiceCardInteractive';
import { SupportCta } from './SupportCta';
import { PaymentCards } from '../PaymentCards';
import { BannerTextContent } from '../../common/types';
import { OphanComponentEvent, SelectedAmountsVariant, Tracking } from '@sdc/shared/src/types';
import type { ReactComponent } from '../../../../types';
import { ChoiceCardSelection } from '../../../shared/helpers/choiceCards';

export interface ChoiceCardSettings {
    buttonColour?: string;
}

interface ChoiceCardProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    componentId: string;
    getCtaText: (contentType: 'mainContent' | 'mobileContent') => string;
    amountsTest?: SelectedAmountsVariant;
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
    ctaAndPaymentCardsContainer: css`
        display: flex;
        align-items: center;
    `,
    paymentCardsSvgOverrides: css`
        margin-top: -10px;
    `,
};

export const ChoiceCards: ReactComponent<ChoiceCardProps> = ({
    selection,
    setSelectionsCallback,
    submitComponentEvent,
    currencySymbol,
    componentId,
    amountsTest,
    design,
    countryCode,
    bannerTracking,
    numArticles,
    getCtaText,
    cssCtaOverides,
}: ChoiceCardProps) => {
    if (!selection || !amountsTest) {
        return <></>;
    }

    const [hasBeenSeen, setNode] = useHasBeenSeen({ threshold: 0 }, true) as HasBeenSeen;

    const { testName, variantName } = amountsTest;

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
                        name: testName,
                        variant: variantName,
                    },
                });
            }
        }
    }, [hasBeenSeen, submitComponentEvent]);

    return (
        <div ref={setNode} css={styles.container}>
            <ChoiceCardInteractive
                design={design}
                selection={selection}
                setSelectionsCallback={setSelectionsCallback}
                submitComponentEvent={submitComponentEvent}
                currencySymbol={currencySymbol}
                amountsTest={amountsTest}
                componentId={componentId}
            />

            {bannerTracking && (
                <div css={styles.ctaAndPaymentCardsContainer}>
                    <SupportCta
                        countryCode={countryCode}
                        tracking={bannerTracking}
                        amountsTestName={testName}
                        amountsVariantName={variantName}
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
