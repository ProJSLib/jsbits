/// <reference no-default-lib="true"/>
/// <reference lib="es5" />

// Extends the Date interface
interface Object {
  /**
   * Determines whether an object contains own properties, including `Symbol`
   * and (optionally) the non-enumerable properties.
   *
   * @param includeNonEnumerables If `true`, check also non-enumerable properties.
   */
  hasOwnProperties(includeNonEnumerables?: boolean): boolean;
}
