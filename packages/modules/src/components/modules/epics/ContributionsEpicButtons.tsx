import React, { useEffect } from 'react';
import { css } from '@emotion/react';
import { space } from '@guardian/src-foundations';
import { Button } from './Button';
import { EpicVariant } from '../../../types/EpicTypes';
import { SecondaryCtaType, Tracking } from '../../../types/shared';
import { addRegionIdAndTrackingParamsToSupportUrl } from '../../../lib/tracking';
import { OphanComponentEvent } from '../../../types/OphanTypes';
import {
    getReminderViewEvent,
    OPHAN_COMPONENT_EVENT_CTAS_VIEW,
    OPHAN_COMPONENT_EVENT_REMINDER_OPEN,
} from './utils/ophan';
import { useHasBeenSeen } from '../../../hooks/useHasBeenSeen';
import { Cta } from '../../../types/shared';
import { hasSetReminder } from '../utils/reminders';

const buttonWrapperStyles = css`
    margin: ${space[6]}px ${space[2]}px ${space[1]}px 0;
    display: flex;
    flex-wrap: wrap;
    align-items: center;

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

const buttonMargins = css`
    margin: ${space[1]}px ${space[2]}px ${space[1]}px 0;
`;

const PrimaryCtaButton = ({
    cta,
    tracking,
    countryCode,
}: {
    cta?: Cta;
    tracking: Tracking;
    countryCode?: string;
}): JSX.Element | null => {
    if (!cta) {
        return null;
    }

    const buttonText = cta.text || 'Support The Guardian';
    const baseUrl = cta.baseUrl || 'https://support.theguardian.com/contribute';
    const urlWithRegionAndTracking = addRegionIdAndTrackingParamsToSupportUrl(
        baseUrl,
        tracking,
        countryCode,
    );

    return (
        <div css={buttonMargins}>
            <Button onClickAction={urlWithRegionAndTracking} showArrow>
                {buttonText}
            </Button>
        </div>
    );
};

const SecondaryCtaButton = ({
    cta,
    tracking,
    countryCode,
}: {
    cta: Cta;
    tracking: Tracking;
    countryCode?: string;
}): JSX.Element | null => {
    const url = addRegionIdAndTrackingParamsToSupportUrl(cta.baseUrl, tracking, countryCode);

    return (
        <div css={buttonMargins}>
            <Button onClickAction={url} showArrow priority="secondary">
                {cta.text}
            </Button>
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
}

export const ContributionsEpicButtons = ({
    variant,
    tracking,
    countryCode,
    onOpenReminderClick,
    submitComponentEvent,
    isReminderActive,
    isSignedIn,
}: ContributionsEpicButtonsProps): JSX.Element | null => {
    const [hasBeenSeen, setNode] = useHasBeenSeen({}, true);

    const { cta, secondaryCta, showReminderFields } = variant;

    if (!cta) {
        return null;
    }

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

    return (
        <div ref={setNode} css={buttonWrapperStyles} data-testid="epic=buttons">
            {!isReminderActive && (
                <>
                    <PrimaryCtaButton cta={cta} tracking={tracking} countryCode={countryCode} />

                    {secondaryCta?.type === SecondaryCtaType.Custom &&
                    secondaryCta.cta.baseUrl &&
                    secondaryCta.cta.text ? (
                        <SecondaryCtaButton
                            cta={secondaryCta.cta}
                            tracking={tracking}
                            countryCode={countryCode}
                        />
                    ) : (
                        secondaryCta?.type === SecondaryCtaType.ContributionsReminder &&
                        showReminderFields &&
                        !hasSetReminder() && (
                            <div css={buttonMargins}>
                                <Button onClickAction={openReminder} isTertiary>
                                    {showReminderFields.reminderCta}
                                </Button>
                            </div>
                        )
                    )}

                    <img
                        width={422}
                        height={60}
                        src="https://assets.guim.co.uk/images/acquisitions/2db3a266287f452355b68d4240df8087/payment-methods.png"
                        alt="Accepted payment methods: Visa, Mastercard, American Express and PayPal"
                        css={paymentImageStyles}
                    />
                </>
            )}
        </div>
    );
};
