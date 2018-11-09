// @ts-check
/*
  Handlebars helpers for dmd (jsdoc2md)
*/

/**
 * Format the person name or data from one of the jscc varnames
 * `_AUTHOR`, `_MAINTEINER`, `_CONTRIBUTORS`
 *
 * @param {object|string} person jscc (.jsbits.json) values
 */
const personName = (person) => {
  if (person) {
    if (typeof person == 'string') {
      return person
    }
    if (typeof person == 'object' && person.name) {
      const email = person.email ? ` <${person.email}>` : ''
      const url = person.url ? ` (${person.url})` : ''
      return `${person.name}${email}${url}`
    }
  }
  return ''
}

/**
 * @param {Array} arr -
 */
exports.arrayJoin = (arr) => (arr && arr.length ? arr.join(', ') : null)

/**
 * Return the first non-falsy value or `null` if both are falsy.
 */
exports['or?'] = (v1, v2) => (v1 || v2 || null)

/**
 * Format 'Author/Maintainer' or 'Author, Maintainer'
 */
exports.authorAndMaintainer = (author, values) => {
  const maintainer = values._MAINTEINER && personName(values._MAINTEINER)
  author = personName(author || values._AUTHOR)

  if (author && maintainer && (author !== maintainer)) {
    return `Author: ${author}<br>\nMaintainer: ${maintainer}`
  }
  return `Author/Maintainer: ${author}`
}

/**
 * Format the person name list from the jscc varnames
 * `_AUTHOR`, `_MAINTEINER`, `_CONTRIBUTORS`
 *
 * @param {Array.<object|string>} persons jscc (.jsbits.json) values
 */
exports.personList = (persons) => (persons ? persons.map(personName) : []).join(', ')

/**
 * Returns the list of the supported targets, based on the `_TARGET` varname.
 *
 * @param {object} values jscc (.jsbits.json) values
 */
exports.listTargets = (values) => {
  const targets = []

  if (values._TARGET !== 'node') {
    targets.push('- ES5 compatible browser')
  }
  if (values._TARGET !== 'browser') {
    targets.push(`- NodeJS v${values._NODE} or later`)
  }

  return targets.join('\n')
}
