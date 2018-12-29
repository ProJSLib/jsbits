# Changelog of @jsbits/add-months

For global changes, see the [changelog of jsbits](https://github.com/ProJSLib/jsbits/blob/master/CHANGELOG.md)

## \[1.1.2] - 2018-12-29

### Changed

- Replace BSD-2 with the MIT license.
- Remove warning from the Readme.
- Update badges.

### Fixed

- Minor errors in the Readme

## \[1.1.1] - 2018-12-06

### Fixed

- Issues with codebeat linters.

## \[1.0.1] - 2018-11-12

### Added

- Badges in the Readme.
- `Date.prototype.addUTCMonths` for UTC dates.

### Changed

- Excluded string values from the supported types, use only Date or number.
- Now `Date.prototype.addMonths` is only for local dates, returns a number and affects its value.

### Fixed

- Bad written example showing incorrect result.
- Issues with the markdown linter.
- Wrong `export default` in typings, the correct one is `export =`.
- Tests now works w/the new specs.
- Coverage report.

_**NOTE:**_

The API of this version changed but, due to the few downloads and short time of life of v1.0.0, the major version number remained (against our own policy). See new specs in the [README](README.md#dateprototypeaddmonths)).

## \[1.0.0] - 2018-11-09

Initial release.
