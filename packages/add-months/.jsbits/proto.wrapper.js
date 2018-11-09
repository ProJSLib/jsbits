/**
 * addMonths for the Date.prototype v$_VERSION
 * @license $_LICENSE
 */
/*
  Augments the Date.prototype with a new function `addMonths` that
  adds or subtract X months and returns the date without changing
  the source date.
*/
(function (DateProto) {
/*#if 1
$_PLACEHOLDER
//#else make linters happy */
  const addMonths = (x) => x
  //#endif

  Object.defineProperty(DateProto, 'addMonths', {
    value: function (count, asTUC) {
      return addMonths(this, count, asTUC)
    },
    configurable: true,
    writable: true,
  })

})(Date.prototype);
