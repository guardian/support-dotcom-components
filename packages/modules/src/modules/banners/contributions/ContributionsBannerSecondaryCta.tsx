import React from 'react';
import { ThemeProvider } from '@emotion/react';
import { css } from '@emotion/react';
import { buttonReaderRevenueBrandAlt } from '@guardian/source-react-components';
import { LinkButton } from '@guardian/source-react-components';
import { SvgArrowRightStraight } from '@guardian/source-react-components';
import { space } from '@guardian/source-foundations';
import { neutral } from '@guardian/source-foundations';
import { Button } from '@guardian/source-react-components';
import { BannerEnrichedSecondaryCta } from '../common/types';
import { SecondaryCtaType } from '@sdc/shared/types';
import { hasSetReminder } from '../../utils/reminders';
import type { ReactComponent } from '../../../types';

const reminderButtonStyles = css`
    color: ${neutral[0]};
    margin-left: ${space[4]}px;
`;

export interface ContributionsBannerSecondaryCtaProps {
    secondaryCta: BannerEnrichedSecondaryCta;
    onCustomCtaClick: () => void;
    onReminderCtaClick: () => void;
}

export const ContributionsBannerSecondaryCta: ReactComponent<
    ContributionsBannerSecondaryCtaProps
> = ({ secondaryCta, onCustomCtaClick, onReminderCtaClick }) => {
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
