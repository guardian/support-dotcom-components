import { isProd } from '../lib/env';

export type ReminderPlatform = 'WEB' | 'AMP';

export type ReminderComponent = 'EPIC' | 'BANNER';

export type ReminderStage = 'PRE' | 'POST';

interface BaseSignupRequest {
    email: string;
    reminderPlatform: ReminderPlatform;
    reminderComponent: ReminderComponent;
    reminderStage: ReminderStage;
    country?: string;
    reminderOption?: string;
}

export type OneOffSignupRequest = BaseSignupRequest & {
    reminderPeriod: string;
};

export const setOneOffReminderEndpoint = (): string =>
    isProd
        ? 'https://support.theguardian.com/reminders/create/one-off'
        : 'https://support.code.dev-theguardian.com/reminders/create/one-off';
