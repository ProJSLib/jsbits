# @jsbits/easter-day

_Part of the [JSBits][jsbits-url] suite._

[![License][license-badge]](LICENSE)
[![npm Version][npm-badge]][npm-url]
[![minified size][size-badge]][size-url]<br>
[![AppVeyor Test][appveyor-badge]][appveyor-url]
[![Travis Test][travis-badge]][travis-url]
[![coverage][codecov-badge]][codecov-url]
[![code quality][codacy-badge]][codacy-url]
[![maintainability][climate-badge]][climate-url]

Calculates the local date of the Easter day for years up to 9999.

## Install

For NodeJS and JS bundlers:

```bash
npm i @jsbits/easter-day
# or
yarn add @jsbits/easter-day
```

or load `easterDay` in the browser:

```html
<script src="https://unpkg.com/@jsbits/easter-day/index.b.min.js"></script>
```

### Targets

- ES5 compatible browser
- NodeJS v4.2 or later

## `easterDay(year)` ⇒ `Date` 

Calculates the local date of the Easter day –aka _Pascha_ or
_Resurrection Sunday_– for years between 100 and 9999 in the
Gregorian calendar, based on Oudin's algorithm.

Easter always falls on a Sunday between March 22 and April 25, inclusive.

**NOTE:** The result for years less than 1583 _could be inaccurate_.

This is a good algorithm, but calculating the Easter is not an exact
science or something consensuated, so expect discrepancies with older
or future implementations.

| Param | Type | Description |
| --- | --- | --- |
| year | `number` | Year for the desired date, between 100 and 9999 |

**Returns**: `Date` - Local date instance for the Easter day  

Since 1.1.3<br>
Group: date<br>
Author/Maintainer: aMarCruz<br>
**See**: [Paschalion at OrthodoxWiki](https://orthodoxwiki.org/Paschalion)  

### Example

```ts
import easterDay from '@jsbits/easter-day'

const easter = easterDay(2019)
console.log(easter.toDateString()) // ⇒ Sun Apr 21 2019
```

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
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/easter-day.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/easter-day
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
[size-badge]:     https://img.shields.io/bundlephobia/min/@jsbits/easter-day.svg
[size-url]:       https://bundlephobia.com/result?p=@jsbits/easter-day
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
[kofi-url]:       https://ko-fi.com/C0C7LF7I
