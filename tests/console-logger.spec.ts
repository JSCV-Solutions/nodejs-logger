import { equal, ok } from 'node:assert';
import test from 'node:test';

import { Logger } from 'winston';

import { ConsoleLogger } from '../src/index.ts';

test('ConsoleLogger', async t => {
    await t.test('getLogger', async t => {
        await t.test('should return a logger instance', () => {
            const logger: Logger = ConsoleLogger.getLogger(
                'TestContext',
                'debug'
            );

            ok(logger, 'Logger instance should be created');
            ok(
                logger instanceof Logger,
                'Logger instance should be of type Logger'
            );
        });

        await t.test('should log messages at verbose level', () => {
            const loggingLevel = 'verbose';
            const logger: Logger = ConsoleLogger.getLogger(
                'VerboseTest',
                loggingLevel
            );

            logger.error('This is an error message.');
            logger.warn('This is a warning message.');
            logger.help('This is a help message.');
            logger.data('This is a data message.');
            logger.info('Hello world at info level!');
            logger.debug('This is a debug message.');
            logger.prompt('This is a prompt message.');
            logger.verbose('Hello world at verbose level!');
            logger.input('This is an input message that should not appear.');

            equal(
                logger.level,
                loggingLevel,
                'Logger level should be set to verbose'
            );
        });

        await t.test('should only log messages at error level', () => {
            const loggingLevel = 'error';
            const logger: Logger = ConsoleLogger.getLogger(
                'ErrorTest',
                loggingLevel
            );

            logger.error('This is an error message.');
            logger.warn('This is a warning message that should not appear.');
            logger.info('This is an info message that should not appear.');

            equal(
                logger.level,
                loggingLevel,
                'Logger level should be set to error'
            );
        });
    });
});
