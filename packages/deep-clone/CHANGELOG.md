# Changelog for @jsbits/deep-clone

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## \[Unreleased]

### Added

- Support for Symbol property names.
- Support for Error, Set, Map, and other ES6/ES7 types.
- Argument is copied as an object without prototype.
- Unsupported types are copied by reference.
- Enhance performance in some internal operations.

### Fixed

- Issues with codebeat linters.
- Fix the description to match the current behavior.

## \[1.0.1] - 2018-11-12

### Added

- Badges in the Readme.

### Fixed

- Wrong `export default` in typings, the correct one is `export =`.
- Coverage report.

## \[1.0.0] - 2018-11-09

Initial release.
