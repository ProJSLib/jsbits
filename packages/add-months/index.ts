/**
 * Increment or decrement the given date by `count` months.
 *
 * @param {Date} date Local date
 * @param {number} count Months to add or substract
 * @returns {Date} New local date
 * @private
 */
const addMonthsLoc = (date: Date, count: number) => {
  // Get the day of this date, we just need to take care of days >28
  const day = date.getDate()

  // Set the month and change the day if it's above 28 to avoid overflow
  date.setMonth(date.getMonth() + count, day > 28 ? 28 : day)

  // Restore the day if necessary, preserving the month and we are done.
  if (day > 28) {
    const month = date.getMonth()
    /*
    "If there is an overflow in the day, the date is adjusted to the last
      valid day of the expected month."
    */
    date.setDate(day)
    if (date.getMonth() !== month) {
      date.setDate(0)
    }
  }

  return date
}

/**
 * Like the `addMonthsLoc` function, but using UTC methods.
 *
 * @param {Date} date UTC date
 * @param {number} count Months to add or substract
 * @returns {Date} New UTC date
 * @private
 */
const addMonthsUTC = (date: Date, count: number) => {
  const day = date.getUTCDate()

  date.setUTCMonth(date.getUTCMonth() + count, day > 28 ? 28 : day)

  if (day > 28) {
    const month = date.getUTCMonth()

    date.setUTCDate(day)
    if (date.getUTCMonth() !== month) {
      date.setUTCDate(0)
    }
  }

  return date
}


/**
 * Returns a date occurring `count` months after `startdate` or, if `count` is
 * negative, the date occurring `count` months before `startdate`.
 *
 * - If startdate is not a Date, string, or number that can be converted to a
 *    valid date, returns a new Date instance with an invalid date.
 *
 * - If count is evaluated as zero, returns a new Date instance with the
 *    the same value as startdate.
 *
 * - If there is an overflow in the day, the date is adjusted to the last
 *    valid day of the expected month.
 *
 * The third parameter is optional and indicates if the date is UTC. It is
 * necessary to differentiate UTC dates from locals to avoid errors due to the
 * [Daylight Saving Time](https://en.wikipedia.org/wiki/Daylight_saving_time)
 * (DST).
 *
 * This function does not change the original date.
 *
 * @param {Date|string|number} startdate A value parseable as a JavaScript Date
 * @param {number} count Number of months to add or substract
 * @param {boolean} [asUTC=false] If `true`, handle the date as UTC
 * @returns {Date} A new, adjusted Date instance.
 * @since 1.0.0
 */
const addMonths = function _addMonths (startdate: Date | string | number, count: number, asUTC?: boolean) {

  // For null, undefined, or booleans, return an invalid date.
  if (startdate == null || typeof startdate == 'boolean') {
    return new Date(NaN)
  }

  // Create a new `Date` instance.
  // Wrong types return NaN dates without throwing exceptions.
  const date = new Date(startdate as number)

  // Corce `count` with 'ToInt32'
  count |= 0

  // Filter out zero count and invalid dates.
  if (!count || isNaN(date as any)) {
    return date
  }

  // Return the result with the UTC methods if required by the flags
  return asUTC ? addMonthsUTC(date, count) : addMonthsLoc(date, count)
}

export = addMonths
