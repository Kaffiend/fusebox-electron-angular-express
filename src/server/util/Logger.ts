import { Logger, LoggerInstance, LoggerOptions, transports } from 'winston';
import * as SlackHook from 'winston-slack-hook';

export const logger: LoggerInstance = new Logger(<LoggerOptions>{
    exitOnError: false,
    transports: [
        new transports.Console(),
        new SlackHook({
            hookUrl: 'https://hooks.slack.com/services/vvvvvvvssssssssssssssssss',
            username: 'DERP-Bot',
            channel: '#support'
        })
    ]
});
