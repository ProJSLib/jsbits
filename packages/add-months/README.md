# @jsbits/add-months

[![License][license-image]](LICENSE)
[![Travis Test][travis-image]][travis-url]
[![Codebeat][codebeat-image]][codebeat-url]
[![Code Climate][climate-image]][climate-url]
[![Coverage][cccover-image]][cccover-url]
[![npm Version][npm-image]][npm-url]

Part of the [JSBits][jsbits-url] suite.

Adds or sustract X months to any JavaScript Date, local or UTC.

## Install

```bash
npm i @jsbits/add-months
# or
yarn add @jsbits/add-months
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `addMonths(startdate, count, [asUTC])` ⇒ <code>Date</code> 

Returns a date occurring `count` months after `startdate` or, if `count` is
negative, the date occurring `count` months before `startdate`.

- If startdate is not a Date, string, or number that can be converted to a
   valid date, returns a new Date instance with an invalid date.

- If count is evaluated as zero, returns a new Date instance with the
   the same value as startdate.

- If there is an overflow in the day, the date is adjusted to the last
   valid day of the expected month.

The third parameter is optional and indicates if the date is UTC. It is
necessary to differentiate UTC dates from locals to avoid errors due to the
[Daylight Saving Time](https://en.wikipedia.org/wiki/Daylight_saving_time)
(DST).

This function does not change the original date.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| startdate | <code>Date</code> \| <code>string</code> \| <code>number</code> |  | A value parseable as a JavaScript Date |
| count | <code>number</code> |  | Number of months to add or substract |
| \[asUTC] | <code>boolean</code> | <code>false</code> | If `true`, handle the date as UTC |

**Returns**: <code>Date</code> - A new, adjusted Date instance.  

Since 1.0.0<br>
Group: date<br>
Author/Maintainer: @aMarCruz<br>

### Example

```ts
import addMonths from '@jsbits/add-months'

// can increment above one year
addMonths(new Date('2017-01-08'), 15)  // ⇒ 2018-04-08 00:00:00

// decrement works
addMonths(new Date('2017-01-01'), -1)  // ⇒ 2016-12-01 00:00:00

// avoids day overflow
addMonths(new Date('2017-01-31'), 1)  // ⇒ 2017-02-28 00:00:00

// can handle leap years
addMonths(new Date('2016-01-31'), 1)  // ⇒ 2016-02-29 00:00:00

// adjust the result to honors the Daylight Saving Time.
// (assuming Juny is has DST -1)
addMonths(new Date('2015-01-01T05:00:00'), 5)  // ⇒ 2015-06-01 04:00:00

// with the third parameter, date is handled as UTC
addMonths(new Date('2015-01-01T05:00:00Z'), 1, true)  // ⇒ 2015-02-01 05:00:00Z

// handle string as input (numbers as well)
addMonths('2016-01-31', 1)  // ⇒ 2016-03-01 00:00:00

// returns an Invalid Date (i.e. NaN) if the input is falsy
// to avoid undesired conversions to the current date.
addMonths(false, 1)  // ⇒ NaN
```

### Date.prototype.addMonths

If you prefer, you can inject this function into the `Date.prototype` by requiring 'proto' or by loading the IIFE from 'add-months/proto.js' in your browser.

In Date.prototype the function is exposed in separate methods: `addMonths` for local dates, and `addUTCMonths` for UTC dates, so the `asUTC` flag is not required.

Also, its behavior changes to that of a setter. That is, the value of the date on which these methods operate _is changed_.

The return value of both methods is the number of milliseconds between 1 January 1970 00:00:00 UTC and the updated date.

This example shows the behavior of both methods using the same date instance:

```ts
// this is using ESM syntax, but you can use require()
import '@jsbits/add-months/proto'

// helpers
const showLoc = (dt) => console.log('' + dt)
const showUTC = (dt) => console.log(dt.toJSON())
const showRes = (dt) => console.log(dt)

const date = new Date(2018, 0, 30, 20, 0, 0)

showLoc(date)                   // => Tue Jan 30 2018 20:00:00 GMT-0600 (CST)
showRes(date.addMonths(1))      // => 1519869600000
showLoc(date)                   // => Wed Feb 28 2018 20:00:00 GMT-0600 (CST)

showUTC(date)                   // => 2018-03-01T02:00:00.000Z
showRes(date.addUTCMonths(1))   // => 1522548000000
showUTC(date)                   // => 2018-04-01T02:00:00.000Z
```

### Note about DST

For local dates, the time offset may change if the resulting date has DST activation different from the original.

For example, if a GMT-0600 zone changes to GMT-0500 between May and October, the following will shift the time offset preserving the hour:

```ts
const origin = new Date('2018-01-20T16:00:00')  // ⇒ 2018-01-20 16:00 GMT-0600
const result = addMonths(origin, 6)             // ⇒ 2018-07-20 16:00 GMT-0500
```

However, the UTC time which has no offset does change:

```ts
console.log(origin.toISOString())   // ⇒ 2018-01-20T22:00:00.000Z
console.log(result.toISOString())   // ⇒ 2018-07-20T21:00:00.000Z
```

The same happens if you apply a `setMonth(6)` to that date, which is correct and generally expected, but keep it in mind if you handle UTC dates based on local dates.

## Imports

All the [JSBits][jsbits-url] functions works in _strict mode_ and are compatible with:

- ES5 browsers, through the [jQuery](https://jquery.com/) `$.jsbits` object or the global `jsbits`.
- ESM Bundlers, like [webpack](http://webpack.github.io/) and [Rollup](https://rollupjs.org/).
- [ES modules](http://2ality.com/2014/09/es6-modules-final.html) for modern browsers or NodeJS with the `--experimental-modules` flag.
- [CommonJS](https://nodejs.org/docs/latest/api/modules.html#modules_modules) modules of NodeJS, jspm, and others.
- [Babel](https://babeljs.io/) and [TypeScript](www.typescriptlang.org/), through ES Module Interop.

Please see the [Distribution Formats][jsbits-formats] in the JSBits README to know about all the variants.

---
&copy; 2018 Alberto Martínez &ndash; Readme powered by [jscc](https://github.com/aMarCruz/jscc) and [jsdoc-to-markdown](https://github.com/75lb/jsdoc-to-markdown)

[license-image]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[npm-image]:      https://img.shields.io/npm/v/@jsbits/add-months.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/add-months
[travis-image]:   https://img.shields.io/travis/ProJSLib/jsbits.svg
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codebeat-image]: https://codebeat.co/badges/5b07ccc1-be43-41d8-aeaf-eee1913d4173
[codebeat-url]:   https://codebeat.co/projects/github-com-projslib-jsbits-master
[climate-image]:  https://codeclimate.com/github/ProJSLib/jsbits/badges/gpa.svg
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits
[cccover-image]:  https://api.codeclimate.com/v1/badges/e991c05e8a92448d30f0/test_coverage
[cccover-url]:    https://codeclimate.com/github/ProJSLib/jsbits/test_coverage
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
