/* eslint-disable no-new-wrappers */
/// <reference lib="es6" />

import expect = require('expect.js')
import deepClone = require('..')
//import deepClone = require('lodash.clonedeep')

declare const Atomics: any
declare const XMLHttpRequest: any

const itif = function (condition: any, msg: string, fn?: () => any) {
  // istanbul ignore next
  (condition ? it : it.skip)(msg, fn)
}

const hasTypeds = typeof Uint8Array === 'function'
const hasSymbol = typeof Symbol === 'function'
const hasMap = typeof Map === 'function'
const hasSet = typeof Set === 'function'

// istanbul ignore next
const is = Object.is || function (x: any, y: any) {
  return x === y
    ? (x !== 0 || (1 / x === 1 / y))
    : (x !== x && y !== y)   // eslint-disable-line no-self-compare
}
const stringify = JSON.stringify
const toStrTag = Object.prototype.toString

const builtIns = [{}, [], new Boolean(), new String('s'), new Number(1), new Date(), /./g, NaN, undefined]
// istanbul ignore else
if (hasSymbol) {
  builtIns.push(Symbol('@'))
}

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
    const value = Object.create(null)
    value._str = 's'
    value._num = 1
    const clone = deepClone(value)

    expect(clone).not.have.property('prototype')
    expect(clone).not.to.be(value)
    expect(clone).to.eql(value)
  })

  it('must clone nested objects with no prototype', function () {
    const obj = Object.create(null)
    obj._str = 's'
    obj._num = 1
    const value = { obj }
    const clone = deepClone(value)

    expect(clone.obj).not.have.property('prototype')
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
    expect(clone).to.eql(value)
    expect((clone as any)._foo).to.be((value as any)._foo)
  })

  it('works with JS RegExp objects', function () {
    const value = /\s+/gi
    const clone = deepClone(value)

    expect(clone).to.be.an(RegExp)
    expect(clone).not.to.be(value)
    expect('' + clone).to.be('' + value)
  })

  it('works with Arrays', function () {
    const value = [null, undefined, false, '', 1]
    const clone = deepClone(value)

    expect(clone).to.be.an(Array)
    expect(clone).not.to.be(value)
    expect(stringify(clone)).to.be(stringify(value))
    expect(clone.length).to.be(value.length)
  })

  it('must clone arrays with correct length, but only the defined elements', function () {
    const value = new Array(100)
    value[10] = 'a'
    value[20] = undefined
    value[50] = 'b'
    const clone = deepClone(value)

    expect(clone).to.be.an(Array)
    expect(clone).not.to.be(value)
    expect(clone.length).to.be(value.length)
    expect(stringify(clone)).to.be(stringify(value))
    expect(stringify(Object.keys(clone))).to.be(stringify(Object.keys(value)))
  })

  it('must clone objects in array elements', function () {
    const value = [{ foo: 'a' }, { bar: 1 }, { baz: { x: 2 } }]
    const clone = deepClone(value)

    expect(clone).to.be.an(Array)
    expect(clone).not.to.be(value)
    expect(clone.length).to.be(value.length)
    expect(stringify(clone)).to.be(stringify(value))
  })

  it('clone arguments as an object w/prototype', function () {
    // @ts-ignore
    const value = (function (a, b, c) { return arguments })('a', new Date())
    const clone = deepClone(value)

    expect(clone).not.have.property('prototype')
    expect(clone).to.have.property('length', value.length)
    expect(stringify(clone)).to.be(stringify(value))
    expect(clone[0]).to.be(value[0])
    expect(clone[1]).to.eql(value[1])
    expect(clone[2]).to.be(undefined)
  })

  itif(hasSymbol, 'must copy Symbol() property names by reference', function () {
    const symb1 = Symbol()
    const symb2 = Symbol()
    const value = { [symb1]: 'a' }
    Object.defineProperty(value, symb2, { value: 'hidden', configurable: true })

    const clone = deepClone(value)
    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property(symb1 as any, 'a')
    expect(clone).not.have.property(symb2 as any)
  })

  itif(hasSymbol, 'must copy Symbol() property values by reference', function () {
    const symbl = Symbol()
    const value = { a: symbl }
    const clone = deepClone(value)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property('a', symbl)
  })

  itif(hasTypeds, 'must clone TypedArrays objects', function () {
    const values = [
      Uint8Array.of(1, 2, 3),
      Uint16Array.of(1, 2, 3),
      Uint32Array.of(1, 2, 3),
      Float32Array.of(1.0, 2.0, 3.0),
      Float64Array.of(1.0, 2.0, 3.0),
    ]

    values.forEach((value) => {
      const clone = deepClone(value)
      expect(toStrTag.call(clone)).to.be(toStrTag.call(value))
      expect(clone).not.to.be(value)
      expect(clone).to.have.property('length', value.length)
      expect(clone).to.have.property('byteLength', value.byteLength)
      expect(clone).to.have.property('byteOffset', value.byteOffset)
      expect(String(clone)).to.be(String(value))
    })
  })

  itif(hasMap, 'must clone Map objects', function () {
    const value = new Map()
    value.set('foo', 'bar')
    const clone = deepClone(value)

    expect(clone).to.be.a(Map)
    expect(clone).not.to.be(value)
    expect(clone.size).to.be(1)
    expect(clone.get('foo')).to.be('bar')
  })

  itif(hasMap, 'clone JS built-in objects as key in Maps', function () {
    const value = new Map()
    builtIns.forEach((k, ix) => { value.set(k, ix + 1) })

    const clone = deepClone(value)
    expect(clone).to.be.a(Map)
    expect(clone).to.have.property('size', value.size)

    let ix = 0
    clone.forEach((v, k) => {
      const k2 = builtIns[ix++]
      expect(typeof k).to.be(typeof k2)
      expect(toStrTag.call(k)).to.be(toStrTag.call(k2))
      expect(v).to.be(value.get(k2))
    })
  })

  itif(hasSet, 'must clone Set objects', function () {
    const value = new Set()
    value.add('foo')
    const clone = deepClone(value)

    expect(clone).to.be.an(Set)
    expect(clone).not.to.be(value)
    expect(clone.size).to.be(1)
    expect(clone.has('foo')).to.be(true)
  })

  itif(hasSet, 'clone JS built-in objects as Set values', function () {
    const value = new Set()
    builtIns.forEach((v) => { value.add(v) })

    const clone = deepClone(value)
    expect(clone).to.be.a(Set)
    expect(clone).to.have.property('size', value.size)

    let ix = 0
    clone.forEach((v) => {
      const v2 = builtIns[ix++]
      expect(typeof v).to.be(typeof v2)
      expect(toStrTag.call(v)).to.be(toStrTag.call(v2))
      expect(String(v)).to.be(String(v2))
    })
  })

  itif(typeof Buffer === 'function', 'clone node\'s Buffer objects', function () {
    const src = Uint8Array.from([61, 62, 63]).buffer
    // istanbul ignore next
    const value = Buffer.alloc ? Buffer.from(src) : new Buffer(src)
    const clone = deepClone(value)

    expect(clone).to.be.a(Buffer)
    expect(clone).not.to.be(value)
    expect(value.equals(clone)).to.be(true)
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

  it('can duplicate class instances with zero-parameters Ctors', function () {
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
    expect(toStrTag.call(clone)).to.eql(toStrTag.call(value))
    expect(clone.toString()).to.eql(value.toString())
    expect(clone.toJSON()).to.eql(value.toJSON())
  })

  it('must preserve the attributes of the properties', function () {
    const value = {} as any
    Object.defineProperties(value, {
      _str: { value: 's', enumerable: true, writable: true },
      _num: { value: 1, enumerable: true, configurable: true },
    })
    const clone = deepClone(value)

    expect(clone).to.be.an(Object)
    expect(clone).to.eql(value)
    expect(clone._str).to.be(value._str)
    expect(clone._num).to.be(value._num)

    const descStr = Object.getOwnPropertyDescriptor(clone, '_str')
    expect(descStr).to.have.property('enumerable', true)
    expect(descStr).to.have.property('configurable', false)
    expect(descStr).to.have.property('writable', true)
    const descNum = Object.getOwnPropertyDescriptor(clone, '_num')
    expect(descNum).to.have.property('enumerable', true)
    expect(descNum).to.have.property('configurable', true)
    expect(descNum).to.have.property('writable', false)
  })

  it('must follow the prototype chain of object instances', function () {
    function Bar (this: any) {
      Object.defineProperty(this, '_foo', {
        value: 'foo',
        enumerable: true,
      })
      this._bar = 'bar'
    }
    function Foo (this: any) {
      Bar.call(this)
    }
    Foo.prototype = Object.create(Bar.prototype)
    Foo.prototype.constructor = Foo

    // @ts-ignore
    const value = new Foo()
    expect(value).to.be.a(Foo)
    expect(value).to.be.a(Bar)

    const clone = deepClone(value)
    expect(clone).to.be.a(Foo)
    expect(clone).to.be.a(Bar)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property('_foo', value._foo)
    expect(clone).to.have.property('_bar', value._bar)

    const descFoo = Object.getOwnPropertyDescriptor(clone, '_foo')
    expect(descFoo).to.have.property('enumerable', true)
    expect(descFoo).to.have.property('configurable', false)
    expect(descFoo).to.have.property('writable', false)
    const descBar = Object.getOwnPropertyDescriptor(clone, '_bar')
    expect(descBar).to.have.property('enumerable', true)
    expect(descBar).to.have.property('configurable', true)
    expect(descBar).to.have.property('writable', true)
  })

  itif(typeof ArrayBuffer !== 'undefined', 'must clone ArrayBuffer', function () {
    const value = new ArrayBuffer(32)
    const clone = deepClone(value)
    expect(clone).to.be.a(ArrayBuffer)
    expect(clone).to.not.be(value)
    expect(clone).to.have.property('byteLength', value.byteLength)

    const obj1 = { ab: value }
    const obj2 = deepClone(obj1)
    expect(obj2).to.be.an(Object)
    expect(obj2).to.have.property('ab')
    expect(obj2.ab).to.be.a(ArrayBuffer)
    expect(obj2.ab).to.not.be(value)
    expect(obj2.ab).to.have.property('byteLength', value.byteLength)
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

  it('some types are cloned only by reference', function () {
    const UNDEF = 'undefined'
    const value = {
      JSON,
      Math,
    } as any
    /* eslint-disable no-unused-expressions */
    // istanbul ignore next
    typeof Atomics !== UNDEF && (value.Atomics = Atomics)
    // istanbul ignore next
    typeof Promise !== UNDEF && (value.Promise = Promise.resolve())
    // istanbul ignore next
    typeof WeakMap !== UNDEF && (value.WeakMap = new WeakMap())
    // istanbul ignore next
    typeof WeakSet !== UNDEF && (value.WeakSet = new WeakSet())
    // istanbul ignore next
    typeof XMLHttpRequest !== UNDEF && (value.xhr = new XMLHttpRequest())
    /* eslint-enable no-unused-expressions */

    const clone = deepClone(value)
    Object.keys(value).forEach((k) => { expect(clone).have.property(k, value[k]) })
  })

  itif(typeof Array.prototype.entries === 'function', 'Iterators are copied by reference', function () {
    const value = [1, 2, 3].entries()
    const clone = deepClone(value)
    expect(clone).to.be(value)
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

  const defPropRo = <T> (o: T, p: string | symbol | number,
    value: any) => Object.defineProperty(o, p, { value })

  const defPropWr = <T> (o: T, p: string | symbol | number,
    value: any) => Object.defineProperty(o, p, { value, writable: true })

  it('clone String objects', function () {
    const value = defPropRo(new String('ok'), '_foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.a(String)
    expect(clone).not.to.be(value)
    expect(clone.valueOf()).to.be(value.valueOf())
    expect(clone._foo).to.be(value._foo)
  })

  it('clone String objects in properties', function () {
    const value = defPropRo({}, '_foo', new String('ok'))
    defPropRo(value._foo, 'foo', 'Bar')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone + '').to.be(value + '')
    expect(clone._foo).to.be.a(String)
    expect(clone._foo).not.to.be(value._foo)
    expect(clone._foo.foo).to.be(value._foo.foo)
  })

  it('clone Number objects', function () {
    const value = defPropRo(new Number(123), '_foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.a(Number)
    expect(clone).not.to.be(value)
    expect(clone.valueOf()).to.be(value.valueOf())
    expect(clone._foo).to.be(value._foo)
  })

  it('clone Number objects in properties', function () {
    const value = defPropWr({}, '_foo', new Number(123))
    defPropRo(value._foo, 'foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone._foo.valueOf()).to.be(value._foo.valueOf())
    expect(clone._foo).to.be.a(Number)
    expect(clone._foo).not.to.be(value._foo)
    expect(clone._foo.foo).to.be(value._foo.foo)
  })

  it('clone Date objects in properties', function () {
    const value = defPropRo({}, '_foo', new Date())
    defPropRo(value._foo, 'foo', 'foo')
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).not.to.be(value)
    expect(clone._foo).to.be.a(Date)
    expect(clone._foo).not.to.be(value._foo)
    expect(clone._foo).to.eql(value._foo)
    expect(clone._foo.foo).to.be(value._foo.foo)
  })

  it('clone RegExp objects', function () {
    const value = /\s+/gi
    value.lastIndex = 5
    const clone = deepClone(value, true)

    expect(clone).to.be.a(RegExp)
    expect(clone).not.to.be(value)
    expect('' + clone).to.be('' + value)
    expect(clone.lastIndex).to.be(value.lastIndex)
  })

  it('clone RegExp properties', function () {
    const value = defPropWr({}, 're', /\s+/gi)
    value.re.lastIndex = 5
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone.re).to.be.a(RegExp)
    expect(clone).not.to.be(value)
    expect(clone.re).not.to.be(value.re)
    expect(clone.re.lastIndex).to.be(5)
    expect(Object.getOwnPropertyNames(clone) + '').to.equal('re')
  })

  it('clone arguments as an object w/prototype', function () {
    // @ts-ignore
    const value = (function (a, b, c) { return arguments })('a', new Date())
    const clone = deepClone(value, true)

    expect(clone).not.have.property('prototype')
    expect(clone).to.have.property('length', value.length)
    expect(stringify(clone)).to.be(stringify(value))
    expect(clone[0]).to.be(value[0])
    expect(clone[1]).to.eql(value[1])
    expect(clone[2]).to.be(undefined)
    // istanbul ignore else
    if (hasSymbol) {
      expect(clone).to.have.property(Symbol.iterator as any)
    }
  })

  it('must clone Error objects', function () {
    const errors = [
      EvalError('eval!'),
      ReferenceError('ref!'),
      SyntaxError('syntax!'),
      TypeError('type!'),
    ]

    const value = Error('Ops!')
    Object.defineProperties(value, {
      code: { value: 5, enumerable: true },
      number: { value: 1, enumerable: true },
    })

    const clone = deepClone(value)
    expect(clone).to.be.an(Error)
    expect(clone + '').to.be(value + '')
    expect(clone).to.have.property('stack', value.stack)
    expect(clone).to.have.property('code', (value as any).code)
    expect(clone).to.have.property('number', (value as any).number)

    errors.forEach((err) => {
      const dup = deepClone(err)
      expect(dup).to.be.an(Error)
      expect(dup).not.to.be(err)
      expect('' + dup).to.be('' + err)
    })
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

  itif(typeof DataView !== 'undefined', 'must clone DataView objects', function () {
    const value = new DataView(new ArrayBuffer(32), 8, 15)

    const len = value.byteLength / 2
    for (let i = 0; i < len; i++) {
      value.setInt16(i, i + 1)
    }
    defPropRo(value, '_foo', 'Foo')

    const clone = deepClone(value, true)
    expect(clone).to.be.a(DataView)
    expect(clone).to.have.property('byteLength', value.byteLength)
    expect(clone).to.have.property('byteOffset', value.byteOffset)
    expect(clone).to.have.property('_foo', (value as any)._foo)
    expect(clone.buffer.byteLength).to.be(value.buffer.byteLength)

    for (let i = 0; i < len; i++) {
      const v1 = clone.getInt16(i)
      const v2 = value.getInt16(i)
      expect(v1).to.be(v2)
    }
  })

  itif(hasTypeds, 'must clone TypedArrays objects', function () {
    const value = Uint8Array.of(1, 2, 3)
    defPropRo(value, '_foo', 'Foo')

    const clone = deepClone(value, true)
    expect(clone).to.be.a(Uint8Array)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property('length', value.length)
    expect(clone).to.have.property('byteLength', value.byteLength)
    expect(clone).to.have.property('byteOffset', value.byteOffset)
    expect(clone).to.have.property('_foo', (value as any)._foo)
    expect(String(clone)).to.be(String(value))
  })

  it('must preserve the attributes of the properties', function () {
    const value = {} as any
    Object.defineProperties(value, {
      _str: { value: 's', writable: true },
      _num: { value: 1, configurable: true },
    })
    const clone = deepClone(value, true)

    expect(clone).to.be.an(Object)
    expect(clone).to.eql(value)
    expect(clone._str).to.be(value._str)
    expect(clone._num).to.be(value._num)

    const descStr = Object.getOwnPropertyDescriptor(clone, '_str')
    expect(descStr).to.have.property('enumerable', false)
    expect(descStr).to.have.property('configurable', false)
    expect(descStr).to.have.property('writable', true)
    const descNum = Object.getOwnPropertyDescriptor(clone, '_num')
    expect(descNum).to.have.property('enumerable', false)
    expect(descNum).to.have.property('configurable', true)
    expect(descNum).to.have.property('writable', false)
  })

  it('must follow the prototype chain of object instances', function () {
    function Bar (this: any) {
      defPropRo(this, '_foo', 'foo')
    }
    function Foo (this: any) {
      Bar.call(this)
    }
    Foo.prototype = Object.create(Bar.prototype)
    Foo.prototype.constructor = Foo

    // @ts-ignore
    const value = new Foo()
    expect(value).to.be.a(Foo)
    expect(value).to.be.a(Bar)

    const clone = deepClone(value, true)
    expect(clone).to.be.a(Foo)
    expect(clone).to.be.a(Bar)
    expect(clone).not.to.be(value)
    expect(clone).to.have.property('_foo', value._foo)

    const descFoo = Object.getOwnPropertyDescriptor(clone, '_foo')
    expect(descFoo).to.have.property('enumerable', false)
    expect(descFoo).to.have.property('configurable', false)
    expect(descFoo).to.have.property('writable', false)
  })

  itif(typeof Intl !== 'undefined', 'must clone Intl object', function () {
    const clone = deepClone(Intl, true)
    expect(clone).to.be.an(Object)
  })
})
