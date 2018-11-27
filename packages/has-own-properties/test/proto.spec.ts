/* eslint-disable no-new-wrappers */
/// <reference path="../proto.d.ts" />

import expect = require('expect.js')

import '../proto.js'

describe('Object.prototype.hasOwnProperties must return...', function () {

  it('false if the object has no properties', function () {
    expect({}.hasOwnProperties()).to.be(false)
  })

  it('true if the object has properties', function () {
    expect({ foo: 'bar' }.hasOwnProperties()).to.be(true)
  })

  it('false w/o `includeNonEnum` if the object does not have enumerable props', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(obj.hasOwnProperties()).to.be(false)
  })

  it('true with `includeNonEnum` if the object has any own property', function () {
    const obj = Object.defineProperty({}, 'foo', { value: 'bar' })
    expect(obj.hasOwnProperties(true)).to.be(true)
  })

  it('false with Object.prototype.hasOwnProperties.call(null)', function () {
    expect(Object.prototype.hasOwnProperties.call(null)).to.be(false)
  })

  it('false for empty String objects', function () {
    expect(new String().hasOwnProperties()).to.be(false)
  })

  it('true for non-empty String objects (has own props)', function () {
    expect(new String('foo').hasOwnProperties()).to.be(true)
  })

  it('false for Number objects whatever its value', function () {
    expect(new Number().hasOwnProperties()).to.be(false)
    expect(new Number(1).hasOwnProperties()).to.be(false)
    expect(new Number(NaN).hasOwnProperties()).to.be(false)
    expect(new Number(Infinity).hasOwnProperties()).to.be(false)
  })

  it('false for Date objects whatever its value', function () {
    expect(new Date().hasOwnProperties()).to.be(false)
    expect(new Date(0).hasOwnProperties()).to.be(false)
    expect(new Date(NaN).hasOwnProperties()).to.be(false)
  })

  it('false for RegExp objects', function () {
    expect(/./.hasOwnProperties()).to.be(false)
    expect(new RegExp('.', 'g').hasOwnProperties()).to.be(false)
  })

  it('true for array with elements', function () {
    expect([0].hasOwnProperties()).to.be(true)
  })

  it('false for array with zero elements', function () {
    expect([].hasOwnProperties()).to.be(false)
  })

})
