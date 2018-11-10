/*
  Date.prototype addMonths and addUTCMonths v$_VERSION
  @license $_LICENSE
*/
(function (DateProto) {
/*#if 1
$_PLACEHOLDER
//#else make linters happy */
  const $_NAME = (x) => x
  //#endif

  /**
   * @param {Date} _this Date instance, may be null, NaN, etc
   * @param {number} count months to add
   * @param {boolean} asUTC utc date?
   */
  var _addMonths = function (_this, count, asUTC) {

    if (_this instanceof Date) {
      var date = $_NAME(_this, count, asUTC)
      return _this.setTime(+date)
    }

    throw new TypeError('Method Date.prototype.add' +
      (asUTC ? 'UTC' : '') + 'Months called on incompatible receiver ' + _this)
  }

  Object.defineProperties(DateProto, {
    addMonths: {
      value: function (count) {
        return _addMonths(this, count, false)
      },
      configurable: true,
      writable: true,
    },
    addUTCMonths: {
      value: function (count) {
        return _addMonths(this, count, true)
      },
      configurable: true,
      writable: true,
    },
  })

})(Date.prototype);
