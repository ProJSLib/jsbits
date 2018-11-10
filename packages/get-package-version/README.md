# @jsbits/get-package-version

[![License][license-image]](LICENSE)
[![Travis Test][travis-image]][travis-url]
[![Codebeat][codebeat-image]][codebeat-url]
[![Code Climate][climate-image]][climate-url]
[![Coverage][cccover-image]][cccover-url]
[![npm Version][npm-image]][npm-url]

Part of the [JSBits][jsbits-url] suite.

Get the version of the package.json file found in the given directory or in one of its parents.

## Install

```bash
npm i @jsbits/get-package-version
# or
yarn add @jsbits/get-package-version
```

### Targets

- NodeJS v4.2 or later

## `getPackageVersion([pkgPath])` ⇒ <code>string</code> 

Returns the version of the first package.json file found in the given
directory or in one of its parents.

- If you don't provide a path, the search starts in the current one.
- The provided path can be relative to the current working directory.
- Packages with a missing or empty `version` property are ignored.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| \[pkgPath] | <code>string</code> | <code>&quot;.&quot;</code> | Initial directory to search, defaults to `process.cwd()`. |

**Returns**: <code>string</code> - The package version, or an empty string if it could not be found.  

Since 1.0.0<br>
Group: dev<br>
Author/Maintainer: @aMarCruz<br>

### Example

```ts
import getPackageVersion from '@jsbits/get-package-version'

const version = getPackageVersion() // ⇒ '1.0.0' (just as example)
```

## Imports

All the [JSBits][jsbits-url] functions works in _strict mode_ and are compatible with:

- ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
- ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
- [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
- [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
- [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.

---
&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-image]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[npm-image]:      https://img.shields.io/npm/v/@jsbits/get-package-version.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/get-package-version
[travis-image]:   https://img.shields.io/travis/ProJSLib/jsbits.svg
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codebeat-image]: https://codebeat.co/badges/5b07ccc1-be43-41d8-aeaf-eee1913d4173
[codebeat-url]:   https://codebeat.co/projects/github-com-projslib-jsbits-master
[climate-image]:  https://codeclimate.com/github/ProJSLib/jsbits/badges/gpa.svg
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits
[cccover-image]:  https://api.codeclimate.com/v1/badges/e991c05e8a92448d30f0/test_coverage
[cccover-url]:    https://codeclimate.com/github/ProJSLib/jsbits/test_coverage
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
