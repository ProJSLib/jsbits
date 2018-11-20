/* eslint-disable no-new-wrappers */
import expect = require('expect.js')
import deepClone = require('..')

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

  it('works with JS String objects (loosy mode)', function () {
    const value = new String('ok')
    ;(value as any)._foo = 'foo'
    const clone = deepClone(value)

    expect(clone).to.be.an(String)
    expect(clone).not.to.be(value)
    expect(clone + '').to.equal(value + '')
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('works with JS String objects (exact mode)', function () {
    const value = new String('ok')
    ;(value as any)._foo = 'foo'
    const clone = deepClone(value, true)

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

  it('works with JS RegExp objects (loosy mode)', function () {
    const value = /\s+/gi
    const clone = deepClone(value)

    expect(clone).to.be.an(RegExp)
    expect(clone).not.to.be(value)
    expect('' + clone).to.be('' + value)
  })

  it('works with JS RegExp objects (exact mode)', function () {
    const value = /\s+/gi
    value.lastIndex = 5
    const clone = deepClone(value, true)

    expect(clone).to.be.an(RegExp)
    expect(clone).not.to.be(value)
    expect('' + clone).to.be('' + value)
    expect(clone.lastIndex).to.be(value.lastIndex)
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
