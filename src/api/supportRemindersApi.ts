import { isProd } from '../lib/env';

type ReminderPlatform = 'WEB' | 'AMP' | 'MMA' | 'SUPPORT';

type ReminderComponent = 'EPIC' | 'BANNER' | 'THANKYOU' | 'CANCELLATION';

type ReminderStage = 'PRE' | 'POST' | 'WINBACK';

interface BaseSignupRequest {
    email: string;
    reminderPlatform: ReminderPlatform;
    reminderComponent: ReminderComponent;
    reminderStage: ReminderStage;
    reminderPeriod: string;
    country?: string;
    reminderOption?: string;
}

const setOneOffReminderEndpoint = (): string =>
    isProd
        ? 'https://support.theguardian.com/reminders/create/one-off'
        : 'https://support.code.dev-theguardian.com/reminders/create/one-off';

export const setOneOffReminder = (signupRequest: BaseSignupRequest): Promise<Response> => {
    return fetch(setOneOffReminderEndpoint(), { body: JSON.stringify(signupRequest) });
};
