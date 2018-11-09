# @jsbits/escape-regex-str

[![npm Version][npm-image]][npm-url]
[![License][license-image]](LICENSE)

Part of the [JSBits][jsbits-url] suite.

Escapes special characters in a string, for matching substrings with a RegExp instance.

## Install

```bash
npm i @jsbits/escape-regex-str
# or
yarn add @jsbits/escape-regex-str
```

### Targets:

* ES5 compatible browser
* NodeJS v4.2 or later


## `escapeRegexStr(str)` ⇒ <code>string</code> 

Escapes special characters in a given string in preparation to be used as
argument of the JS `RegExp` constructor, useful when you want to match the
given string as a literal substring.


| Param | Type | Description |
| --- | --- | --- |
| str | <code>string</code> | A string. |

**Returns**: <code>string</code> - The escaped string.  

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

* ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
* ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
* [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
* [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
* [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.


---
&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[npm-image]:      https://img.shields.io/npm/v/@jsbits/escape-regex-str.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/escape-regex-str
[license-image]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
