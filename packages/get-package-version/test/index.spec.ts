/* eslint max-lines-per-function:[2,999], max-statements:[2,99] */

import path = require('path')
import expect = require('expect.js')
import getPackageVersion = require('..')

import testDir = require('./test-dir')

describe('getPackageVersion', function () {

  const rootDir = process.cwd()
  const ownPackage = path.resolve(testDir, '..', 'package.json')

  it('get the package.json version from the current or parents paths', function () {
    const version = require(ownPackage).version as string
    let result

    try {
      process.chdir(path.join(testDir))
      result = getPackageVersion()
    } finally {
      process.chdir(rootDir)
    }
    expect(result).to.be(version)
  })

  it('the search must starts in the provided absolute path', function () {
    const v0_0_1 = path.resolve(testDir, 'fixtures/v0_0_1')
    const result = getPackageVersion(v0_0_1)
    expect(result).to.be('0.0.1')
  })

  it('the search must starts in the provided path, relative to CDW', function () {
    const v0_0_1 = path.resolve(testDir, 'fixtures/v0_0_1')
    const result = getPackageVersion(path.relative(rootDir, v0_0_1))
    expect(result).to.be('0.0.1')
  })

  it('must ignore package.json with missing or empty `version`', function () {
    const version = require(ownPackage).version as string
    let result

    try {
      process.chdir(path.join(testDir, 'fixtures'))
      result = getPackageVersion()
    } finally {
      process.chdir(rootDir)
    }
    expect(result).to.be(version)
  })

  it('must return an empry string if no version could found.', function () {
    let result

    try {
      process.chdir(path.resolve('/'))
      result = getPackageVersion()
    } catch {
      // ignore
    } finally {
      process.chdir(rootDir)
    }
    expect(result).to.be('')
  })

})
