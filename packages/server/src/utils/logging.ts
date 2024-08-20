import path from 'path';
import { Configuration, LoggingEvent } from 'log4js';
import { addLayout, configure, getLogger } from 'log4js';
import { isDev, isProd } from '../lib/env';

const logLocation = !isDev
    ? '/var/log/dotcom-components/dotcom-components.log'
    : `${path.resolve('logs')}/dotcom-components.log`;

const logFields = (logEvent: LoggingEvent) => {
    const fields = {
        stack: 'support',
        app: 'dotcom-components',
        stage: isProd ? 'PROD' : 'CODE',
        '@timestamp': logEvent.startTime,
        level: logEvent.level.levelStr,
        level_value: logEvent.level.level,
    };
    const data = logEvent.data[0];

    return {
        ...fields,
        ...data,
    };
};

addLayout('json', () => {
    return (logEvent) => {
        return JSON.stringify(logFields(logEvent));
    };
});

const log4jConfig = (layout: string): Configuration => ({
    appenders: {
        console: { type: 'console' },
        fileAppender: {
            type: 'file',
            filename: logLocation,
            maxLogSize: 10000000,
            backups: 5,
            compress: true,
            layout: { type: layout, separator: ',' },
            // Owner Read & Write, Group Read
            mode: 0o644,
        },
    },
    categories: {
        default: { appenders: ['fileAppender'], level: 'info' },
        production: { appenders: ['fileAppender'], level: 'info' },
        development: { appenders: ['console'], level: 'info' },
    },
    pm2: true,
});

configure(log4jConfig('json'));
export const logger = getLogger(process.env.NODE_ENV);
logger.info('Created log4j logger');

export function logInfo(message: string): void {
    logger.info({ message });
}

export function logError(message: string): void {
    logger.error({ message });
}

export function logWarn(message: string): void {
    logger.warn({ message });
}
