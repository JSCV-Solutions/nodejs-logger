# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.3]

### Fixed

- Added `.default` to CommonJS imports in README.md

## [1.1.2]

### Fixed

- Module resolution by adding .cjs and .mjs extensions to built files

## [1.1.1]

### Enhanced

- Tabulate logging levels without printing unnecessary spaces

## [1.1.0]

### Added

- Custom logging levels
- `SHOULD_USE_CUSTOM_LOG_LEVELS` environment variable
  to enable new custom logging levels globally

## [1.0.0]

### Added

- Utility class to create Winston-based loggers
- `LOGGING_LEVEL` environment variable to configure global logging level
