import path from 'path';
import { Configuration, LoggingEvent } from 'log4js';
import { addLayout, configure, getLogger } from 'log4js';
import { isDev, isProd } from '../lib/env';
import { RequestLogName } from '../middleware/logging';

const logLocation = !isDev
    ? '/var/log/dotcom-components/dotcom-components.log'
    : `${path.resolve('logs')}/dotcom-components.log`;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const logFields = (logEvent: LoggingEvent): any => {
    const fields = {
        stack: 'support',
        app: 'dotcom-components',
        stage: isProd ? 'PROD' : 'CODE',
        '@timestamp': logEvent.startTime,
        level: logEvent.level.levelStr,
        level_value: logEvent.level.level,
    };

    if (logEvent.data[0] === RequestLogName && typeof logEvent.data[1] === 'object') {
        return {
            ...fields,
            ...logEvent.data[1],
        };
    } else {
        return {
            ...fields,
            message: logEvent.data,
        };
    }
};

addLayout('json', () => {
    return logEvent => {
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
