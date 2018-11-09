# Contributing to JSBits (WIP)

I want to make contributing to this project as easy and transparent as possible.

**NOTE: This document is in TODO**

## Requeriments

* A single file with no more than 250 lines of code plus comments.
* Written in TypeScript v3 with no hacks (`@ts-ignore`)__*__.
* Self docummented with [JSDoc](http://usejsdoc.org/) v3.
* Self-containded, without external dependencies, except those of NodeJS.
* Fully tested, 100% coverage with no hacks (`istanbul ignore`)__*__.
* Pass with "A" the [Codebeat](https://codebeat.co) and [CodeClimate](https://codeclimate.com) tests.
* Equal or better performance, or more reliable, than the equivalents in other packages.
* Compilable in strict mode as CommonJS and ES6 modules.
* Executable in node.js v6 at least, preferably isomorphic.
* Isomorphic functions must run in ES5 browsers with no polyfills.

_**\*** well... there are situations in which this can not be avoided._

## The Development Process

This is a monorepo for functions distributed individually in the npm register. To facilitate the maintenance, documentation, and distribution of the functions, the following guidelines must be met:

* Each function (or function group) must reside in its own folder inside the "packages" directory, in one only "index.ts" file.
* The folder name must match the package name, without the "@jsbits" prefix.
* Each folder must have a .jsbits.json, containin the version, description, and groups of the function (see [jsbits.schema.json](./jsbits.schema.json)).
* The code must be written in TypeScript 3, using ES6 and ES modules, but must traspile to ES5 without polyfills.

### JSDoc fields

Required fields:

* @param - Type, name, and description of parameters.
* @returns - Type and description of the result.
* @since - The JSBits version in which this function was added, format '#.#.#'
