import React from 'react';
import { useContributionsReminderSignup } from '../../../../hooks/useContributionsReminderSignup';
import { BannerEnrichedReminderCta } from '../../common/types';
import { CtaSettings } from '../settings';
import { DesignableBannerReminderSignedOut } from './DesignableBannerReminderSignedOut';
import { css } from '@emotion/react';
import { neutral, space } from '@guardian/source-foundations';
import { ReminderFields } from '@sdc/shared/src/lib';

export interface DesignableBannerReminderProps {
    reminderCta: BannerEnrichedReminderCta;
    trackReminderSetClick: () => void;
    setReminderCtaSettings?: CtaSettings;
    mobileReminderRef: React.RefObject<HTMLDivElement> | null;
    reminderFields: ReminderFields;
}

const styles = {
    container: css`
        grid-row: 4;
        grid-column: 1 / span 2;
        margin-top: ${space[3]}px;
        padding-bottom: ${space[5]}px;
        order: 5;
    `,

    rule: css`
        width: calc(100% + ${space[10]});
        border: 0;
        border-top: 2px solid ${neutral[0]};
        margin: 0 -${space[5]}px ${space[2]}px -${space[5]}px;
    `,
};

export function DesignableBannerReminder({
    reminderCta,
    trackReminderSetClick,
    setReminderCtaSettings,
    mobileReminderRef,
    reminderFields,
}: DesignableBannerReminderProps): JSX.Element {
    const { reminderStatus, createReminder } = useContributionsReminderSignup(
        /*reminderCta.*/ reminderFields.reminderPeriod,
        'WEB',
        'BANNER',
        'PRE',
        /*reminderCta.*/ reminderFields.reminderOption,
    );

    const onReminderSetClick = (email: string) => {
        trackReminderSetClick();
        createReminder(email);
    };

    return (
        <div ref={mobileReminderRef} css={styles.container}>
            <hr css={styles.rule} />
            <DesignableBannerReminderSignedOut
                reminderCta={reminderCta}
                reminderStatus={reminderStatus}
                onReminderSetClick={onReminderSetClick}
                setReminderCtaSettings={setReminderCtaSettings}
                reminderFields={reminderFields}
            />
        </div>
    );
}
