# @jsbits/has-own-properties

_Part of the [JSBits][jsbits-url] suite._

[![License][license-badge]](LICENSE)
[![npm Version][npm-badge]][npm-url]
[![minified size][size-badge]][size-url]<br>
[![AppVeyor Test][appveyor-badge]][appveyor-url]
[![Travis Test][travis-badge]][travis-url]
[![coverage][codecov-badge]][codecov-url]
[![code quality][codacy-badge]][codacy-url]
[![maintainability][climate-badge]][climate-url]

Determines whether an object has own properties or symbols, including (optionally) the non-enumerable ones.

## Install

For NodeJS and JS bundlers:

```bash
npm i @jsbits/has-own-properties
# or
yarn add @jsbits/has-own-properties
```

or load `hasOwnProperties` in the browser:

```html
<script src="https://unpkg.com/@jsbits/has-own-properties/index.b.min.js"></script>
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
Author/Maintainer: aMarCruz<br>

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

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]

Of course, feedback, PRs, and stars are also welcome 🙃

Thanks for your support!

## License

The [MIT](LICENSE) License.

&copy; 2018-2019 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-badge]:  https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/has-own-properties.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/has-own-properties
[appveyor-badge]: https://img.shields.io/appveyor/ci/aMarCruz/jsbits/master.svg?label=appveyor
[appveyor-url]:   https://ci.appveyor.com/project/aMarCruz/jsbits/branch/master
[travis-badge]:   https://img.shields.io/travis/ProJSLib/jsbits/master.svg?label=travis
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codecov-badge]:  https://img.shields.io/codecov/c/github/ProJSLib/jsbits/master.svg
[codecov-url]:    https://codecov.io/gh/ProJSLib/jsbits/branch/master
[codacy-badge]:   https://img.shields.io/codacy/grade/b9374fca91d64b75aafac26682df8fd0/master.svg
[codacy-url]:     https://www.codacy.com/app/ProJSLib/jsbits?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ProJSLib/jsbits&amp;utm_campaign=Badge_Grade
[climate-badge]:  https://img.shields.io/codeclimate/maintainability/ProJSLib/jsbits.svg
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits/maintainability
[size-badge]:     https://img.shields.io/bundlephobia/min/@jsbits/has-own-properties.svg
[size-url]:       https://bundlephobia.com/result?p=@jsbits/has-own-properties
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
[kofi-url]:       https://ko-fi.com/C0C7LF7I
