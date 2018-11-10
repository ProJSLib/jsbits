# Changelog for @jsbits

## \[Unreleased]

### Added

- Add .gitignore to subrepos, just to comply with best practices.
- Badges to Readme in the subrepos

### Changed

- Now the exports are named functions (useful for debugging).

### Fixed

- Wrong export in typings, now CJS build is done with TS and generates proto.
  index.d.ts had an incorrect `export`, now the CJS build is done without Rollup, which does not work with the `export =` syntax of TS.
  Also, the tests failed after a "clean" when not finding proto.js; now they are generated during the CJS build.

- escape-regex-str: Bad written example showing incorrect result.
- Issues with markdown linter.

## \[1.0.0] - 2018-11-09

First public release, with 5 functions, CI tests and 100% coverage.
