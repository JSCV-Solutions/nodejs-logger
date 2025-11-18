import { config, createLogger, format, Logger, transports } from 'winston';
import type { LoggerOptions } from 'winston';
import type {
    AbstractConfigSetLevels,
    CliConfigSetLevels
} from 'winston/lib/winston/config';

type CustomLogLevels = Pick<LoggerOptions, 'levels'> & {
    colors: Record<LoggingLevels, string>;
};
type LoggingLevels = keyof CliConfigSetLevels;

const { colorize, combine, errors, label, printf, timestamp } = format;
const customFormat = printf(
    ({ level, message, label, timestamp }): string =>
        `${timestamp}     ${level} [${label}] ${message}`
);
const customLogLevels: CustomLogLevels = {
    colors: {
        error: 'red',
        warn: 'yellow',
        help: 'cyan',
        data: 'grey',
        info: 'green',
        verbose: 'cyan',
        debug: 'blue',
        prompt: 'grey',
        input: 'grey',
        silly: 'magenta'
    },
    levels: {
        error: 0,
        warn: 1,
        help: 2,
        data: 3,
        info: 4,
        verbose: 5,
        debug: 6,
        prompt: 7,
        input: 8,
        silly: 9
    }
};
const upperCaseLevel = format(info => {
    info.level = info.level.toUpperCase();
    return info;
});

export default class ConsoleLogger {
    /**
     * Creates a Winston Logger instance with console transport,
     * which outputs colored logs to the console in the following format:
     *
     * `YYYY-MM-DD HH:mm:ss     LEVEL [context] message`
     *
     * @param context The context label for the logger.
     * @param level The logging level. - **Default:** `'info'`
     * @param shouldUseCustomLogLevels Whether to use the custom built-in set of levels. - **Default:** `false`
     */
    public static getLogger(
        context: string,
        level: LoggingLevels = 'info',
        shouldUseCustomLogLevels = false
    ): Logger {
        const loggingLevel: string | undefined = process.env['LOGGING_LEVEL'];
        const loggerConfig: LoggerOptions = {
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
            level: loggingLevel || (level as string),
            levels: config.cli.levels,
            transports: [new transports.Console()]
        };
        const useCustomLogLevels: string | undefined =
            process.env['SHOULD_USE_CUSTOM_LOG_LEVELS'];

        if (shouldUseCustomLogLevels || useCustomLogLevels === 'true') {
            loggerConfig.levels =
                customLogLevels.levels as AbstractConfigSetLevels;

            return createLogger(loggerConfig);
        }

        return createLogger(loggerConfig);
    }
}
