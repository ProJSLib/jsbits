# @jsbits/get-package-version

_Part of the [JSBits][jsbits-url] suite._

[![License][license-badge]](LICENSE)
[![npm Version][npm-badge]][npm-url]
[![minified size][size-badge]][size-url]<br>
[![AppVeyor Test][appveyor-badge]][appveyor-url]
[![Travis Test][travis-badge]][travis-url]
[![coverage][codecov-badge]][codecov-url]
[![code quality][codacy-badge]][codacy-url]
[![maintainability][climate-badge]][climate-url]

Get the version of the package.json file found in the given directory or in one of its parents.

## Install

For NodeJS and JS bundlers:

```bash
npm i @jsbits/get-package-version
# or
yarn add @jsbits/get-package-version
```

### Targets

- NodeJS v4.2 or later

## `getPackageVersion([pkgPath])` ⇒ `string` 

Returns the version of the first package.json file found in the given
directory or in one of its parents.

- If you don't provide a path, the search starts in the current one.
- The provided path can be relative to the current working directory.
- Packages with a missing or empty `version` property are ignored.

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| \[pkgPath] | `string` | `&quot;.&quot;` | Initial directory to search, defaults to `process.cwd()`. |

**Returns**: `string` - The package version, or an empty string if it could not be found.  

Since 1.0.0<br>
Group: dev<br>
Author/Maintainer: aMarCruz<br>

### Example

```ts
import getPackageVersion from '@jsbits/get-package-version'

const version = getPackageVersion() // ⇒ '1.0.0' (just as example)
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
[npm-badge]:      https://img.shields.io/npm/v/@jsbits/get-package-version.svg
[npm-url]:        https://www.npmjs.com/package/@jsbits/get-package-version
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
[size-badge]:     https://img.shields.io/bundlephobia/min/@jsbits/get-package-version.svg
[size-url]:       https://bundlephobia.com/result?p=@jsbits/get-package-version
[jsbits-url]:     https://github.com/ProJSLib/jsbits
[jsbits-formats]: https://github.com/ProJSLib/jsbits#distribution-formats
[kofi-url]:       https://ko-fi.com/C0C7LF7I
