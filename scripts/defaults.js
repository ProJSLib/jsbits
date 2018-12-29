// @ts-check
// @ts-ignore
const pkg = require('../package.json')

/*
  Some default to not clutter the code
*/
module.exports = {

  /** Default version of node in package.json */
  NODE_VERSION: '4.2',
  /** Default author name in package.json */
  AUTHOR_NAME: 'aMarCruz',
  /** Default author email in package.json */
  AUTHOR_EMAIL: 'amarcruzgit-box@yahoo.com',

  /** For licenses, first year of JSBits */
  FIRST_YEAR: 2018,

  /* Text encoding for fs readFile, writeFile */
  TEXT: 'utf8',

  /** Default jscc varname of wrapper placeholders */
  PLACEHOLDER: '_PLACEHOLDER',

  /** Filename for the minified file (for browsers) */
  MINIFIED_NAME: 'index.b.min.js',

  /** jsbits homepage */
  HOMEPAGE: pkg.homepage,
  /** jsbits prefix for packages */
  JSPREFIX: '@jsbits',
  /** jsbits license */
  LICENSE: pkg.license,

  /** Default rollup-plugin-cleanup options */
  CLEANUP_CONF: {
    comments: ['license', 'sources', /^\*\*[\s\S]+@(since|public)\b/],
    extensions: '.ts',
    exclude: '*.d.ts',
  },

}
