# Node.js Logger

Already-configured logger for Node.js applications based on Winston.

## The Reason

It is really annoying to set up logging for every new Node.js project
that doesn't use any framework with its built-in logger (e.g., Nest.js).

This package provides a ready-to-use logger based on Winston,
configured to log messages to the console in a consistent format
similar to Nest.js' logger (`YYYY-MM-DD HH:mm:ss     level [context] message`).

> [!WARNING]
> This project only supports console logging. If you need file logging,
> please consider opening a Pull Request or using Winston directly.

## Requirements

- **[Node.js](https://nodejs.org/) -** Version 22.18.0 or higher
- **[Winston](https://github.com/winstonjs/winston) -** Version 3.18.3 or higher

## For Development

- [EditorConfig](https://editorconfig.org/) - Code style consistency across editors and IDEs
- [ESLint](https://eslint.org/) - Linting utility for JavaScript and TypeScript
- [PNPM](https://pnpm.io/) - Fast, disk space efficient package manager
- [Prettier](https://prettier.io/) - Code formatter

## Usage

1. Install Winston if you haven't already:

    ```bash
    # Using NPM
    npm install winston

    # Using Yarn
    yarn add winston

    # Using PNPM
    pnpm install winston
    ```
2. Install the Node.js Logger package:

    ```bash
    # Using NPM
    npm install @jscv-solutions/node-logger

    # Using Yarn
    yarn add @jscv-solutions/node-logger

    # Using PNPM
    pnpm install @jscv-solutions/node-logger
    ```
3. Import the `ConsoleLogger` class and use its `getLogger()` method in your Node.js application:

    ```javascript
    // Using CommonJS
    const { ConsoleLogger } = require('@jscv-solutions/node-logger');
    const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>', '<LOG_LEVEL>');
    ```

    ```javascript

    // Using ES Modules
    import { ConsoleLogger } from '@jscv-solutions/node-logger';
    const logger = ConsoleLogger.getLogger('<COMPONENT_NAME>', '<LOG_LEVEL>');
    ```

    **Note:** Replace `<COMPONENT_NAME>` with the name
    of your component (e.g., 'MyApp'), and `<LOG_LEVEL>` with the desired
    log level (e.g., 'info', 'debug', 'error').
4. Use the logger in your application:

    ```javascript
    logger.info('This is an info message'); // YYYY-MM-DD HH:mm:ss info [context] This is an info message
    logger.debug('This is a debug message'); // YYYY-MM-DD HH:mm:ss debug [context] This is a debug message
    logger.error('This is an error message'); // YYYY-MM-DD HH:mm:ss error [context] This is an error message
    ```
