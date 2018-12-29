# JSBits

[![License][license-badge]][license-url]
[![AppVeyor test][appveyor-badge]][appveyor-url]
[![Travis test][travis-badge]][travis-url]
[![coverage][codecov-badge]][codecov-url]
[![Codacy][codacy-badge]][codacy-url]
[![Code Climate][climate-badge]][climate-url]

Public library of professional high quality functions for JavaScript and TypeScript.

The functions of JSBits are written in TypeScript 3 and meet stringent quality requirements.<br>They were designed to be efficient and robust, work in _strict mode_ and are tested with 100% coverage.

Most of the functions are pure, isomorphic, and do not have external dependencies, except for a few that, due to their purpose, only run on node.js and use its native library.

## Installation

This is a... mini-monorepo?... whatever.

This is a centralized repository that standardizes the development and testing of JSBits. To use, each function must be installed from its own npm package or directly in the browser, so you get exactly what you need, without garbage or longer download times.

The section [Distribution formats](#distribution-formats) details the support for several bundlers and the README of each function contains its requirements and download options.

_**NOTE:** This work is in its infancy, I will be adding more functions as my time allows._

## Functions

<!--BEGIN_FUNCTION_LIST-->

### [addMonths](packages/add-months/README.md)

Adds or sustract X months to any JavaScript Date, local or UTC.

v1.1.1 &ndash; Group: date &ndash; Author: @aMarCruz

### [deepClone](packages/deep-clone/README.md)

Performs a deep cloning of an object own properties and symbols, with loosy or exact behavior.

v1.1.0 &ndash; Group: object &ndash; Author: @aMarCruz

### [escapeRegexStr](packages/escape-regex-str/README.md)

Escapes special characters in a string, for matching substrings with a RegExp instance.

v1.0.2 &ndash; Group: dev &ndash; Author: @aMarCruz

### [getPackageVersion](packages/get-package-version/README.md)

_NodeJS only_.

Get the version of the package.json file found in the given directory or in one of its parents.

v1.0.2 &ndash; Group: dev &ndash; Author: @aMarCruz

### [hasOwnProperties](packages/has-own-properties/README.md)

Determines whether an object has own properties or symbols, including (optionally) the non-enumerable ones.

v1.1.0 &ndash; Group: object &ndash; Author: @aMarCruz

<!--END_FUNCTION_LIST-->

## Distribution Formats

This is a list of the fields of package.json used by JSBits to facilitate the detection of the correct format for your toolchain and the _default_ format used by some bundlers, loaders, and other tools for which I have information:

&nbsp;          | main     | [browser][1] | [module][2]  | es2015/esnext | $.jsbits/jsbits
--------------- | -------- | ------------ | ------------ | ------------- | ---------------
Filename        | index.js | umd/index.js | esm/index.js | index.mjs     | index.b.min.js
ES version      | ES5      | ES5          | ES5          | ES6           | ES5
Module format   | CJS      | UMD          | ESM          | ESM           | IIFE
[node.js][3]\*  | ✔        | -            | -            | ✔             | -
[Brunch][4]     | ✔        | -            | -            | -             | -
[jspm][5]       | ✔        | -            | -            | -             | -
[browserify][6] | -        | ✔            | -            | -             | -
[Rollup][7]     | -        | -            | ✔            | -             | -
[webpack][8]    | -        | ✔            | ✔            | -             | -
[TypeScript][9] | ✔        | -            | -            | -             | -
[jQuery][10]    | -        | ✔            | -            | -             | ✔

In one way or another, most modern bundlers let you configure the field used to resolve imports &ndash;this includes webpack, jspm, browserify, and Rollup&ndash;, but even without this support, you can direct your tool to the desired format using its folder and/or extension.

Surprisingly, one such tool is TypeScript, which always uses the "main" field, at least until v3.1.x, so if you are using ESM imports you need enable `esModuleInterop` in your tsconfig.json _or_ import the function by its filename, like this:

```ts
import addMonths from '@jsbits/add-months/esm'         // ES5 variant
import addMonths from '@jsbits/add-months/index.mjs'   // ES6 variant
```

The `import = require()` syntax does not have this restriction. In any case, typings must to work.

BTW, the last `import` in the example is also used by node.js with [ES Modules](https://nodejs.org/dist/latest/docs/api/esm.html) support.

\* The file imported by node depends on the use of the `--experimental-modules` flag.

### About the jsbits object

This UMD version, pointed by the "browser" field, works with AMD and CJS module systems but if no one is detected, it adds the function in the `jQuery.jsbits` namespace, if this already exists, or in the global `jsbits` object (i.e. `window.jsbits`).

If you dont need AMD/CJS support, you can load the functions from the index.b.min.js file.

The following example allows loading @jsbits functions in jQuery:

```html
<script>$.jsbits = {};</script>
<script src="add-months/index.b.min.js"></script>
```

## TODO

In addition to increasing the number of functions...

- [ ] Test in browser and badge of the results
- [ ] Packages of group of functions
- [ ] Better docs and contributors guides
- [ ] A more robust structure of the repo and its commands

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

<!-- markdownlint-disable MD033 -->
[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]<br>
<!-- markdownlint-enable MD033 -->

Of course, feedback, PRs, and stars are also welcome 🙃

Thanks for your support!

### Thanks

Special thanks to [BrowserStack](https://www.browserstack.com) for their excellent service.

## License

The [BSD 2-Clause](LICENSE) "Simplified" License.

&copy; 2018 Alberto Martínez. All rights reserved.

<!-- Badges and Refs (badges for the branch 'master') -->
[license-badge]:  https://img.shields.io/badge/license-BSD--2--Clause-blue.svg
[license-url]:    https://github.com/ProJSLib/jsbits/blob/master/LICENSE
[appveyor-badge]: https://ci.appveyor.com/api/projects/status/yh5018ej9u6fnau8?svg=true
[appveyor-url]:   https://ci.appveyor.com/project/aMarCruz/jsbits
[travis-badge]:   https://img.shields.io/travis/ProJSLib/jsbits/master.svg?label=travis
[travis-url]:     https://travis-ci.org/ProJSLib/jsbits
[codecov-badge]:  https://img.shields.io/codecov/c/github/ProJSLib/jsbits.svg
[codecov-url]:    https://codecov.io/gh/ProJSLib/jsbits
[climate-badge]:  https://api.codeclimate.com/v1/badges/e991c05e8a92448d30f0/maintainability
[climate-url]:    https://codeclimate.com/github/ProJSLib/jsbits/maintainability
[codacy-badge]:   https://img.shields.io/codacy/grade/b9374fca91d64b75aafac26682df8fd0/master.svg
[codacy-url]:     https://www.codacy.com/app/ProJSLib/jsbits?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=ProJSLib/jsbits&amp;utm_campaign=Badge_Grade
[kofi-url]:       https://ko-fi.com/C0C7LF7I
[1]: https://github.com/defunctzombie/package-browser-field-spec
[2]: https://github.com/rollup/rollup/wiki/pkg.module
[3]: https://nodejs.org/
[4]: https://brunch.io/
[5]: https://jspm.org/
[6]: http://browserify.org/
[7]: https://rollupjs.org/
[8]: webpack.js.org/
[9]: typescriptlang.org/
[10]: https://jquery.com/
