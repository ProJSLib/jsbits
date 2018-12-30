/**
 * Calculates the local date of the Easter day –aka _Pascha_ or
 * _Resurrection Sunday_– for years between 100 and 9999 in the
 * Gregorian calendar, based on Oudin's algorithm.
 *
 * Easter always falls on a Sunday between March 22 and April 25, inclusive.
 *
 * **NOTE:** The result for years less than 1583 _could be inaccurate_.
 *
 * This is a good algorithm, but calculating the Easter is not an exact
 * science or something consensuated, so expect discrepancies with older
 * or future implementations.
 *
 * @see [Paschalion at OrthodoxWiki](https://orthodoxwiki.org/Paschalion)
 *
 * @param {number} year Year for the desired date, between 100 and 9999
 * @returns {Date} Local date instance for the Easter day
 * @since 1.1.3
 */
const easterDay = function _easterDay (year: number) {

  // must be an integer in range
  if ((year |= 0) < 100 || year > 9999) {
    return new Date(NaN)
  }

  const floor = Math.floor

  const C = floor(year / 100)
  const G = year % 19

  const H = (C - (C >> 2) - floor((8 * C + 13) / 25) + 19 * G + 15) % 30
  const I = H - floor(H / 28) * (1 - floor(H / 28) * floor(29 / (H + 1)) * floor((21 - G) / 11))
  const J = (year + (year >> 2) + I + 2 - C + (C >> 2)) % 7
  const L = I - J

  const m = 3 + floor((L + 40) / 44)
  const d = L + 28 - 31 * (m >> 2)

  return new Date(year, m - 1, d, 0)
}

export = easterDay
