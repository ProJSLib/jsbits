/// <reference lib="es2015.core" />
/*
  Want support for recursive objects?
  See https://github.com/dankogai/js-object-clone/blob/master/object-clone.js
*/
const _OP = Object.prototype
const _toString = _OP.toString
const _hasOwnProperty = _OP.hasOwnProperty

/**
 * Get the enumerable property and symbol names of an object.
 *
 * @param {Function} _keys The object
 * @returns {Function} Extractor
 */
const getEnumKeys = (function () {

  const _getSymbols = Object.getOwnPropertySymbols
  const _keys = Object.keys
  // istanbul ignore next: Until we can test IE11
  if (!_getSymbols) {
    return _keys
  }

  // Avoid creating multiple anonymous functions
  const _isEnum = _OP.propertyIsEnumerable
  const _filter = function (this: {}, sym: Symbol) {
    return _isEnum.call(this, sym)
  }

  return (obj: {}) => {
    const objkeys = _keys(obj) as Array<string | symbol>
    const symbols = _getSymbols(obj)

    return symbols.length
      ? objkeys.concat(symbols.filter(_filter, obj))
      : objkeys
  }
})()

/**
 * Get the all the properties and symbol names of an object, including the
 * non-enumerable ones.
 *
 * @param {Function} _keys The object
 * @returns {Function} Extractor
 */
const getAllKeys = (function () {

  const _getSymbols = Object.getOwnPropertySymbols
  const _keys = Object.getOwnPropertyNames
  // istanbul ignore next: Until we can test IE11
  if (!_getSymbols) {
    return _keys
  }

  return (obj: {}) => {
    const objkeys = _keys(obj) as Array<string | symbol>
    const symbols = _getSymbols(obj)

    return symbols.length
      ? objkeys.concat(symbols)
      : objkeys
  }
})()

/**
 * Creates a new object intance of the given type.
 *
 * @param {object} obj Non-null object
 * @returns {object} The new instance
 * @private
 */
const createObject = <T extends Object> (obj: T): T & { [k: string]: any } => {

  switch (_toString.call(obj).slice(8, -1)) {
    case 'Date':
    case 'RegExp':
    case 'String':
    case 'Number':
    case 'Boolean':
      return new (obj as any).constructor(obj.valueOf())

    case 'Array':
      // It is to produce an empty array
      return new Array((obj as any).length) as any
  }

  return Object.create(Object.getPrototypeOf(obj))
}

const cloneFac = function (getKeys: typeof getAllKeys) {

  // codebeat:disable[ABC,BLOCK_NESTING]
  const _clone = function _clone<T> (obj: T): T {

    // Filter out null, undefined, NaN, primitive values, and functions
    if (obj !== Object(obj) || typeof obj == 'function') {
      return obj
    }

    // Get a new object of the same type and the properties of the source
    const clone = createObject(obj)
    const props = getKeys(obj)

    for (let i = 0; i < props.length; i++) {
      const prop = props[i]
      const desc = Object.getOwnPropertyDescriptor(obj, prop)!

      if (desc.writable || !_hasOwnProperty.call(clone, prop)) {

        // NOTE: `value` must be excluded for setter/getter
        if (desc.value !== undefined) {
          desc.value = _clone((obj as any)[prop])
        }

        Object.defineProperty(clone, prop, desc)
      }
    }

    return clone
  }
  // codebeat:enable[ABC,BLOCK_NESTING]

  return _clone
}


/**
 * Deep clone of enumerable properties.
 *
 * @param {object} obj Any object
 * @returns {object} The clone.
 * @private
 */
const looseClone = cloneFac(getEnumKeys)

/**
 * Deep clone of all the properties, including the non-enumerable ones.
 *
 * @param {object} obj Any object or value
 * @returns {object} The clone.
 * @private
 */
const exactClone = cloneFac(getAllKeys)

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
 * methods, although these, like the properties with function-type values,
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
const deepClone = function _deepClone<T> (value: T, exact?: boolean) {
  return exact ? exactClone(value) : looseClone(value)
}

// Export here so that TS places the JSDdoc in the correct position.
export = deepClone
