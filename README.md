# Node.js Logger

Already-configured logger for Node.js applications based on Winston.

<details>
    <summary>
        <strong>Table of contents</strong>
        (click to open)
    </summary>

- [The Reason](#the-reason)
- [Requirements](#requirements)
    - [For Development](#for-development)
- [Usage](#usage)
- [Configuration](#configuration)
    - [Configuring Global Log Level](#configuring-global-log-level)
    - [Setting Custom Log Level per Logger After Setting Up Global Log Level](#setting-custom-log-level-per-logger-after-setting-up-global-log-level)
    - [Adding File Logging](#adding-file-logging)
</details>

## The Reason

It is really annoying to set up logging for every new Node.js project
that doesn't use any framework with its built-in logger (e.g., Nest.js).

This package provides a ready-to-use logger based on Winston,
configured to log messages to the console in a consistent format
similar to Nest.js' logger (`YYYY-MM-DD HH:mm:ss     LEVEL [context] message`).

> [!WARNING]
> This project only supports console logging. If you need file logging,
> please refer to [adding file logging](#adding-file-logging).

## Requirements

- **[Node.js](https://nodejs.org/) -** Version 22.18.0 or higher
- **[Winston](https://github.com/winstonjs/winston) -** Version 3.18.3 or higher

### For Development

- [EditorConfig](https://editorconfig.org/) - Code style consistency across editors and IDEs
- [ESLint](https://eslint.org/) - Linting utility for JavaScript and TypeScript
- [PNPM](https://pnpm.io/) - Fast, disk space efficient package manager
- [Prettier](https://prettier.io/) - Code formatter

## Usage

1. Install the Node.js Logger package:

    ```bash
    # Using NPM
    npm install @jscv-solutions/node-logger

    # Using Yarn
    yarn add @jscv-solutions/node-logger

    # Using PNPM
    pnpm install @jscv-solutions/node-logger
    ```
2. Import the `ConsoleLogger` class and use its `getLogger()` method in your Node.js application:

    ```javascript
    // Using CommonJS
    const ConsoleLogger = require('@jscv-solutions/node-logger');
    const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>', '<LOG_LEVEL>');
    ```

    ```javascript

    // Using ES Modules
    import ConsoleLogger from '@jscv-solutions/node-logger';
    const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>', '<LOG_LEVEL>');
    ```

    **Note:** Replace `<COMPONENT_NAME>` with the name
    of your component (e.g., 'MyApp'), and `<LOG_LEVEL>` with the desired
    log level (e.g., 'info', 'debug', 'error').
3. Use the logger in your application:

    ```javascript
    logger.info('This is an info message'); // YYYY-MM-DD HH:mm:ss INFO [context] This is an info message
    logger.debug('This is a debug message'); // YYYY-MM-DD HH:mm:ss DEBUG [context] This is a debug message
    logger.error('This is an error message'); // YYYY-MM-DD HH:mm:ss ERROR [context] This is an error message
    ```

## Configuration

### Configuring Global Log Level

You can configure the global log level for all loggers
by setting the `LOGGING_LEVEL` environment variable
before starting your Node.js application:

```bash
export LOGGING_LEVEL='<LOG_LEVEL>'
node your-app.js
```

Replace `<LOG_LEVEL>` with the desired log level
(e.g., 'info', 'debug', 'error').

Then, you can get loggers without specifying the log level explicitly:

```javascript
// Using CommonJS
const ConsoleLogger = require('@jscv-solutions/node-logger');
const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>');
```

```javascript
// Using ES Modules
import ConsoleLogger from '@jscv-solutions/node-logger';
const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>');
```

### Setting Custom Log Level per Logger After Setting Up Global Log Level

If you want to set a custom log level for a specific logger
after configuring the global log level, you can do so as follows:

```javascript
// Using CommonJS
const ConsoleLogger = require('@jscv-solutions/node-logger');
const { transports } = require('winston');

const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>');

logger.level = '<CUSTOM_LOG_LEVEL>';
```

```javascript
// Using ES Modules
import ConsoleLogger from '@jscv-solutions/node-logger';
import { transports } from 'winston';

const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>');

logger.level = '<CUSTOM_LOG_LEVEL>';
```

### Adding File Logging

If you want to add file logging to the existing console logger,
you can add `File` transport from Winston as follows:

```javascript
// Using CommonJS
const ConsoleLogger = require('@jscv-solutions/node-logger');
const { transports } = require('winston');

const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>', '<LOG_LEVEL>');

logger.add(new transports.File({ filename: 'app.log' }));
```

```javascript
// Using ES Modules
import ConsoleLogger from '@jscv-solutions/node-logger';
import { transports } from 'winston';

const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>', '<LOG_LEVEL>');

logger.add(new transports.File({ filename: 'app.log' }));
```
