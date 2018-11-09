## Scripts for Building and Maintenance

## Main Scripts

### create-package

Adds a new function to the packages.

It prompts for required info and creates the basic structure for the new package, including the .jsbits.json and package.json files.

### build-assets

Make the package.json, README.md, and other files not related to the transpilation.

Depends on .jsbits.json

### build-cjs

Make the CJS variant (and typings), on which depend the external example of the README and the tests.

Depends on package.json

### build-rest

Make the remnant variants: UMD, ESM, ES6, and the `index.b.min.js` file for browsers.

## TODO

- [ ] Script to check files, mainly for the '.jsbits.json' file.
- [ ] Test for the scripts, including the ones in the 'lib' folder.
