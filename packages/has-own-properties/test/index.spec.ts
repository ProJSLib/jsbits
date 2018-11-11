/// <reference path="../proto.d.ts" />

/* eslint-disable no-new-wrappers */
import expect = require('expect.js')
import hasOwnProperties = require('..')

describe('hasOwnProperties must...', function () {

  it('return false if the object has no properties', function () {
    expect(hasOwnProperties({})).to.be(false)
  })

  it('return true if the object has properties', function () {
    expect(hasOwnProperties({ foo: 'bar' })).to.be(true)
  })

  it('return false if the object has only non-enumerable props', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(hasOwnProperties(obj)).to.be(false)
  })

  it('return false for null objects', function () {
    expect(hasOwnProperties(null)).to.be(false)
  })

  it('return false for empty String objects', function () {
    expect(hasOwnProperties(new String())).to.be(false)
  })

  it('return true for non-empty String objects (has own props)', function () {
    expect(hasOwnProperties(new String('foo'))).to.be(true)
  })

  it('return false for Number objects whatever its value', function () {
    expect(hasOwnProperties(new Number())).to.be(false)
    expect(hasOwnProperties(new Number(1))).to.be(false)
    expect(hasOwnProperties(new Number(NaN))).to.be(false)
    expect(hasOwnProperties(new Number(Infinity))).to.be(false)
  })

  it('return false for Date objects whatever its value', function () {
    expect(hasOwnProperties(new Date())).to.be(false)
    expect(hasOwnProperties(new Date(0))).to.be(false)
    expect(hasOwnProperties(new Date(NaN))).to.be(false)
  })

  it('return false for RegExp objects', function () {
    expect(hasOwnProperties(/./)).to.be(false)
    expect(hasOwnProperties(new RegExp('.', 'g'))).to.be(false)
  })

  it('return false for class instances w/o properties', function () {
    class Klass {}
    expect(hasOwnProperties(new Klass())).to.be(false)
  })

  it('return false for classes with only getters and prototype methods', function () {
    class Klass {
      foo () {
        return 0
      }
      get bar () {
        return 0
      }
    }
    expect(hasOwnProperties(new Klass())).to.be(false)
  })

  it('return true for class instances with private properties/methods', function () {
    class Klass {
      // @ts-ignore
      private _foo = 0
    }
    expect(hasOwnProperties(new Klass())).to.be(true)
  })

  it('return true for class instances with public properties', function () {
    class Klass {
      foo = 0
    }
    expect(hasOwnProperties(new Klass())).to.be(true)
  })

  it('return false for primitive values', function () {
    expect(hasOwnProperties(1)).to.be(false)
    expect(hasOwnProperties(true)).to.be(false)
    expect(hasOwnProperties('foo')).to.be(false)
    expect(hasOwnProperties(Infinity)).to.be(false)
    expect(hasOwnProperties(NaN)).to.be(false)
  })

  it('return true for array with elements', function () {
    expect(hasOwnProperties([0])).to.be(true)
  })

  it('return false for array with zero elements', function () {
    expect(hasOwnProperties([])).to.be(false)
  })

  it('return false for array with only undefined elements', function () {
    const arr = new Array(1)
    expect(hasOwnProperties(arr)).to.be(false)
    expect(hasOwnProperties([undefined])).to.be(true)
  })

  it('must work with objects with no prototype', function () {
    const obj = Object.create(null)
    expect(hasOwnProperties(obj)).to.be(false)
    obj.foo = 'foo'
    expect(hasOwnProperties(obj)).to.be(true)
  })

})


describe('Object.prototype.hasOwnProperties must...', function () {

  require('../proto.js')

  it('return false if the object has no properties', function () {
    expect({}.hasOwnProperties()).to.be(false)
  })

  it('return true if the object has properties', function () {
    expect({ foo: 'bar' }.hasOwnProperties()).to.be(true)
  })

  it('return false if the object has only non-enumerable props', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(obj.hasOwnProperties()).to.be(false)
  })

  it('return false with Object.prototype.hasOwnProperties.call(null)', function () {
    expect(Object.prototype.hasOwnProperties.hasOwnProperties.call(null)).to.be(false)
  })

  it('return false for empty String objects', function () {
    expect(new String().hasOwnProperties()).to.be(false)
  })

  it('return true for non-empty String objects (has own props)', function () {
    expect(new String('foo').hasOwnProperties()).to.be(true)
  })

  it('return false for Number objects whatever its value', function () {
    expect(new Number().hasOwnProperties()).to.be(false)
    expect(new Number(1).hasOwnProperties()).to.be(false)
    expect(new Number(NaN).hasOwnProperties()).to.be(false)
    expect(new Number(Infinity).hasOwnProperties()).to.be(false)
  })

  it('return false for Date objects whatever its value', function () {
    expect(new Date().hasOwnProperties()).to.be(false)
    expect(new Date(0).hasOwnProperties()).to.be(false)
    expect(new Date(NaN).hasOwnProperties()).to.be(false)
  })

  it('return false for RegExp objects', function () {
    expect(/./.hasOwnProperties()).to.be(false)
    expect(new RegExp('.', 'g').hasOwnProperties()).to.be(false)
  })

  it('return true for array with elements', function () {
    expect([0].hasOwnProperties()).to.be(true)
  })

  it('return false for array with zero elements', function () {
    expect([].hasOwnProperties()).to.be(false)
  })

})
