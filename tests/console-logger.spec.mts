import { equal, ok, strictEqual } from 'node:assert';
import { createRequire } from 'node:module';
import test, { describe } from 'node:test';

import { Logger } from 'winston';

import ConsoleLogger from '../src/index.ts';

const require = createRequire(import.meta.url);

void describe('ConsoleLogger', async () => {
    await test('should be exported as CommonJS module', () => {
        const { default: ConsoleLogger } = require('../dist/cjs/index.js');

        ok(ConsoleLogger, 'ConsoleLogger should be exported');
        strictEqual(
            typeof ConsoleLogger.getLogger,
            'function',
            'ConsoleLogger.getLogger should be a function'
        );
    });

    await test('should be exported as ES module', async () => {
        const { default: ConsoleLogger } = await import('../dist/esm/index.js');

        ok(ConsoleLogger, 'ConsoleLogger should be exported');
        strictEqual(
            typeof ConsoleLogger.getLogger,
            'function',
            'ConsoleLogger.getLogger should be a function'
        );
    });

    await describe('getLogger', async () => {
        await test('should return a logger instance', () => {
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

        await test('should log messages at verbose level', () => {
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

        await test('should only log messages at error level', () => {
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
