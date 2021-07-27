import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { css } from '@emotion/core';
import { buttonReaderRevenueBrandAlt } from '@guardian/src-button';
import { LinkButton } from '@guardian/src-button';
import { SvgArrowRightStraight } from '@guardian/src-icons';
import { space } from '@guardian/src-foundations';
import { neutral } from '@guardian/src-foundations/palette';
import { Button } from '@guardian/src-button';
import { BannerEnrichedSecondaryCta } from '../common/types';
import { SecondaryCtaType } from '../../../../types/shared';
import { hasSetReminder } from '../../utils/reminders';

const reminderButtonStyles = css`
    color: ${neutral[0]};
    margin-left: ${space[4]}px;
`;

export interface ContributionsBannerSecondaryCtaProps {
    secondaryCta: BannerEnrichedSecondaryCta;
    onCustomCtaClick: () => void;
    onReminderCtaClick: () => void;
}

export const ContributionsBannerSecondaryCta: React.FC<ContributionsBannerSecondaryCtaProps> = ({
    secondaryCta,
    onCustomCtaClick,
    onReminderCtaClick,
}) => {
    return (
        <>
            {secondaryCta.type === SecondaryCtaType.Custom && (
                <ThemeProvider theme={buttonReaderRevenueBrandAlt}>
                    <LinkButton
                        priority="tertiary"
                        size="small"
                        icon={<SvgArrowRightStraight />}
                        iconSide="right"
                        nudgeIcon={true}
                        onClick={onCustomCtaClick}
                        href={secondaryCta.cta.ctaUrl}
                    >
                        {secondaryCta.cta.ctaText}
                    </LinkButton>
                </ThemeProvider>
            )}

            {secondaryCta?.type === SecondaryCtaType.ContributionsReminder && !hasSetReminder() && (
                <Button
                    cssOverrides={reminderButtonStyles}
                    priority="subdued"
                    onClick={onReminderCtaClick}
                >
                    {secondaryCta.reminderFields.reminderCta}
                </Button>
            )}
        </>
    );
};
