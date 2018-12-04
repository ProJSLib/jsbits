/* eslint-disable no-new-wrappers */

import expect = require('expect.js')
import hasOwnProperties = require('..')

// istanbul ignore next: Until we can test IE11
const ifSym = typeof Symbol === 'function' ? it : it.skip

describe('hasOwnProperties must return...', function () {

  it('false if the object has no properties', function () {
    expect(hasOwnProperties({})).to.be(false)
  })

  it('true if the object has own properties', function () {
    expect(hasOwnProperties({ foo: 'bar' })).to.be(true)
  })

  it('false if has no own properties, even if the ancestor has', function () {
    const obj1 = { foo: 'a' }
    const obj2 = Object.create(obj1)
    expect(hasOwnProperties(obj2)).to.be(false)
  })

  it('false if the object has only non-enumerable props', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(hasOwnProperties(obj)).to.be(false)
  })

  it('false for null objects or undefined values', function () {
    expect(hasOwnProperties(null)).to.be(false)
    expect(hasOwnProperties(undefined)).to.be(false)
  })

  it('false for empty String objects', function () {
    expect(hasOwnProperties(new String())).to.be(false)
  })

  it('true for non-empty String objects (has own props)', function () {
    expect(hasOwnProperties(new String('foo'))).to.be(true)
  })

  it('false for Number objects whatever its value', function () {
    expect(hasOwnProperties(new Number())).to.be(false)
    expect(hasOwnProperties(new Number(1))).to.be(false)
    expect(hasOwnProperties(new Number(NaN))).to.be(false)
    expect(hasOwnProperties(new Number(Infinity))).to.be(false)
  })

  it('false for Date objects whatever its value', function () {
    expect(hasOwnProperties(new Date())).to.be(false)
    expect(hasOwnProperties(new Date(0))).to.be(false)
    expect(hasOwnProperties(new Date(NaN))).to.be(false)
  })

  it('false for RegExp objects, even with flags', function () {
    expect(hasOwnProperties(/./)).to.be(false)
    expect(hasOwnProperties(new RegExp('.', 'g'))).to.be(false)
  })

  it('false for class instances w/o properties', function () {
    class Klass {}
    expect(hasOwnProperties(new Klass())).to.be(false)
  })

  it('false for classes with only getters and prototype methods', function () {
    const klass = new class { // eslint-disable-line new-parens
      foo () {
        return 1
      }
      get bar () {
        return 1
      }
    }
    expect(hasOwnProperties(klass)).to.be(false)
    expect(klass.foo()).to.be(1)
    expect(klass.bar).to.be(1)
  })

  it('true for class instances with private properties/methods', function () {
    class Klass {
      // @ts-ignore
      private _foo = 0
    }
    expect(hasOwnProperties(new Klass())).to.be(true)
  })

  it('true for class instances with public properties', function () {
    class Klass {
      foo = 0
    }
    expect(hasOwnProperties(new Klass())).to.be(true)
  })

  it('false for primitive values', function () {
    expect(hasOwnProperties(1)).to.be(false)
    expect(hasOwnProperties(true)).to.be(false)
    expect(hasOwnProperties('foo')).to.be(false)
    expect(hasOwnProperties(Infinity)).to.be(false)
    expect(hasOwnProperties(NaN)).to.be(false)
  })

  it('true for array with elements', function () {
    expect(hasOwnProperties([0])).to.be(true)
  })

  it('false for array with zero elements', function () {
    expect(hasOwnProperties([])).to.be(false)
  })

  it('false for array with only undefined elements', function () {
    const arr = new Array(1)
    expect(hasOwnProperties(arr)).to.be(false)
    expect(hasOwnProperties([undefined])).to.be(true)
  })

  it('the correct value for objects with no prototype', function () {
    const obj = Object.create(null)
    expect(hasOwnProperties(obj)).to.be(false)
    obj.foo = 'foo'
    expect(hasOwnProperties(obj)).to.be(true)
  })

  ifSym('true if has only symbol property names', function () {
    const obj = { [Symbol()]: 'a' }
    expect(hasOwnProperties(obj)).to.be(true)
  })

  ifSym('false with one non-enumerable symbol property name', function () {
    const obj = Object.defineProperty({}, Symbol(), {
      value: 'a',
    })
    expect(hasOwnProperties(obj)).to.be(false)
  })

})

describe('hasOwnProperties with `includeNonEnum` flag must return...', function () {

  it('true for non-enumerable properties', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(hasOwnProperties(obj, true)).to.be(true)
  })

  it('true for non-enumerable properties', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(hasOwnProperties(obj, true)).to.be(true)
  })

  it('false if has no own properties, even if the ancestor has', function () {
    const obj1 = { foo: 'a' }
    const obj2 = Object.create(obj1)
    expect(hasOwnProperties(obj2)).to.be(false)
  })

  it('true for empty String objects (has a `length` property)', function () {
    expect(hasOwnProperties(new String(), true)).to.be(true)
  })

  it('false for Number objects whatever its value', function () {
    expect(hasOwnProperties(new Number(), true)).to.be(false)
    expect(hasOwnProperties(new Number(1), true)).to.be(false)
    expect(hasOwnProperties(new Number(NaN), true)).to.be(false)
    expect(hasOwnProperties(new Number(Infinity), true)).to.be(false)
  })

  it('false for Date objects whatever its value', function () {
    expect(hasOwnProperties(new Date(), true)).to.be(false)
    expect(hasOwnProperties(new Date(0), true)).to.be(false)
    expect(hasOwnProperties(new Date(NaN), true)).to.be(false)
  })

  it('true for RegExp objects (has a `length` and an array)', function () {
    debugger // eslint-disable-line
    expect(hasOwnProperties(/./, true)).to.be(true)
    expect(hasOwnProperties(new RegExp('.', 'g'), true)).to.be(true)
  })

  it('false for class instances w/o properties', function () {
    class Klass {}
    expect(hasOwnProperties(new Klass(), true)).to.be(false)
  })

  it('false for classes with only getters and prototype methods', function () {
    const klass = new class { // eslint-disable-line new-parens
      foo () {
        return 1
      }
      get bar () {
        return 1
      }
    }
    expect(hasOwnProperties(klass, true)).to.be(false)
    expect(klass.foo()).to.be(1)
    expect(klass.bar).to.be(1)
  })

  it('false for primitive values', function () {
    expect(hasOwnProperties(1, true)).to.be(false)
    expect(hasOwnProperties(true, true)).to.be(false)
    expect(hasOwnProperties('foo', true)).to.be(false)
    expect(hasOwnProperties(Infinity, true)).to.be(false)
    expect(hasOwnProperties(NaN, true)).to.be(false)
  })

  it('true for array with zero elements (has `length`)', function () {
    expect(hasOwnProperties([], true)).to.be(true)
  })

  it('true for array with undefined elements (has `length`)', function () {
    const arr = new Array(1)
    expect(hasOwnProperties(arr, true)).to.be(true)
    expect(hasOwnProperties([undefined], true)).to.be(true)
  })

  it('the correct value for objects with no prototype', function () {
    const obj = Object.create(null)
    expect(hasOwnProperties(obj, true)).to.be(false)

    Object.defineProperty(obj, 'foo', { value: 1 })
    expect(hasOwnProperties(obj, true)).to.be(true)
  })

  ifSym('true with `includeNonEnum` and one non-enumerable symbol property name', function () {
    const obj = Object.defineProperty({}, Symbol(), {
      value: 'a',
    })
    expect(hasOwnProperties(obj, true)).to.be(true)
  })

})
