# @jsbits/escape-regex-str

[![License][license-badge]](LICENSE)
[![Travis Test][travis-badge]][travis-url]
[![Codebeat][codebeat-badge]][codebeat-url]
[![Coverage][codecov-badge]][codecov-url]
[![npm Version][npm-badge]][npm-url]

Part of the [JSBits][jsbits-url] suite.

Escapes special characters in a string, for matching substrings with a RegExp instance.

## Install

```bash
npm i @jsbits/escape-regex-str
# or
yarn add @jsbits/escape-regex-str
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `escapeRegexStr(str)` ⇒ `string` 

Escapes special characters in a given string in preparation to be used as
argument of the JS `RegExp` constructor, useful when you want to match the
given string as a literal substring.

| Param | Type | Description |
| --- | --- | --- |
| str | `string` | A string. |

**Returns**: `string` - The escaped string.  

Since 1.0.0<br>
Group: dev<br>
Author/Maintainer: @aMarCruz<br>

### Example

```ts
import escapeRegexStr from '@jsbits/escape-regex-str'

const sourceStr = 'Unicorn (white): $'

// without escapeRegexStr, the test fails.
const regex1 = new RegExp(sourceStr)
console.log(regex1.test('Unicorn (white): $1.00')) // ⇒ false

// with escapeRegexStr, it succeeds.
const regex2 = new RegExp(escapeRegexStr(sourceStr))
console.log(regex2.test('Unicorn (white): $1.00')) // ⇒ true
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
[![Codacy][codacy-badge]][codacy-url]
[![Codacy coverage][codacyc-badge]][codacyc-url]
[![Code Climate][climate-badge]][climate-url]
[![Code Climate coverage][climatec-badge]][climatec-url]

&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-badge]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/escape-regex-str.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/escape-regex-str
[travis-badge]:   https://travis-ci.org/ProJSLib/jsbits.svg?branch=master
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codebeat-badge]: https://codebeat.co/badges/5b07ccc1-be43-41d8-aeaf-eee1913d4173
[codebeat-url]:   https://codebeat.co/projects/github-com-projslib-jsbits-master
[codacy-badge]:   https://api.codacy.com/project/badge/Grade/0d842f1b749340ec90277fb3b2da4e86
[codacy-url]:     https://www.codacy.com/app/ProJSLib/jsbits?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ProJSLib/jsbits&amp;utm_campaign=Badge_Grade
[codacyc-badge]:  https://api.codacy.com/project/badge/Coverage/0d842f1b749340ec90277fb3b2da4e86
[codacyc-url]:    https://www.codacy.com/app/ProJSLib/jsbits?utm_source=github.com&utm_medium=referral&utm_content=ProJSLib/jsbits&utm_campaign=Badge_Coverage
[codecov-badge]:  https://codecov.io/gh/ProJSLib/jsbits/branch/master/graph/badge.svg
[codecov-url]:    https://codecov.io/gh/ProJSLib/jsbits
[climate-badge]:  https://api.codeclimate.com/v1/badges/e991c05e8a92448d30f0/maintainability
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits/maintainability
[climatec-badge]: https://api.codeclimate.com/v1/badges/e991c05e8a92448d30f0/test_coverage
[climatec-url]:   https://codeclimate.com/github/ProJSLib/jsbits/test_coverage
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
