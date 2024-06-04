import React from 'react';
import { css } from '@emotion/react';
import { neutral, space, from } from '@guardian/source/foundations';
import { Button, LinkButton } from '@guardian/source/react-components';
import { SecondaryCtaType } from '@sdc/shared/types';
import { BannerRenderedContent } from '../../common/types';
import { PaymentCards } from '../../common/PaymentCards';
import { buttonStyles } from '../styles/buttonStyles';
import { CtaSettings } from '../settings';

interface MomentTemplateBannerCtasProps {
    mainOrMobileContent: BannerRenderedContent;
    onPrimaryCtaClick: () => void;
    onSecondaryCtaClick: () => void;
    onReminderCtaClick: () => void;
    primaryCtaSettings: CtaSettings;
    secondaryCtaSettings: CtaSettings;
}

export function MomentTemplateBannerCtas({
    mainOrMobileContent,
    onPrimaryCtaClick,
    onSecondaryCtaClick,
    onReminderCtaClick,
    primaryCtaSettings,
    secondaryCtaSettings,
}: MomentTemplateBannerCtasProps): JSX.Element {
    const { primaryCta, secondaryCta } = mainOrMobileContent;

    return (
        <div>
            <div css={styles.ctasContainer}>
                {primaryCta && (
                    <LinkButton
                        href={primaryCta?.ctaUrl}
                        onClick={onPrimaryCtaClick}
                        size="small"
                        priority="primary"
                        cssOverrides={buttonStyles(primaryCtaSettings)}
                    >
                        {primaryCta?.ctaText}
                    </LinkButton>
                )}

                {secondaryCta?.type === SecondaryCtaType.Custom && (
                    <LinkButton
                        href={secondaryCta?.cta.ctaUrl}
                        onClick={onSecondaryCtaClick}
                        size="small"
                        priority="tertiary"
                        cssOverrides={buttonStyles(secondaryCtaSettings)}
                    >
                        {secondaryCta.cta.ctaText}
                    </LinkButton>
                )}

                {secondaryCta?.type === SecondaryCtaType.ContributionsReminder && (
                    <Button
                        priority="subdued"
                        onClick={onReminderCtaClick}
                        cssOverrides={styles.reminderCta}
                    >
                        Remind me later
                    </Button>
                )}
            </div>

            <div>{primaryCta && <PaymentCards />}</div>
        </div>
    );
}

const styles = {
    ctasContainer: css`
        display: flex;
        flex-wrap: wrap;

        & a {
            margin-bottom: ${space[2]}px;
        }
        & a:not(:last-child) {
            margin-right: ${space[3]}px;
        }
    `,
    paymentMethods: css`
        display: block;
        height: 1.1rem;
        width: auto;
        margin-left: ${space[1]}px;

        ${from.tablet} {
            margin-left: ${space[2]}px;
            height: 1.25rem;
        }
    `,
    reminderCta: css`
        color: ${neutral[0]};
    `,
};
