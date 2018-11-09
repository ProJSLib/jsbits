# JSBits (WIP)

[![License][license-image]][license-url]
[![Codebeat][codebeat-image]][codebeat-url]
[![Code Climate][climate-image]][climate-url]

Public library of professional high quality functions for TypeScript and JavaScript.

Each function that I (you) add to this library, must be generic, robust and high performance, 100% tested, and comply with strict requirements of quality.

## Installation

This is a... mini-monorepo?... whatever.

This is a centralized repository that standardizes the development and testing of JSBits. To use, each function must be installed from its own npm package (scope @jsbits), so that you get exactly what you need, without garbage or longer download times.

_**NOTE:** This work is in its infancy, I will be adding more functions and better support for browsers over the time._

## Functions

<!--BEGIN_FUNCTION_LIST-->
### [addMonths](packages/add-months)

Adds or sustract X months to any JavaScript Date, local or UTC.

Group: date &ndash; Author: @aMarCruz


### [deepClone](packages/deep-clone)

Performs a deep cloning of an object own properties, with loosy or exact behavior.

Group: object &ndash; Author: @aMarCruz


### [escapeRegexStr](packages/escape-regex-str)

Escapes special characters in a string, for matching substrings with a RegExp instance.

Group: dev &ndash; Author: @aMarCruz


### [getPackageVersion](packages/get-package-version)

_NodeJS only_<br>
Get the version of the package.json file found in the given directory or in one of its parents.

Group: dev &ndash; Author: @aMarCruz


### [hasOwnProperties](packages/has-own-properties)

Determinates if an object has own properties.

Group: object &ndash; Author: @aMarCruz
<!--END_FUNCTION_LIST-->

## Distribution Formats

This is a list of the fields of package.json used by JSBits to facilitate the detection of the correct format for your toolchain and the _default_ format used by some bundlers, loaders, and other tools for which I have information:

&nbsp;          | main     | [browser][1] | [module][2]  | es2015/esnext | $.jsbits/jsbits
--------------- | -------- | ------------ | ------------ |  ---------- | ---------------
Filename        | index.js | umd/index.js | esm/index.js | index.mjs   | index.b.min.js
ES version      | ES5      | ES5          | ES5          | ES6         | ES5
Module format   | CJS      | UMD          | ESM          | ESM         | IIFE
[node.js][3]    | ✔        | -            | -            | ✔           | -
[Brunch][4]     | ✔        | -            | -            | -           | -
[jspm][5]       | ✔        | -            | -            | -           | -
[browserify][6] | -        | ✔            | -            | -           | -
[Rollup][7]     | -        | -            | ✔            | -           | -
[webpack][8]    | -        | ✔            | ✔            | -           | -
[TypeScript][9] | ✔        | -            | -            | -           | -
[jQuery][10]    | -        | ✔            | -            | -           | ✔

In one way or another, most modern bundlers let you configure the field used to resolve the import &ndash;this includes webpack, jspm, browserify, and Rollup&ndash;, but even without this support, you can direct your tool to the desired format using its filename.

Surprisingly, one such tool is TypeScript, which always uses the "main" field, at least until v3.1.x, so you are using ESM imports you need enable `esModuleInterop` in your tsconfig.json _or_ import the function by its filename, like this:

```ts
import addMonths from '@jsbits/add-months/esm'         // ES5 variant
import addMonths from '@jsbits/add-months/index.mjs'   // ES6 variant
```

The `import = require()` syntax does not have this restriction. In any case, typings must to work.

BTW, the last `import` in the example is also used by node.js with [ES Modules](https://nodejs.org/dist/latest/docs/api/esm.html) support.

### About the jsbits object

This UMD version pointed by the "browser" field works with AMD and CJS module systems but, if no one is detected, adds the function to the global namespace `jsbits` (i.e. an object of `window`), either in `jQuery.jsbits` if this already exists, or in `jsbits` alone. The following example allows load @jsbits functions in `$.jsbits`:

```html
<script>$.jsbits = {};</script>
<script src="add-months/index.b.min.js"></script>
```

The file `index.b.js` has no AND/CJS support.


<!-- refs -->
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

## TODO

In addition to increasing the number of functions...

- [ ] Test in browser and badge of the results
- [ ] Packages of group of functions
- [ ] Better docs and contributors guides
- [ ] A more robust structure of the repo and its commands

## Support my Work

I'm a full-stack developer with more than 20 year of experience and I try to share most of my work for free and help others, but this takes a significant amount of time and effort so, if you like my work, please consider...

[<img src="https://amarcruz.github.io/images/kofi_blue.png" height="36" title="Support Me on Ko-fi" />][kofi-url]

Of course, feedback, PRs, and stars are also welcome :)

Thanks for your support!


## License

The [BSD 2-Clause](LICENSE) "Simplified" License.

&copy; 2018 Alberto Martínez. All rights reserved.

<!-- Badges at the top -->
[license-image]:  https://img.shields.io/badge/license-BSD%202--Clause-blue.svg
[license-url]:    https://github.com/aMarCruz/jsbits/blob/master/LICENSE
[appveyor-image]: https://ci.appveyor.com/api/projects/status/hdsef0p6q0oqr127?svg=true
[appveyor-url]:   https://ci.appveyor.com/project/aMarCruz/jsbits
[travis-image]:   https://img.shields.io/travis/aMarCruz/jsbits.svg
[travis-url]:     https://travis-ci.org/aMarCruz/jsbits
[codebeat-image]: https://codebeat.co/badges/7e15dc9d-42a8-4ea2-8bae-a21c09490fbe
[codebeat-url]:   https://codebeat.co/projects/github-com-amarcruz-jsbits-dev
[codecov-image]:  https://codecov.io/gh/aMarCruz/jsbits/branch/dev/graph/badge.svg
[codecov-url]:    https://codecov.io/gh/aMarCruz/jsbits

<!-- Badges at bottom -->
[climate-image]:  https://codeclimate.com/github/aMarCruz/jsbits/badges/gpa.svg
[climate-url]:    https://codeclimate.com/github/aMarCruz/jsbits
[cccover-image]:  https://api.codeclimate.com/v1/badges/50d60a10ec7c9156b429/test_coverage
[cccover-url]:    https://codeclimate.com/github/aMarCruz/jsbits/test_coverage
[commits-image]:  https://img.shields.io/github/commits-since/aMarCruz/jsbits/latest.svg
[commits-url]:    https://github.com/aMarCruz/jsbits/commits/dev

<!-- Others -->
[bmc-image]:      https://www.buymeacoffee.com/assets/img/custom_images/orange_img.png
[bmc-url]:        https://www.buymeacoffee.com/aMarCruz
[kofi-url]:       https://ko-fi.com/C0C7LF7I
