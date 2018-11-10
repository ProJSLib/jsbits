/*
  Want support for recursive objects?
  See https://github.com/dankogai/js-object-clone/blob/master/object-clone.js
*/
const _OP = Object.prototype
const _toString = _OP.toString
const _hasOwnProperty = _OP.hasOwnProperty

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

/**
 * Deep clone of enumerable properties, faster than exactClone.
 *
 * @param {object} obj Any object
 * @returns {object} The clone.
 * @private
 */
const looseClone = function<T> (obj: T): T {

  // Test for null, undefined, primitive, NaN, Symbol, or function value
  if (obj !== Object(obj) || typeof obj == 'function') {
    return obj
  }

  // Get a new object of the same type and the properties of the source
  const clone = createObject(obj)
  const props = Object.keys(obj)

  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const desc = Object.getOwnPropertyDescriptor(obj, prop)!

    if (desc.writable || !_hasOwnProperty.call(clone, prop)) {
      clone[prop] = looseClone((obj as any)[prop])
    }
  }

  return clone
}

/**
 * This is slow, but useful for exact duplication.
 *
 * @template T
 * @param {T} obj Any object or value
 * @returns {T} The clone.
 * @private
 */
const exactClone = function <T> (obj: T): T {

  // Test for null, undefined, primitive, NaN, Symbol, or function value
  if (obj !== Object(obj) || typeof obj == 'function') {
    return obj
  }

  // Get a new object of the same type and the properties of the source
  const clone = createObject(obj)
  const props = Object.getOwnPropertyNames(obj)

  for (let i = 0; i < props.length; i++) {
    const prop = props[i]
    const desc = Object.getOwnPropertyDescriptor(obj, prop)!

    // Avoid assignment if the prop is readonly and the clone already has it
    if (desc.writable || !_hasOwnProperty.call(clone, prop)) {
      // value is undefined for setter/getter
      if (desc.value !== undefined) {
        desc.value = exactClone((obj as any)[prop])
      }
      Object.defineProperty(clone, prop, desc)
    }
  }

  return clone
}


/**
 * Performs a deep cloning of an object own properties, preserving its
 * prototype.
 *
 * By default, `cloneObject` works in "loosy mode" where it clones only
 * the _enumerable_ properties; any other attribute of this properties
 * is removed.
 *
 * To enable the "exact mode" and clone all the properties, including its
 * attributes (enumerable, configurable, writable), pass `true` in the
 * second parameter.
 *
 * Try to limit the usage of this function to POJOs, this function does not
 * work for objects with constructor that requires parameters (other than
 * some JS own Objects), nor objects with recursive references.
 *
 * _**NOTE:** Functions, getters and setters are copied by reference._
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
