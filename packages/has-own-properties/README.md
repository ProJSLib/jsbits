# @jsbits/has-own-properties

[![License][license-image]](LICENSE)
[![Travis Test][travis-image]][travis-url]
[![Codebeat][codebeat-image]][codebeat-url]
[![Code Climate][climate-image]][climate-url]
[![Coverage][cccover-image]][cccover-url]
[![npm Version][npm-image]][npm-url]

Part of the [JSBits][jsbits-url] suite.

Determinates if an object has own properties.

## Install

```bash
npm i @jsbits/has-own-properties
# or
yarn add @jsbits/has-own-properties
```

### Targets

* ES5 compatible browser
* NodeJS v4.2 or later


## `hasOwnProperties(obj, [includeNonEnum])` ⇒ <code>boolean</code> 

Determinates if an object has _own_ properties, including `Symbol` and
(optionally) the non-enumerable properties.

Primitive types (number, string, etc) always returns `false`.

If you want to include non-enumerables properties, pass `true` in the
second parameter.


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| obj | <code>any</code> |  | Testing object |
| [includeNonEnum] | <code>boolean</code> | <code>false</code> | Include non-enumerable properties? |

**Returns**: <code>boolean</code> - `true` if the object has properties.  

Since 1.0.0<br>
Group: object<br>
Author/Maintainer: @aMarCruz<br>


### Example

```ts
import hasOwnProperties from '@jsbits/has-own-properties'

hasOwnProperties({}) // ⇒ false
hasOwnProperties({ foo: 'bar' }) // ⇒ true
hasOwnProperties(null) // ⇒ false

hasOwnProperties([]) // ⇒ false
hasOwnProperties([], true) // ⇒ true
hasOwnProperties([0]) // ⇒ true

const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
hasOwnProperties(obj) // ⇒ false
hasOwnProperties(obj, true) // ⇒ true

const sym = { foo: Symbol() }
hasOwnProperties(sym) // ⇒ true
hasOwnProperties(sym, true) // ⇒ true

hasOwnProperties(new String('')) // ⇒ false
hasOwnProperties(new String(''), true) // ⇒ true
hasOwnProperties(new String('foo')) // ⇒ true
// it has 0:'f', 1:'o', 2:'o'

hasOwnProperties(new RegExp('.', 'g')) // ⇒ false
hasOwnProperties(new RegExp('.', 'g'), true) // ⇒ true
hasOwnProperties(new Date()) // ⇒ false
hasOwnProperties(new Date(), true) // ⇒ false

hasOwnProperties(true) // ⇒ false
hasOwnProperties('foo') // ⇒ false
hasOwnProperties(1) // ⇒ false
hasOwnProperties(NaN) // ⇒ false
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

* ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
* ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
* [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
* [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
* [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.


---
&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-image]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[npm-image]:      https://img.shields.io/npm/v/@jsbits/has-own-properties.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/has-own-properties
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
