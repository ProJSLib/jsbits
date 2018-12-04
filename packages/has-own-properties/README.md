# @jsbits/has-own-properties

[![License][license-badge]](LICENSE)
[![Travis Test][travis-badge]][travis-url]
[![Codebeat][codebeat-badge]][codebeat-url]
[![Coverage][codecov-badge]][codecov-url]
[![npm Version][npm-badge]][npm-url]

Part of the [JSBits][jsbits-url] suite.

Determines whether an object has own properties or symbols, including (optionally) the non-enumerable ones.

## Install

```bash
npm i @jsbits/has-own-properties
# or
yarn add @jsbits/has-own-properties
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `hasOwnProperties(obj, [includeNonEnum])` ⇒ `boolean` 

Determines whether an object has _own_ properties or Symbol names, including (optionally)
the non-enumerable ones.

This function is especially useful in plain objects, to check if they are
"empty".

The test includes getters, setters and `Symbol` types names and values, in
the environments that support them.

By default, this function checks only enumerable properties and symbols, if
you want to check also the non-enumerables ones, pass `true` in the
additional parameter.

_**NOTE:** Testing primitive types is allowed, but these always return
`false`, even the non-empty strings._

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | `any` |  | Testing object or value |
| \[includeNonEnum] | `boolean` | `false` | Include non-enumerable properties? |

**Returns**: `boolean` - `true` if the object has own properties.  

Since 1.0.0<br>
Group: object<br>
Author/Maintainer: @aMarCruz<br>

### Example

```ts
import hasOwnProperties from '@jsbits/has-own-properties'

hasOwnProperties({}) // ⇒ false
hasOwnProperties({ foo: 'bar' }) // ⇒ true
hasOwnProperties({ [Symbol()]: 'bar' }) // ⇒ true
hasOwnProperties(null) // ⇒ false

hasOwnProperties([]) // ⇒ false
hasOwnProperties([], true) // ⇒ true
hasOwnProperties([0]) // ⇒ true

const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
hasOwnProperties(obj) // ⇒ false
hasOwnProperties(obj, true) // ⇒ true

const sym = Object.defineProperty({}, Symbol(), { value: 'bar' })
hasOwnProperties(sym) // ⇒ false
hasOwnProperties(sym, true) // ⇒ true

hasOwnProperties(new String('')) // ⇒ false
hasOwnProperties(new String(''), true) // ⇒ true
hasOwnProperties(new String('foo')) // ⇒ true
// it has 0:'f', 1:'o', 2:'o'

hasOwnProperties(new RegExp('.', 'g')) // ⇒ false
hasOwnProperties(new RegExp('.', 'g'), true) // ⇒ true
hasOwnProperties(new Date()) // ⇒ false
hasOwnProperties(new Date(), true) // ⇒ false

// With primitive values
hasOwnProperties(true) // ⇒ false
hasOwnProperties('foo') // ⇒ false
hasOwnProperties(1) // ⇒ false
hasOwnProperties(NaN) // ⇒ false
hasOwnProperties(Symbol()) // ⇒ false
```

### Object.prototype.hasOwnProperties

If you prefer, you can inject this function into the `Object.prototype` by requiring 'proto' or by loading the IIFE from 'has-own-properties/proto.js' in your browser:

```ts
require('@jsbits/has-own-properties/proto')

const anObject = { foo: 'bar' }
const hasProps = anObject.hasOwnProperties()
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
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/has-own-properties.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/has-own-properties
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
