# Changelog for @jsbits

## \[Unreleased]

### Added

- Add .gitignore to subrepos, just to comply with best practices.
- Badges to Readme in the subrepos
- Typings to the prototype methods, if required.
- Support for replacements with unescaped strings in the wrappers.

### Changed

- Now the exports are named functions (useful for debugging).

- add-months: proto.js injects the setters `addMonths` and `addUTCMonths`.

  This goes more according to how the rest of the `Date.prototype` methods work. Because the 1.0 is a version without diffusion, the change is made in the minor version.

- Test for Date.prototype.addMonths now works w/the new specs.

- add-months: Only works with Date and number types.

  The behavior of the Date constructor with a string parameter is inconsistent, ven in node.js (v6 _always_ treat full ISO without timezone as UTC).

### Fixed

- Wrong export in typings, now CJS build is done with TS and generates proto.

  index.d.ts had an incorrect `export`, now the CJS build is done without Rollup, which does not work with the `export =` syntax of TS.
  Also, the tests failed after a "clean" when not finding proto.js; now they are generated during the CJS build.

- escape-regex-str: Bad written example, showing incorrect result.

- Issues with markdown linter.

- Coverage reports working.

- Examples of add-months

## \[1.0.0] - 2018-11-09

First public release, with 5 functions, CI tests and 100% coverage.
