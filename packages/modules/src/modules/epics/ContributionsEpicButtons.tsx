import React, { useEffect } from 'react';
import { SerializedStyles, css } from '@emotion/react';
import { from } from '@guardian/src-foundations/mq';
import { space } from '@guardian/src-foundations';
import { Button } from './Button';
import { EpicVariant, SecondaryCtaType, Tracking, Cta } from '@sdc/shared/types';
import { addRegionIdAndTrackingParamsToSupportUrl } from '@sdc/shared/lib';
import { OphanComponentEvent } from '@sdc/shared/types';
import {
    getReminderViewEvent,
    OPHAN_COMPONENT_EVENT_CTAS_APPLEPAY,
    OPHAN_COMPONENT_EVENT_CTAS_VIEW,
    OPHAN_COMPONENT_EVENT_REMINDER_OPEN,
} from './utils/ophan';
import { useHasBeenSeen } from '../../hooks/useHasBeenSeen';
import { hasSetReminder } from '../utils/reminders';
import { isSupportUrl } from '@sdc/shared/dist/lib';
import { ChoiceCardSelection } from './ContributionsEpicChoiceCards';
import { ApplePaySvg } from './ApplePaySvg';
import { PaymentCardSvg } from './PaymentCardsSvg';
import { ButtonApplePay } from './ButtonApplePay';

const buttonWrapperStyles = (showApplePay?: boolean): SerializedStyles => css`
    margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    ${showApplePay
        ? `flex-direction: column; margin-right: 0px; ${from.desktop} {flex-direction: row;}`
        : `flex-wrap: wrap; align-items: center;`}

    &.hidden {
        display: none;
    }
`;

const paymentImageStyles = css`
    display: inline-block;
    width: auto;
    height: 25px;
    margin: ${space[1]}px 0;
`;

const svgPositionStyles = css`
    margin: ${space[1]}px -${space[2]}px;
`;

const buttonMarginStyles = (showApplePay?: boolean): SerializedStyles => css`
    ${showApplePay
        ? `margin: ${space[1]}px; ${from.desktop} {width: 100%;}`
        : `margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;`};
`;

const reminderDesktopHideStyle = (showApplePay?: boolean): SerializedStyles => css`
    ${showApplePay ? `${from.desktop} {display: none;}` : ``};
`;

const buttonFullWidthStyle = (showApplePay?: boolean): SerializedStyles => css`
    ${showApplePay ? `width: 100%;justify-content: center;` : ``};
`;

const PrimaryCtaButton = ({
    cta,
    tracking,
    countryCode,
    amountsTestName,
    amountsVariantName,
    numArticles,
    showApplePay,
    submitComponentEvent,
}: {
    cta?: Cta;
    tracking: Tracking;
    countryCode?: string;
    amountsTestName?: string;
    amountsVariantName?: string;
    numArticles: number;
    showApplePay?: boolean;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
}): JSX.Element | null => {
    if (!cta) {
        return null;
    }

    const buttonText = showApplePay ? 'Support with' : cta.text || 'Support The Guardian';
    const baseUrl = cta.baseUrl || 'https://support.theguardian.com/contribute';
    const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
        baseUrl,
        tracking,
        numArticles,
        countryCode,
        amountsTestName,
        amountsVariantName,
    );

    const openApplePay = (): string => {
        if (submitComponentEvent) {
            submitComponentEvent(OPHAN_COMPONENT_EVENT_CTAS_APPLEPAY);
        }
        return urlWithRegionAndTracking;
    };

    return (
        <div css={buttonMarginStyles(showApplePay)}>
            {showApplePay ? (
                <ButtonApplePay
                    onClickAction={openApplePay()}
                    icon={<ApplePaySvg cssOverrides={svgPositionStyles} />}
                    priority="primary"
                >
                    {buttonText}
                </ButtonApplePay>
            ) : (
                <Button
                    onClickAction={urlWithRegionAndTracking}
                    showArrow
                    data-ignore="global-link-styling"
                >
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

const SecondaryCtaButton = ({
    cta,
    tracking,
    numArticles,
    countryCode,
    showApplePay,
}: {
    cta: Cta;
    tracking: Tracking;
    countryCode?: string;
    numArticles: number;
    showApplePay?: boolean;
}): JSX.Element | null => {
    const buttonText = showApplePay ? 'Support with' : cta.text;
    const url = addRegionIdAndTrackingParamsToSupportUrl(
        cta.baseUrl,
        tracking,
        numArticles,
        countryCode,
    );
    return (
        <div css={buttonMarginStyles(showApplePay)}>
            {showApplePay ? (
                <ButtonApplePay
                    onClickAction={url}
                    icon={<PaymentCardSvg cssOverrides={svgPositionStyles} />}
                    priority="secondary"
                >
                    {buttonText}
                </ButtonApplePay>
            ) : (
                <Button onClickAction={url} showArrow priority="secondary">
                    {buttonText}
                </Button>
            )}
        </div>
    );
};

interface ContributionsEpicButtonsProps {
    variant: EpicVariant;
    tracking: Tracking;
    countryCode?: string;
    onOpenReminderClick: () => void;
    submitComponentEvent?: (event: OphanComponentEvent) => void;
    isReminderActive: boolean;
    isSignedIn: boolean;
    showChoiceCards?: boolean;
    amountsTestName?: string;
    amountsVariantName?: string;
    choiceCardSelection?: ChoiceCardSelection;
    numArticles: number;
    showApplePay?: boolean;
}

export const ContributionsEpicButtons = ({
    variant,
    tracking,
    countryCode,
    onOpenReminderClick,
    submitComponentEvent,
    isReminderActive,
    isSignedIn,
    showChoiceCards,
    choiceCardSelection,
    amountsTestName,
    amountsVariantName,
    numArticles,
    showApplePay,
}: ContributionsEpicButtonsProps): JSX.Element | null => {
    const [hasBeenSeen, setNode] = useHasBeenSeen({}, true);
    const { cta, secondaryCta, showReminderFields } = variant;

    if (!cta) {
        return null;
    }

    const getCta = (cta: Cta): Cta =>
        showChoiceCards && choiceCardSelection
            ? {
                  text: cta.text,
                  baseUrl: `${cta.baseUrl}?selected-contribution-type=${choiceCardSelection.frequency}&selected-amount=${choiceCardSelection.amount}`,
              }
            : cta;

    useEffect(() => {
        if (hasBeenSeen && submitComponentEvent) {
            submitComponentEvent(OPHAN_COMPONENT_EVENT_CTAS_VIEW);

            if (showReminderFields && !hasSetReminder()) {
                submitComponentEvent(getReminderViewEvent(isSignedIn));
            }
        }
    }, [hasBeenSeen]);

    const openReminder = () => {
        if (submitComponentEvent) {
            submitComponentEvent(OPHAN_COMPONENT_EVENT_REMINDER_OPEN);
        }
        onOpenReminderClick();
    };

    const hasSupportCta =
        isSupportUrl(cta.baseUrl) ||
        (secondaryCta?.type === SecondaryCtaType.Custom && isSupportUrl(secondaryCta.cta.baseUrl));

    return (
        <div ref={setNode} css={buttonWrapperStyles(showApplePay)} data-testid="epic=buttons">
            {!isReminderActive && (
                <>
                    <PrimaryCtaButton
                        cta={getCta(cta)}
                        tracking={tracking}
                        numArticles={numArticles}
                        amountsTestName={amountsTestName}
                        amountsVariantName={amountsVariantName}
                        countryCode={countryCode}
                        showApplePay={showApplePay}
                        submitComponentEvent={submitComponentEvent}
                    />
                    {showApplePay && (
                        <SecondaryCtaButton
                            cta={getCta(cta)}
                            tracking={tracking}
                            countryCode={countryCode}
                            numArticles={numArticles}
                            showApplePay={showApplePay}
                        />
                    )}

                    {secondaryCta?.type === SecondaryCtaType.Custom &&
                    secondaryCta.cta.baseUrl &&
                    !showApplePay &&
                    secondaryCta.cta.text ? (
                        <SecondaryCtaButton
                            cta={secondaryCta.cta}
                            tracking={tracking}
                            countryCode={countryCode}
                            numArticles={numArticles}
                            showApplePay={showApplePay}
                        />
                    ) : (
                        secondaryCta?.type === SecondaryCtaType.ContributionsReminder &&
                        showReminderFields &&
                        !hasSetReminder() && (
                            <div
                                css={[
                                    buttonMarginStyles(showApplePay),
                                    reminderDesktopHideStyle(showApplePay),
                                ]}
                            >
                                <Button
                                    onClickAction={openReminder}
                                    isTertiary
                                    cssOverrides={buttonFullWidthStyle(showApplePay)}
                                >
                                    {showReminderFields.reminderCta}
                                </Button>
                            </div>
                        )
                    )}

                    {hasSupportCta && !showApplePay && (
                        <img
                            width={422}
                            height={60}
                            src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                            alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                            css={paymentImageStyles}
                        />
                    )}
                </>
            )}
        </div>
    );
};
