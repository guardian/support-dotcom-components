import { isProd } from '../lib/env';

export const setOneOffReminderEndpoint = (): string =>
    isProd
        ? 'https://support.theguardian.com/reminders/create/one-off'
        : 'https://support.code.dev-theguardian.com/reminders/create/one-off';
