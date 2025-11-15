import { config, createLogger, format, Logger, transports } from 'winston';
import type { CliConfigSetLevels } from 'winston/lib/winston/config';

const { colorize, combine, errors, label, printf, timestamp } = format;
const customFormat = printf(
    ({ level, message, label, timestamp }): string =>
        `${timestamp}     ${level} [${label}] ${message}`
);
const upperCaseLevel = format(info => {
    info.level = info.level.toUpperCase();
    return info;
});

export class ConsoleLogger {
    /**
     * Creates a Winston Logger instance with console transport,
     * which outputs colored logs to the console in the following format:
     *
     * `YYYY-MM-DD HH:mm:ss     LEVEL [context] message`
     *
     * @param context The context label for the logger.
     * @param level The logging level. - **Default:** 'info'
     */
    public static getLogger(
        context: string,
        level: keyof CliConfigSetLevels = 'info'
    ): Logger {
        return createLogger({
            format: combine(
                errors({ stack: false }),
                label({
                    label: context
                }),
                timestamp({
                    format: 'YYYY-MM-DD HH:mm:ss'
                }),
                upperCaseLevel(),
                colorize({
                    all: true
                }),
                customFormat
            ),
            level: level as string,
            levels: config.cli.levels,
            transports: [new transports.Console()]
        });
    }
}
