import expect from 'expect.js'
import escapeRegexStr from '..'

describe('escapeRegexStr', function () {

  it('handle special characteres in string', function () {
    expect(escapeRegexStr('\\ ^ $ * + ? . ( ) | { } [ ]'))
      .to.be('\\\\ \\^ \\$ \\* \\+ \\? \\. \\( \\) \\| \\{ \\} \\[ \\]')
    expect(escapeRegexStr('(Phobetron pithecium)'))
      .to.be('\\(Phobetron pithecium\\)')
  })

  it('it does not escape dashes since it is not necessary', function () {
    let str: string
    let strRe: string

    str = '[0-9]$'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('\\[0-9\\]\\$')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))

    str = '-[0-9-]-z'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('-\\[0-9-\\]-z')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
  })

  it('it does not escape slashes since it is not necessary', function () {
    const str = 'foo/bar/'
    const strRe = escapeRegexStr(str)
    expect(strRe).to.be(str)
    expect(str).to.match(new RegExp(strRe))
    expect(str).to.match(new RegExp(str))

    const str2 = escapeRegexStr('[/.]/')
    expect(str2).to.be('\\[/\\.\\]/')
    expect('[/.]/').to.match(new RegExp(str2))
  })

  it('must escape caret and dollar signs', function () {
    let str: string
    let strRe: string

    str = '^foo'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('\\^foo')
    expect(' ^foo').to.match(new RegExp(strRe))
    expect(' ^foo').not.to.match(RegExp(str))

    str = '^bar$'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('\\^bar\\$')
    expect(' ^bar$ ').to.match(new RegExp(strRe))
    expect(' ^bar$ ').not.to.match(new RegExp(str))

    str = '^$'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('\\^\\$')
    expect('^$').to.match(RegExp(strRe))
    expect('^$').not.to.match(new RegExp(str))
  })

  it('a point must match a point', function () {
    const str = 'foo.bar'
    const strRe = escapeRegexStr(str)

    expect(strRe).to.be('foo\\.bar')
    expect('foo.bar').to.match(new RegExp(strRe))
    expect('foo@bar').not.to.match(new RegExp(strRe))
    expect('foo.bar').to.match(RegExp(str))
    expect('foo@bar').to.match(RegExp(str))
  })

  it('a pair of braces is not capture', function () {
    const str = 'foo(@)bar'
    const strRe = escapeRegexStr(str)

    expect(strRe).to.be('foo\\(@\\)bar')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
  })

  it('a backslash is not an escape character', function () {
    const str = 'foo\\(@\\)bar'
    const strRe = escapeRegexStr(str)

    expect(strRe).to.be('foo\\\\\\(@\\\\\\)bar')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
  })

  it('must return an empty string for falsy values', function () {
    expect(escapeRegexStr('')).to.be('')
    expect(escapeRegexStr(null)).to.be('')
    expect(escapeRegexStr(false as any)).to.be('')
    expect(escapeRegexStr(undefined as any)).to.be('')
    expect(escapeRegexStr(0 as any)).to.be('')
  })

  it('a backslash must not break Unicode characters', function () {
    let str = 'foo\u0047'
    let strRe = escapeRegexStr(str)
    expect(strRe).to.be(str)
    expect(str).to.match(new RegExp(strRe))
    expect(str).to.match(new RegExp(str))
    str = 'foo\\u0047'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('foo\\\\u0047')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
    str = 'foo\\\u0047'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('foo\\\\\u0047')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
  })

  it('a backslash must not break Hex characters', function () {
    let str = 'bar\x47'
    let strRe = escapeRegexStr(str)
    expect(strRe).to.be(str)
    expect(str).to.match(new RegExp(strRe))
    expect(str).to.match(new RegExp(str))
    str = 'bar\\x47'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('bar\\\\x47')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
    str = 'bar\\\x47'
    strRe = escapeRegexStr(str)
    expect(strRe).to.be('bar\\\\\x47')
    expect(str).to.match(new RegExp(strRe))
    expect(str).not.to.match(new RegExp(str))
  })

  it('from the example', function () {
    //@_EXAMPLE_BEGIN
    const template = 'Unicorn (white): $'
    const regexStr = escapeRegexStr(template)
    const regex = new RegExp(regexStr)

    // without escapeRegexStr, the test fails.
    expect('Unicorn (white): $1,000,000.00').to.match(regex)
    //@_EXAMPLE_END
  })

})

