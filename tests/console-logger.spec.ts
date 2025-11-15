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

            equal(
                logger.level,
                loggingLevel,
                'Logger level should be set to verbose'
            );
        });
    });
});
