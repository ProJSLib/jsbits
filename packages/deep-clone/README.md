# @jsbits/deep-clone

[![License][license-badge]](LICENSE)
[![Travis Test][travis-badge]][travis-url]
[![Codebeat][codebeat-badge]][codebeat-url]
[![Coverage][codecov-badge]][codecov-url]
[![npm Version][npm-badge]][npm-url]

Part of the [JSBits][jsbits-url] suite.

Performs a deep cloning of an object own properties, with loosy or exact behavior.

## Install

```bash
npm i @jsbits/deep-clone
# or
yarn add @jsbits/deep-clone
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `deepClone(value, [exact])` ⇒ `T` 

Performs a deep cloning of an object own properties, preserving its
prototype.

By default `cloneObject` works in "loosy mode", where it clones only
the _enumerable_ properties. Any other properties are ignored.

To enable the "exact mode" and clone all the properties, pass `true`
in the second parameter.

Both modes retain all the attributes of the copied properties (enumerable,
configurable, writable) and correctly transfer the `get` and/or `set`
methods, although these, like the other function-type values,
_are copied by reference_.

Try to limit the usage of this function to POJOs, as this function does not
work for objects with constructor that requires parameters (other than
some JS own Objects), nor objects with recursive references.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | `T` |  | Value to clone, mostly an object or array. |
| \[exact] | `boolean` | `false` | If `true`, duplicate the attributes of the property descriptors |

**Returns**: `T` - The cloned object or value.  

Since 1.0.0<br>
Group: object<br>
Author/Maintainer: @aMarCruz<br>

### Example

```ts
import deepClone from '@jsbits/deep-clone'

const objct = { foo: 1, bar: 'bar', baz: { date: new Date() } }
const clone = deepClone(objct)

console.log('Success?',
  clone.baz.date instanceof Date && clone.baz.date !== objct.baz.date)
// ⇒ Seccess? true
```

### About getter and setters

Cloning of getters and setters work as expected, they are duplicated as any other property. However, there' cases where cloning does not work.

Observe this fragment:

```ts
const createObj = function () {
  let _foo = 'bar' // in closure
  return Object.defineProperty({}, 'foo', {
    get () { return _foo },
    set (value) { _foo = value },
    enumerable: true,
  })
}

// This creates an object with get/set using the var _foo in its closure
const obj = createObj()
const clone = deepClone(obj)

// Looks like this works...
console.log(clone !== obj)      // ⇒ true
console.log(clone.foo)          // ⇒ 'bar'
clone.foo = 'BAZ'
console.log(clone.foo)          // ⇒ 'BAZ'
console.log(obj.foo)            // ⇒ 'BAZ' ...ups!
```

This is obvious if you look at the code of deepClone, getters and setters are copied _the same as the functions_ so its closure is the same as the original object.

To date, I haven't found any way to solve this issue ...anyone?

A workaround is to keep a non-enumerable property in the object:

```ts
const createObj = function () {
  // _foo as property
  return Object.defineProperties({}, {
    _foo: {
      value: 'bar',
      writable: true, // writable, but no enumerable
    },
    foo: {
      get () { return this._foo },
      set (value) { this._foo = value },
      enumerable: true,
    },
  })
}

const obj = createObj()
const clone = deepClone(obj)

// Now this works
console.log(clone !== obj)      // ⇒ true
console.log(clone.foo)          // ⇒ 'bar'
clone.foo = 'BAZ'
console.log(clone.foo)          // ⇒ 'BAZ'
console.log(obj.foo)            // ⇒ 'bar' :)

// and...
console.log(JSON.stringify(obj)) // ⇒ '{"foo":"bar"}' +1
```

## Imports

All the [JSBits][jsbits-url] functions works in _strict mode_ and are compatible with:

- ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
- ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
- [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
- [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
- [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.

## Known Issues

This types are copied by reference:

- Function
- AsyncFunction
- Getters and Setters
- GeneratorFunction
- Iterators
- Symbol (primitive, unique value)
- SharedArrayBuffer (ES2017, has a shered data block)
- Atomics object (ES2017)
- JSON object
- Math object
- WeakMap
- WeakSet
- XMLHttpRequest

Untested types:

- Workers
- WebAssembly

The [Intl](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl) object and classes are cloned as generic Objects.

---
[![Codacy][codacy-badge]][codacy-url]
[![Codacy coverage][codacyc-badge]][codacyc-url]
[![Code Climate][climate-badge]][climate-url]
[![Code Climate coverage][climatec-badge]][climatec-url]

&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-badge]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/deep-clone.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/deep-clone
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
