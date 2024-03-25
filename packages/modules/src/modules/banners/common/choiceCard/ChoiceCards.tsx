import React, { useEffect } from 'react';
import { css, SerializedStyles } from '@emotion/react';
import { from, space } from '@guardian/source-foundations';
import { HasBeenSeen, useHasBeenSeen } from '../../../../hooks/useHasBeenSeen';
import { ChoiceCardInteractive } from './ChoiceCardInteractive';
import { ChoiceCardsSupportCta } from './ChoiceCardsSupportCta';
import { PaymentCards } from '../PaymentCards';
import { BannerTextContent } from '../../common/types';
import { OphanComponentEvent, SelectedAmountsVariant } from '@sdc/shared/src/types';
import type { ReactComponent } from '../../../../types';
import { ChoiceCardSelection } from '../../../shared/helpers/choiceCards';
import { ContentType } from '../../../../hooks/useChoiceCards';

export interface ChoiceCardSettings {
    buttonColour?: string;
    buttonTextColour?: string;
    buttonBorderColour?: string;
    buttonSelectColour?: string;
    buttonSelectTextColour?: string;
    buttonSelectBorderColour?: string;
}

interface ChoiceCardProps {
    selection?: ChoiceCardSelection;
    setSelectionsCallback: (choiceCardSelection: ChoiceCardSelection) => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    currencySymbol: string;
    componentId: string;
    getCtaText: (contentType: ContentType) => string;
    getCtaUrl: (contentType: ContentType) => string;
    amountsTest?: SelectedAmountsVariant;
    design?: ChoiceCardSettings;
    content?: BannerTextContent;
    cssCtaOverides?: SerializedStyles;
    onCtaClick: () => void;
    showMobilePaymentIcons?: boolean;
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
        flex-direction: column;
        gap: ${space[4]}px;
        margin-top: ${space[2]}px;
        margin-bottom: ${space[2]}px;

        > span {
            width: 100%;
        }

        ${from.desktop} {
            flex-direction: row;
            gap: 0;
            margin-bottom: 0;
            margin-top: ${space[3]}px;

            > span {
                width: auto;
            }
        }
    `,
    paymentCardsSvgOverrides: css`
        ${from.desktop} {
            margin-top: -10px;
        }
    `,
    ctaOverrides: css`
        width: 100%;
        justify-content: center;

        ${from.desktop} {
            width: auto;
        }
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
    getCtaText,
    getCtaUrl,
    cssCtaOverides,
    onCtaClick,
    showMobilePaymentIcons = false,
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

            <div css={styles.ctaAndPaymentCardsContainer}>
                <ChoiceCardsSupportCta
                    getCtaText={getCtaText}
                    getCtaUrl={getCtaUrl}
                    cssOverrides={css`
                        ${cssCtaOverides}
                        ${styles.ctaOverrides}
                    `}
                    onCtaClick={onCtaClick}
                />
                <PaymentCards
                    cssOverrides={styles.paymentCardsSvgOverrides}
                    showMobileIcons={showMobilePaymentIcons}
                />
            </div>
        </div>
    );
};
