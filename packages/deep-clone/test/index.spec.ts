/* eslint-disable no-new-wrappers */
/// <reference lib="es2015.symbol" />

import expect = require('expect.js')
import deepClone = require('..')

const itif = function (condition: any, msg: string, fn: () => any) {
  (condition ? it : it.skip)(msg, fn)
}

const hasSymbol = typeof Symbol === 'function'

const is = function (x: any, y: any) {
  if (x === y) {
    return x !== 0 || (1 / x === 1 / y)   // +-0
  }
  // eslint-disable-next-line no-self-compare
  return x !== x && y !== y   // NaN
}
const stringify = JSON.stringify

describe('deepClone', function () {

  const falsies = {
    '_null': null,
    '_undefined': undefined,
    '_false': false,
    '_NaN': NaN,
    '_+0': +0,
    '_-0': -0,
    '_""': '',
  } as any

  Object.keys(falsies).forEach((k) => {
    const value = falsies[k]
    it('works with the ' + k.substr(1) + ' value ', function () {
      const clone = deepClone(value)
      expect(is(clone, value)).to.be(true)
    })
  })

  it('works with POJO objets', function () {
    const value = { _null: null, date: new Date(), bool: false, string: '', number: 1 }
    const clone = deepClone(value)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone).to.eql(value)
  })

  it('works with objects with no prototype (Object.create(null))', function () {
    const value = Object.create(null) as any
    value._str = 's'
    value._num = 1
    const clone = deepClone(value)

    expect(clone.prototype).to.be(undefined)
    expect(clone).not.to.be(value)
    expect(clone).to.eql(value)
  })

  it('must clone nested objects with no prototype', function () {
    const value = { obj: Object.create(null) } as any
    value.obj._str = 's'
    value.obj._num = 1
    const clone = deepClone(value)

    expect(clone.obj.prototype).to.be(undefined)
    expect(clone).not.to.be(value)
    expect(clone.obj).not.to.be(value.obj)
    expect(clone).to.eql(value)
    expect(clone.obj).to.have.property('_str', 's')
    expect(clone.obj).to.have.property('_num', 1)
  })

  it('works with JS String objects', function () {
    const value = new String('ok')
    ;(value as any)._foo = 'foo'
    const clone = deepClone(value)

    expect(clone).to.be.an(String)
    expect(clone).not.to.be(value)
    expect(clone + '').to.equal(value + '')
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('works with JS Number objects', function () {
    const value = new Number(123)
    ;(value as any)._foo = 'foo'
    const clone = deepClone(value)

    expect(clone).to.be.an(Number)
    expect(clone).not.to.be(value)
    expect(clone.valueOf()).to.be(value.valueOf())
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('works with JS Boolean objects', function () {
    const value = new Boolean(true)
    ;(value as any)._foo = 'foo'
    const clone = deepClone(value)

    expect(clone).to.be.an(Boolean)
    expect(clone).not.to.be(value)
    expect(clone.valueOf()).to.be(value.valueOf())
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('works with JS Date objects', function () {
    const value = new Date()
    ;(value as any)._foo = 'foo'
    const clone = deepClone(value)

    expect(clone).to.be.a(Date)
    expect(clone).not.to.be(value)
    // node 8 does not recognize any of both as a Date
    //expect(+new Date(clone as any)).to.be(+new Date(value as any))
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('works with JS RegExp objects', function () {
    const value = /\s+/gi
    const clone = deepClone(value)

    expect(clone).to.be.an(RegExp)
    expect(clone).not.to.be(value)
    expect('' + clone).to.be('' + value)
  })

  itif(hasSymbol, 'must clone Symbol() property names', function () {
    const symbl = Symbol()
    const value = { [symbl]: 'a' }
    const clone = deepClone(value)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property(symbl as any)
  })

  itif(hasSymbol, 'must clone Symbol() property values', function () {
    const symbl = Symbol()
    const value = { a: symbl }
    const clone = deepClone(value)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone.a).to.be(symbl)
  })

  it('works with Arrays', function () {
    const value = [null, undefined, false, '', 1]
    value.length = value.length + 2
    const clone = deepClone(value)

    expect(clone).to.be.an(Array)
    expect(clone).not.to.be(value)
    expect(stringify(clone)).to.be(stringify(value))
    expect(clone.length).to.be(value.length)
  })

  it('must clone objects of array elements', function () {
    const value = [{ foo: 'a' }, { bar: 1 }, { baz: { x: 2 } }]
    const clone = deepClone(value)

    expect(clone).to.be.an(Array)
    expect(clone).not.to.be(value)
    expect(clone.length).to.be(value.length)
    expect(stringify(clone)).to.be(stringify(value))
  })

  it('in loosy mode, only the enumerable properties are duplicated', function () {
    const value = {} as any
    Object.defineProperties(value, {
      '_str': { value: 's' },
      '_num': { value: 1, writable: true },
    })
    const clone = deepClone(value)

    expect(clone).not.to.be(value)
    expect(clone._str).to.be(undefined)
    expect(clone._num).to.be(undefined)
  })

  it('in exact mode preserves the attributes of the properties', function () {
    const getOwnPropDesc = Object.getOwnPropertyDescriptor
    const value = {} as any
    Object.defineProperties(value, {
      '_str': { value: 's' },
      '_num': { value: 1, writable: true },
    })
    const clone = deepClone(value, true)

    expect(clone).not.to.be(value)
    expect(clone._str).to.be(value._str)
    expect(clone._num).to.be(value._num)
    expect(getOwnPropDesc(clone, '_str')).to.eql(getOwnPropDesc(value, '_str'))
    expect(getOwnPropDesc(clone, '_num')).to.eql(getOwnPropDesc(value, '_num'))
  })

  it('can duplicate class instances with zero parameters Ctor', function () {
    const toStr = Object.prototype.toString
    const fn: any = function (this: any) {
      this.foo = 'foo'
      this.toString = () => `Foo("${this.foo}")`
    }
    fn.prototype.toJSON = function () {
      return `{fooClass:"${this.foo}"}`
    }
    const value = new fn()
    const clone = deepClone(value, true)

    expect(clone).not.to.be(value)
    expect(clone).to.eql(value)
    expect(toStr.call(clone)).to.eql(toStr.call(value))
    expect(clone.toString()).to.eql(value.toString())
    expect(clone.toJSON()).to.eql(value.toJSON())
  })

  it('in loosy mode must duplicate readonly properties', function () {
    const value = {} as any
    Object.defineProperties(value, {
      _str: { value: 's', enumerable: true },
      _num: { value: 1, enumerable: true, configurable: true },
    })
    const clone = deepClone(value)

    expect(clone).to.be.an(Object)
    expect(clone).to.eql(value)
    expect(clone._str).to.be(value._str)
    expect(clone._num).to.be(value._num)
  })

  it('cloning getter and setters works, but the closure is the same.', function () {
    //
    // This is an interesting case: the var `_foo` in closure is not cloned,
    // of course, but I don't know how to duplicate (I think there's no way).
    //
    const value = (function () {
      let _foo = 'bar'
      return Object.defineProperty({}, 'foo', {
        get () {
          return _foo
        },
        set (newValue) {
          _foo = newValue
        },
        enumerable: true,
      })
    })()
    const clone = deepClone(value, true)

    expect(clone).not.to.be(value)
    expect(clone.foo).to.be('bar')
    clone.foo = 'BAZ'
    expect(clone.foo).to.be('BAZ')
    expect(value.foo).to.be('BAZ') // NOTE
    expect(JSON.stringify(value)).to.be('{"foo":"BAZ"}')
  })

  it('cloning getter and setters works accesing props from its own object.', function () {
    //
    // This is an interesting case: the var `_foo` in closure is not cloned,
    // of course, but I don't know how to duplicate (I think there's no way).
    //
    const value = (function () {
      return Object.defineProperties({}, {
        _foo: {
          value: 'bar',
          writable: true, // writable, but no enumerable
        },
        foo: {
          get () {
            return this._foo
          },
          set (newValue) {
            this._foo = newValue
          },
          enumerable: true,
        },
      })
    })()
    const clone = deepClone(value, true)

    expect(clone).not.to.be(value)
    expect(clone.foo).to.be('bar')
    clone.foo = 'BAZ'
    expect(clone.foo).to.be('BAZ')
    expect(value.foo).to.be('bar') // :)
    expect(JSON.stringify(value)).to.be('{"foo":"bar"}')
  })

  it('From the example', function () {
    const objct = { foo: 1, bar: 'bar', baz: new Date() }
    const clone = deepClone(objct)

    expect(clone).not.to.be(objct)
    expect(clone).to.eql(objct)
    expect(clone.baz instanceof Date && clone.baz !== objct.baz).to.be(true)
  })
})

describe('deepClone with the `exact` flag must...', function () {
  //
  const defPropRo = (o: any, p: string | symbol | number,
    value: any) => Object.defineProperty(o, p, { value })

  const defPropWr = (o: any, p: string | symbol | number,
    value: any) => Object.defineProperty(o, p, { value, writable: true })

  it('clone JS String objects', function () {
    const value = new String('ok')
    defPropRo(value, '_foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(String)
    expect(clone).not.to.be(value)
    expect(clone + '').to.equal(value + '')
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('clone JS Number objects', function () {
    const value = new Number(123)
    defPropRo(value, '_foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Number)
    expect(clone).not.to.be(value)
    expect(clone.valueOf()).to.be(value.valueOf())
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('clone JS Number in properties', function () {
    const value = defPropWr({}, '_foo', new Number(123))
    defPropRo(value._foo, 'foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone._foo).to.be.an(Number)
    expect(clone._foo).not.to.be(value._foo)
    expect(clone._foo.valueOf()).to.be(value._foo.valueOf())
    expect(clone._foo.foo).to.be(value._foo.foo)
  })

  it('clone JS Date properties', function () {
    const value = defPropRo({}, 'dt', new Date())
    const clone = deepClone(value, true)

    expect(clone).to.be.a(Object)
    expect(clone).not.to.be(value)
    expect(clone.dt).to.be.a(Date)
    expect(clone.dt).not.to.be(value.dt)
    expect(clone.dt).to.eql(value.dt)
  })

  it('clone JS RegExp objects', function () {
    const value = /\s+/gi
    value.lastIndex = 5
    const clone = deepClone(value, true)

    expect(clone).to.be.an(RegExp)
    expect(clone).not.to.be(value)
    expect('' + clone).to.be('' + value)
    expect(clone.lastIndex).to.be(value.lastIndex)
  })

  it('clone JS RegExp properties', function () {
    const value = defPropWr({}, 're', /\s+/gi)
    value.re.lastIndex = 5
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone.re).to.be.an(RegExp)
    expect(clone).not.to.be(value)
    expect(clone.re).not.to.be(value.re)
    expect(clone.re.lastIndex).to.be(5)
    expect(Object.getOwnPropertyNames(clone) + '').to.equal('re')
  })

  itif(hasSymbol, 'clone non-enum Symbol() property names', function () {
    const symbl = Symbol()
    const value = defPropRo({}, symbl, 'a')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property(symbl as any, 'a')
  })

  itif(hasSymbol, 'clone non-enum Symbol() property values', function () {
    const symbl = Symbol()
    const value = defPropRo({}, 'a', symbl)
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property('a', symbl)
  })

  it('clone non-enumerable getter and setters.', function () {
    const value = (function () {
      let _foo = 'bar'
      return Object.defineProperty({}, 'foo', {
        get () {
          return _foo
        },
        set (newValue) {
          _foo = newValue
        },
      })
    })()
    const clone = deepClone(value, true)

    expect(clone).not.to.be(value)
    expect(clone.foo).to.be('bar')
    clone.foo = 'BAZ'
    expect(clone.foo).to.be('BAZ')
    expect(JSON.stringify(value)).to.be('{}')
  })

})
