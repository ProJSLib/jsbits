/// <reference lib="es2015.core" />
/// <reference lib="es2015.collection" />
/// <reference lib="es2015.reflect" />

type CloneFn = <T> (obj: T) => T
type GetKeysFn = (obj: any, type: string) => Array<string | symbol>

/**
 * Cloning method of various types.
 */
const enum ObjType {
  Simple = 1,
  Array,
  ArrayBuffer,
  DataView,
  MapOrSet,
  Error,
  AsIs,
}

/**
 * Clonable types with special handlers
 */
const clonable: { [k: string]: ObjType } = {
  Date: ObjType.Simple,
  RegExp: ObjType.Simple,
  String: ObjType.Simple,
  Number: ObjType.Simple,
  Boolean: ObjType.Simple,
  Float32Array: ObjType.Simple,
  Float64Array: ObjType.Simple,
  Int8Array: ObjType.Simple,
  Int16Array: ObjType.Simple,
  Int32Array: ObjType.Simple,
  Uint8Array: ObjType.Simple,
  Uint8ClampedArray: ObjType.Simple,
  Uint16Array: ObjType.Simple,
  Uint32Array: ObjType.Simple,
  Array: ObjType.Array,
  ArrayBuffer: ObjType.ArrayBuffer,
  SharedArrayBuffer: ObjType.ArrayBuffer,
  DataView: ObjType.DataView,
  Error: ObjType.Error,
  Map: ObjType.MapOrSet,
  Set: ObjType.MapOrSet,
  Atomics: ObjType.AsIs,
  JSON: ObjType.AsIs,
  Math: ObjType.AsIs,
  Promise: ObjType.AsIs,
  WeakMap: ObjType.AsIs,
  WeakSet: ObjType.AsIs,
  XMLHttpRequest: ObjType.AsIs,
}

const arrayLike = [
  'Array',
  'String',
  'Float32Array',
  'Float64Array',
  'Int8Array',
  'Int16Array',
  'Int32Array',
  'Uint8Array',
  'Uint8ClampedArray',
  'Uint16Array',
  'Uint32Array',
]

/*
  Want support for edge cases?
  See https://github.com/dankogai/js-object-clone/blob/master/object-clone.js
*/
const _OP = Object.prototype
const _toString = _OP.toString
const _ownKeys = typeof Reflect === 'object' &&
  typeof Reflect.ownKeys === 'function' && Reflect.ownKeys

/**
 * Creates a function to filter out non-enumerable keys.
 *
 * @returns {function} filter
 * @private
 */
const getEnumFilter = () => {
  const _isEnum = _OP.propertyIsEnumerable
  return function (this: {}, sym: symbol) {
    return _isEnum.call(this, sym)
  }
}

/**
 * Creates a function to get enumerable symbol names of an object.
 *
 * @param {boolean} exact All keys?
 * @returns {Function} Extractor
 * @private
 */
const getKeyGetter = function (exact: boolean) {

  // istanbul ignore next
  const _keys = exact ? Object.getOwnPropertyNames : Object.keys
  const _getSymbols = Object.getOwnPropertySymbols

  // istanbul ignore next: until we can test IE11
  if (!_getSymbols) {
    return _keys
  }

  // All the keys, including the non-enumerable ones
  // istanbul ignore if: until we can test IE11
  if (exact) {
    return (obj: any) => {
      const objkeys = _keys(obj) as Array<string | symbol>
      const symbols = _getSymbols(obj)
      return symbols.length ? objkeys.concat(symbols) : objkeys
    }
  }

  // Only enumerable keys and symbols
  const _filter = getEnumFilter()
  return (obj: any) => {
    const objkeys = _keys(obj) as Array<string | symbol>
    const symbols = _getSymbols(obj)
    return symbols.length ? objkeys.concat(symbols.filter(_filter, obj)) : objkeys
  }
}

/**
 * Creates a function to get the properties and symbol names of an object.
 *
 * @param {boolean} exact Include non-enum keys?
 * @returns {Function} Extractor
 * @private
 */
const getKeysFac = function (exact: boolean) {

  // Avoid creating multiple anonymous functions
  const _re = /\D/
  const _filtIdx = (prop: string | symbol) => _re.test(prop as any) && prop !== 'length'
  const _getKeys = exact && _ownKeys || getKeyGetter(exact)

  return (obj: {}, type: string) => {
    const objkeys = _getKeys(obj) as Array<string | symbol>
    return ~arrayLike.indexOf(type) ? objkeys.filter(_filtIdx) : objkeys
  }
}

/**
 * Clone the Map or Set and copy its elements.
 *
 * @param {Map|Set} src Object to copy
 * @param {Function} fn Cloner
 * @param {string} type Type of object
 * @returns {Map|Set} The clone
 * @private
 */
const cloneMapOrSet = <T=any> (src: Map<T, T> | Set<T>, fn: CloneFn, type?: string) => {
  const dest = new (src as any).constructor()

  // IE11 will not copy items, anyway, we need clone keys and values
  const cb = type === 'Set'
    ? function (this: Set<T>, v: T) { this.add(fn(v)) }
    : function (this: Map<T, T>, v: T, k: T) { this.set(fn(k), fn(v)) }

  ;(src as Set<T>).forEach(cb, dest)
  return dest
}

/**
 * Clone the given DataView object.
 *
 * @param {DataView} src Object to clone
 * @returns {DataView} Clone
 * @private
 */
const cloneDataView = (src: DataView) => {
  const buffer = src.buffer.slice(0)
  return new (src as any).constructor(buffer, src.byteOffset, src.byteLength)
}

const cloneError = (src: Error) => {
  const err = new (src as any).constructor(src.message)
  return Object.defineProperty(err, 'stack', {
    value: src.stack, configurable: true, writable: true,
  })
}

const cloneFn: { [k: number]: (obj: any, fn: CloneFn, _?: string) => any } = {
  [ObjType.AsIs]: (obj: any) => obj,
  [ObjType.ArrayBuffer]: (obj: any) => obj.slice(0),
  [ObjType.DataView]: cloneDataView,
  [ObjType.Error]: cloneError,
  [ObjType.MapOrSet]: cloneMapOrSet,
}

/**
 * Creates a new object intance of the given type.
 *
 * @param {object} obj Non-null object
 * @param {string} type Object type
 * @param {Function} fn Cloner
 * @returns {object} The new instance
 * @private
 */
const createObject = (obj: any, type: string, fn: CloneFn) => {
  const cloneType = clonable[type]

  if (cloneType === ObjType.Simple) {
    return new obj.constructor(obj.valueOf())
  }

  if (cloneType === ObjType.Array) {
    return obj.map(fn)  // Faster array cloning
  }

  if (cloneFn[cloneType]) {
    return cloneFn[cloneType](obj, fn, type)
  }

  return type.lastIndexOf(' Iterator', type.length - 9) > -1
    ? obj : Object.create(Object.getPrototypeOf(obj))
}

/**
 * Factory to create a "clone" function for loosy or exact mode.
 *
 * @param {Function} getKeys Keys & symbols extractor
 * @returns {Function} Cloner
 * @private
 */
// codebeat:disable[ABC,BLOCK_NESTING]
const cloneFac = function (getKeys: GetKeysFn) {

  const _clone = function _clone<T> (obj: any): T { // -eslint-disable-line max-statements

    // Filter out null, undefined, NaN, primitive values, and functions
    if (obj !== Object(obj) || typeof obj === 'function') {
      return obj
    }

    // The type also allows optimize the getKeys function.
    const type = _toString.call(obj).slice(8, -1)

    // Get a new object of the same type and the properties of the source
    const clone = createObject(obj, type, _clone)
    const props = getKeys(obj, type)

    for (let i = 0; i < props.length; i++) {
      const prop = props[i]
      const desc = Object.getOwnPropertyDescriptor(obj, prop)!

      // NOTE: `value` must be excluded for setter/getter
      if (desc.value !== undefined) {
        desc.value = _clone((obj as any)[prop])
      }

      Object.defineProperty(clone, prop, desc)
    }

    return clone
  }

  return _clone
}
// codebeat:enable[ABC,BLOCK_NESTING]


/**
 * Deep clone of enumerable properties.
 *
 * @param {object} obj Any object
 * @returns {object} The clone.
 * @private
 */
const looseClone = cloneFac(getKeysFac(false))

/**
 * Deep clone of all the properties, including the non-enumerable ones.
 *
 * @param {object} obj Any object or value
 * @returns {object} The clone.
 * @private
 */
const exactClone = cloneFac(getKeysFac(true))

/**
 * Performs a deep cloning of an object own properties, preserving its
 * prototype.
 *
 * By default `cloneObject` works in "loosy mode", where it clones only
 * the _enumerable_ properties. Any other properties are ignored.
 *
 * To enable the "exact mode" and clone all the properties, pass `true`
 * in the second parameter.
 *
 * Both modes retain all the attributes of the copied properties (enumerable,
 * configurable, writable) and correctly transfer the `get` and/or `set`
 * methods, although these, like the other function-type values,
 * _are copied by reference_.
 *
 * Try to limit the usage of this function to POJOs, as this function does not
 * work for objects with constructor that requires parameters (other than
 * some JS own Objects), nor objects with recursive references.
 *
 * @template T
 * @param {T} value Value to clone, mostly an object or array.
 * @param {boolean} [exact=false] If `true`, duplicate the attributes of the property descriptors
 * @returns {T} The cloned object or value.
 * @since 1.0.0
 */
const deepClone = function _deepClone<T> (value: T, exact?: boolean): T {
  return exact ? exactClone(value) : looseClone(value)
}

// Export here so that TS places the JSDdoc in the correct position.
export = deepClone
