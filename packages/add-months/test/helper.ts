/*
  Helper for convertion from strings to local and utc dates.
*/

const _utc = <T extends number> (dt: T[]) => new Date(
  Date.UTC(dt[0], dt[1] - 1, dt[2], dt[3] | 0, dt[4] | 0, dt[5] | 0, dt[6] | 0))

/**
 * Helper to create a local date with a string.
 *
 * It, allows to get a local date with only the date part (yyyy-mm-dd).
 *
 * Also, it normalizes the behavior of the Date ctor, since some versions
 * takes (against the specs) a full date string with no timezone as UTC.
 */
const dt = (str: string) => {

  if (str[0] === '^') { // special cases in info-dates.ts
    return _utc(str.slice(1).split(',') as any)
  }

  // if s starts with a digit, we have a JSON format
  if ('0123456789'.indexOf(str[0]) >= 0) {
    // split all parts
    const a = str.split(/[-T: ]/) as any
    // coerces to number
    return new Date(a[0], a[1] - 1, a[2], a[3] | 0, a[4] | 0, a[5] | 0, a[6] | 0)
  }

  // not a JSON format (ex: 'Jan 7 2017 23:59:59 GMT-0500')
  return new Date(str)
}

/**
 * Creates an UTC date
 */
const ut = (s: string) => {

  // first, check the format
  if ('0123456789'.indexOf(s[0]) < 0) {
    return dt(s) // not json date
  }

  return _utc(s.split(/[-T: ]/) as any)
}

export = {
  dt,
  ut,
}
