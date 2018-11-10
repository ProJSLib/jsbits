
const propertyIsEnumerable = Object.prototype.propertyIsEnumerable

/**
 * Determinates if an object has _own_ properties, including `Symbol` and
 * (optionally) the non-enumerable properties.
 *
 * Primitive types (number, string, etc) always returns `false`.
 *
 * If you want to include non-enumerables properties, pass `true` in the
 * second parameter.
 *
 * @param {any} obj Testing object
 * @param {boolean} [includeNonEnum=false] Include non-enumerable properties?
 * @returns {boolean} `true` if the object has properties.
 * @since 1.0.0
 */
const hasOwnProperties = function _hasOwnProperties<T> (obj: T, includeNonEnum?: boolean) {

  if (obj && typeof obj == 'object') {
    const props = Object.getOwnPropertyNames(obj)

    for (let i = 0; i < props.length; i++) {
      if (includeNonEnum || propertyIsEnumerable.call(obj, props[i])) {
        return true
      }
    }
  }

  return false
}

export = hasOwnProperties
