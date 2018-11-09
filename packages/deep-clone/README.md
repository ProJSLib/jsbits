# @jsbits/deep-clone

[![npm Version][npm-image]][npm-url]
[![License][license-image]](LICENSE)

Part of the [JSBits][jsbits-url] suite.

Performs a deep cloning of an object own properties, with loosy or exact behavior.

## Install

```bash
npm i @jsbits/deep-clone
# or
yarn add @jsbits/deep-clone
```

### Targets:

* ES5 compatible browser
* NodeJS v4.2 or later


## `deepClone(value, [exact])` ⇒ <code>T</code> 

Performs a deep cloning of an object own properties, preserving its
prototype.

By default, `cloneObject` works in "loosy mode" where it clones only
the _enumerable_ properties; any other attribute of this properties
is removed.

To enable the "exact mode" and clone all the properties, including its
attributes (enumerable, configurable, writable), pass `true` in the
second parameter.

Try to limit the usage of this function to POJOs, this function does not
work for objects with constructor that requires parameters (other than
some JS own Objects), nor objects with recursive references.

_**NOTE:** Functions, getters and setters are copied by reference._


| Param | Type | Default | Description |
| --- | --- | --- | --- |
| value | <code>T</code> |  | Value to clone, mostly an object or array. |
| [exact] | <code>boolean</code> | <code>false</code> | If `true`, duplicate the attributes of the property descriptors |

**Returns**: <code>T</code> - The cloned object or value.  

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

* ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
* ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
* [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
* [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
* [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.


---
&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[npm-image]:      https://img.shields.io/npm/v/@jsbits/deep-clone.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/deep-clone
[license-image]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
