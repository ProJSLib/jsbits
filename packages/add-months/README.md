# @jsbits/add-months

_Part of the [JSBits][jsbits-url] suite._

[![License][license-badge]](LICENSE)
[![npm Version][npm-badge]][npm-url]
[![minified size][size-badge]][size-url]<br>
[![AppVeyor Test][appveyor-badge]][appveyor-url]
[![Travis Test][travis-badge]][travis-url]
[![coverage][codecov-badge]][codecov-url]
[![code quality][codacy-badge]][codacy-url]
[![maintainability][climate-badge]][climate-url]

Adds or subtracts N months to any JavaScript Date, local or UTC.

## Install

For NodeJS and JS bundlers:

```bash
npm i @jsbits/add-months
# or
yarn add @jsbits/add-months
```

or load `addMonths` in the browser:

```html
<script src="https://unpkg.com/@jsbits/add-months/index.b.min.js"></script>
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `addMonths(startdate, count, [asUTC])` ⇒ `Date` 

Returns a date occurring `count` months after `startdate` or, if `count` is
negative, the date occurring `count` months before `startdate`.

- If `startdate` is not a Date or number that can be converted to a
   valid date, returns a new Date instance with an invalid date.

- If `count` is evaluated as zero, returns a new Date instance with the
   the same value as `startdate`.

- If there is an overflow in the day, the date is adjusted to the last
   valid day of the expected month.

The third parameter is optional and indicates if the date is UTC. It is
necessary to differentiate UTC dates from locals and avoid errors due to the
[Daylight Saving Time](https://en.wikipedia.org/wiki/Daylight_saving_time)
(DST).

This function does not change the original date.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startdate | `Date` \| `number` |  | A value parseable as a JavaScript Date |
| count | `number` |  | Number of months to add or subtract |
| \[asUTC] | `boolean` | `false` | If `true`, handle the date as UTC |

**Returns**: `Date` - A new, adjusted Date instance.  

Since 1.0.0<br>
Group: date<br>
Author/Maintainer: aMarCruz<br>

### Example

```ts
import addMonths from '@jsbits/add-months'

// Helper for creating a local date based on a string
const toDate = (ds) => {
  const dt = ds.split(/[-T: ]/)
  return new Date(dt[0], dt[1] - 1, dt[2], ~~dt[3], ~~dt[4], ~~dt[5])
}

// can increment above one year
addMonths(toDate('2017-01-08'), 15)  // ⇒ 2018-04-08 06:00:00

// decrement works
addMonths(toDate('2017-01-01'), -1)  // ⇒ 2016-12-01 06:00:00

// avoids day overflow
addMonths(toDate('2017-01-31'), 1)  // ⇒ 2017-02-28 06:00:00

// can handle leap years
addMonths(toDate('2016-01-31'), 1)  // ⇒ 2016-02-29 06:00:00

// with the third parameter, date is handled as UTC
addMonths(new Date('2015-01-01T05:00:00Z'), 1, true)  // ⇒ 2015-02-01 05:00:00Z

// it accepts numericals parameters
addMonths(1541898143424, 1)  // ⇒ 2018-12-11 01:02:23

// returns an Invalid Date (i.e. NaN) for other types,
// to avoid undesired conversions to the current date.
addMonths(false, 1)  // ⇒ NaN
```

### Date.prototype.addMonths

If you prefer, you can inject addMonths into the `Date.prototype` by requiring 'proto' or by loading the IIFE from 'proto.js' in the browser:

```html
<script src="https://unpkg.com/@jsbits/add-months/proto.js"></script>
```

The new functionality is exposed in separate methods, with an API similar to other methods of the `Date` object:

- `addMonths` for local dates
- `addUTCMonths` for UTC dates

Both methods receive the number of months to add or subtract and **update the value of the object directly**.

The returned value is the number of milliseconds between 1 January 1970 00:00:00 UTC and the updated date, or `NaN` if the date is invalid. The `asUTC` flag is not necessary.

Using `Date.prototype.addMonths.call` with other type than `Date` generates a TypeError.

This example shows the behavior of both methods using the same date instance:

```ts
// this is using ESM syntax, but you can use require()
import '@jsbits/add-months/proto'

// helpers
const showLoc = (dt) => console.log('' + dt)
const showUTC = (dt) => console.log(dt.toJSON())
const showRes = (dt) => console.log(dt)

const date = new Date(2019, 0, 30, 20, 0, 0)

showLoc(date)                   // ⇒ Wed Jan 30 2019 20:00:00 GMT-0600 (CST)
showRes(date.addMonths(1))      // ⇒ 1551405600000
showLoc(date)                   // ⇒ Thu Feb 28 2019 20:00:00 GMT-0600 (CST)

showUTC(date)                   // ⇒ 2019-03-01T02:00:00.000Z
showRes(date.addUTCMonths(1))   // ⇒ 1554084000000
showUTC(date)                   // ⇒ 2019-04-01T02:00:00.000Z
```

### Note about DST

For local dates, the time offset may change if the resulting date has DST activation different from the original.

For example, if a GMT-0600 zone changes to GMT-0500 between May and October, the following will shift the time offset preserving the hour:

```ts
const origin = new Date('2018-01-20T16:00:00')  // ⇒ 2018-01-20 16:00 GMT-0600
const result = addMonths(origin, 6)             // ⇒ 2018-07-20 16:00 GMT-0500
```

The same dates in UTC, which has no time offset, show the change:

```ts
console.log(origin.toISOString())   // ⇒ 2018-01-20T22:00:00.000Z
console.log(result.toISOString())   // ⇒ 2018-07-20T21:00:00.000Z
```

The same happens if you apply a `setMonth(6)` to that date, which is correct and generally expected, just keep it in mind if you handle UTC dates based on local dates.

### Date from String

Avoid creating dates with strings, it is inconsistent.

From [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) at MDN:

> Note: parsing of date strings with the `Date` constructor (and `Date.parse`, they are equivalent) is strongly discouraged due to browser differences and inconsistencies. Support for [RFC 2822](http://tools.ietf.org/html/rfc2822#page-14) format strings is by convention only. Support for [ISO 8601](http://www.ecma-international.org/ecma-262/5.1/#sec-15.9.1.15) formats differs in that date-only strings (e.g. "1970-01-01") are treated as UTC, not local.

Even node 6 has problems with this. _Do not use it_ except with the UTC ISO-8601 format.

## Imports

All the [JSBits][jsbits-url] functions works in _strict mode_ and are compatible with:

- ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
- ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
- [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
- [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
- [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]

Of course, feedback, PRs, and stars are also welcome 🙃

Thanks for your support!

## License

The [MIT](LICENSE) License.

&copy; 2018-2019 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-badge]:  https://img.shields.io/badge/license-MIT-blue.svg?style=flat
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/add-months.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/add-months
[appveyor-badge]: https://img.shields.io/appveyor/ci/aMarCruz/jsbits/master.svg?label=appveyor
[appveyor-url]:   https://ci.appveyor.com/project/aMarCruz/jsbits/branch/master
[travis-badge]:   https://img.shields.io/travis/ProJSLib/jsbits/master.svg?label=travis
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codecov-badge]:  https://img.shields.io/codecov/c/github/ProJSLib/jsbits/master.svg
[codecov-url]:    https://codecov.io/gh/ProJSLib/jsbits/branch/master
[codacy-badge]:   https://img.shields.io/codacy/grade/b9374fca91d64b75aafac26682df8fd0/master.svg
[codacy-url]:     https://www.codacy.com/app/ProJSLib/jsbits?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ProJSLib/jsbits&amp;utm_campaign=Badge_Grade
[climate-badge]:  https://img.shields.io/codeclimate/maintainability/ProJSLib/jsbits.svg
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits/maintainability
[size-badge]:     https://img.shields.io/bundlephobia/min/@jsbits/add-months.svg
[size-url]:       https://bundlephobia.com/result?p=@jsbits/add-months
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
[kofi-url]:       https://ko-fi.com/C0C7LF7I
