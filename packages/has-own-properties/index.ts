/// <reference lib="es2017" />

const ObjectProto = Object.prototype

// Optimize symbols detection
const [hasSymbolsInc, hasSymbolsExc] = (function () {

  const _isEnumerable = ObjectProto.propertyIsEnumerable
  const _getSymbols = Object.getOwnPropertySymbols
  // istanbul ignore next
  const _notSymbols = () => false

  // istanbul ignore else: Until we can test IE11
  if (_getSymbols) {
    return [
      (obj: object) => _getSymbols(obj).length > 0,
      (obj: object) => {
        const syms = _getSymbols(obj)
        for (let i = 0; i < syms.length; i++) {
          if (_isEnumerable.call(obj, syms[i])) {
            return true
          }
        }
        return false
      },
    ]
  }

  // istanbul ignore next
  return [_notSymbols, _notSymbols]
})()

/**
 * Determines whether an object has _own_ properties or Symbol names, including (optionally)
 * the non-enumerable ones.
 *
 * This function is especially useful in plain objects, to check if they are
 * "empty".
 *
 * The test includes getters, setters and `Symbol` types names and values, in
 * the environments that support them.
 *
 * By default, this function checks only enumerable properties and symbols, if
 * you want to check also the non-enumerables ones, pass `true` in the
 * additional parameter.
 *
 * _**NOTE:** Testing primitive types is allowed, but these always return
 * `false`, even the non-empty strings._
 *
 * @param {any} obj Testing object or value
 * @param {boolean} [includeNonEnum=false] Include non-enumerable properties?
 * @returns {boolean} `true` if the object has own properties.
 * @since 1.0.0
 */
const hasOwnProperties = function _hasOwnProperties (obj: any, includeNonEnum?: boolean) {

  if (obj && typeof obj === 'object') {

    if (includeNonEnum) {
      return Object.getOwnPropertyNames(obj).length > 0 || hasSymbolsInc(obj)
    }

    return Object.keys(obj).length > 0 || hasSymbolsExc(obj)
  }

  return false
}

export = hasOwnProperties
